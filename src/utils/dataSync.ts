const API_URL = 'https://functions.poehali.dev/44aeafe6-298c-4c25-a5b1-f3bbb3c49357';
const ADMIN_TOKEN = 'c27d44b5f50e3661a8d276c4e1860676a3c47a0252fadc394f6fc66e9eadad03';

export const syncToServer = async (data: Record<string, any>) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Token': ADMIN_TOKEN,
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error('Ошибка синхронизации:', error);
    }
  } catch (error) {
    console.error('Ошибка синхронизации с сервером:', error);
  }
};

export const loadFromServer = async (): Promise<Record<string, any> | null> => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка загрузки данных с сервера:', error);
    return null;
  }
};