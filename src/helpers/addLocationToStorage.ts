export interface ILocation {
  name: string;
  string: string;
  postcode: string;
}

export const getFromLocalStorage = (id: string): ILocation | null => {
  if (!localStorage.getItem(`locationId:${id}`)) return null;
  try {
    return JSON.parse(localStorage.getItem(`locationId:${id}`) || "");
  } catch (error) {
    console.log("error retrieving from local storage", error);
    return null;
  }
};

export const addToLocalStorage = (id: string, value: ILocation): void => {
  if (!getFromLocalStorage(`locationId:${id}`)) localStorage.setItem(`locationId:${id}`, JSON.stringify(value));
};

export const existsInLocalStorage = (id: string): boolean => {
  return localStorage.getItem(`locationId:${id}`) ? true : false;
};

export const removeFromLocalStorage = (id: string): void => {
  if (localStorage.getItem(`locationId:${id}`)) localStorage.removeItem(`locationId:${id}`);
};
