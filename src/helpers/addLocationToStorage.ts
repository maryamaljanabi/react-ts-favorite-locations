export interface ILocation {
  name: string;
  string: string;
  postcode: string;
}

export const getFromLocalStorage = (id: string): ILocation | null => {
  if (!localStorage.getItem(id)) return null;
  try {
    return JSON.parse(localStorage.getItem(id) || "");
  } catch (error) {
    console.log("error retrieving from local storage", error);
    return null;
  }
};

export const addToLocalStorage = (id: string, value: ILocation): void => {
  if (!getFromLocalStorage(id)) localStorage.setItem(id, JSON.stringify(value));
};

export const removeFromLocalStorage = (id: string): void => {
  if (getFromLocalStorage(id)) localStorage.removeItem(id);
};

export const existsInLocalStorage = (id: string): boolean => {
  return localStorage.getItem(id) ? true : false;
};
