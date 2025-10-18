export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const generateToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
};

export const encryptData = async (data: string, key: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const keyBuffer = encoder.encode(key);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    await crypto.subtle.digest('SHA-256', keyBuffer),
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
  
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    dataBuffer
  );
  
  const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encryptedBuffer), iv.length);
  
  return btoa(String.fromCharCode(...combined));
};

export const decryptData = async (encryptedData: string, key: string): Promise<string> => {
  const encoder = new TextEncoder();
  const keyBuffer = encoder.encode(key);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    await crypto.subtle.digest('SHA-256', keyBuffer),
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
  
  const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
  const iv = combined.slice(0, 12);
  const data = combined.slice(12);
  
  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    data
  );
  
  return new TextDecoder().decode(decryptedBuffer);
};

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000;

interface LoginAttempt {
  count: number;
  timestamp: number;
}

export const checkRateLimit = (identifier: string): { allowed: boolean; remainingAttempts: number; lockoutTime?: number } => {
  const storageKey = `rate_limit_${identifier}`;
  const stored = sessionStorage.getItem(storageKey);
  
  const now = Date.now();
  let attempt: LoginAttempt = stored ? JSON.parse(stored) : { count: 0, timestamp: now };
  
  if (now - attempt.timestamp > LOCKOUT_DURATION) {
    attempt = { count: 0, timestamp: now };
  }
  
  if (attempt.count >= MAX_LOGIN_ATTEMPTS) {
    const lockoutRemaining = LOCKOUT_DURATION - (now - attempt.timestamp);
    return {
      allowed: false,
      remainingAttempts: 0,
      lockoutTime: Math.ceil(lockoutRemaining / 1000 / 60)
    };
  }
  
  return {
    allowed: true,
    remainingAttempts: MAX_LOGIN_ATTEMPTS - attempt.count
  };
};

export const recordLoginAttempt = (identifier: string, success: boolean): void => {
  const storageKey = `rate_limit_${identifier}`;
  
  if (success) {
    sessionStorage.removeItem(storageKey);
    return;
  }
  
  const stored = sessionStorage.getItem(storageKey);
  const now = Date.now();
  let attempt: LoginAttempt = stored ? JSON.parse(stored) : { count: 0, timestamp: now };
  
  if (now - attempt.timestamp > LOCKOUT_DURATION) {
    attempt = { count: 1, timestamp: now };
  } else {
    attempt.count += 1;
  }
  
  sessionStorage.setItem(storageKey, JSON.stringify(attempt));
};

export const sanitizeInput = (input: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
  };
  return input.replace(/[&<>"'/]/g, (char) => map[char]);
};

export const validateSession = (): boolean => {
  const auth = sessionStorage.getItem('adminAuth');
  const timestamp = sessionStorage.getItem('adminAuthTime');
  
  if (!auth || !timestamp) {
    return false;
  }
  
  const SESSION_TIMEOUT = 30 * 60 * 1000;
  const now = Date.now();
  const authTime = parseInt(timestamp, 10);
  
  if (now - authTime > SESSION_TIMEOUT) {
    sessionStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminAuthTime');
    return false;
  }
  
  sessionStorage.setItem('adminAuthTime', now.toString());
  return auth === 'true';
};

export const setSecureSession = (): void => {
  sessionStorage.setItem('adminAuth', 'true');
  sessionStorage.setItem('adminAuthTime', Date.now().toString());
};

export const clearSecureSession = (): void => {
  sessionStorage.removeItem('adminAuth');
  sessionStorage.removeItem('adminAuthTime');
};
