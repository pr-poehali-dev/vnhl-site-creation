const API_URL = 'https://functions.poehali.dev/44aeafe6-298c-4c25-a5b1-f3bbb3c49357';

export const syncToServer = async (data: Record<string, any>) => {
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
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
