export const createItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const readItem = (key: string) => {
  const value = localStorage.getItem(key);

  try {
    return JSON.parse(value as string);
  } catch (error) {
    return value;
  }
};

export const updateItem = (key: string, value: any): void => {
  if (localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const deleteItem = (key: string): void => {
  localStorage.removeItem(key);
};
