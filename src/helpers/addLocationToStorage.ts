export interface ILocation {
  id: string;
  name: string;
  street: string;
  postcode: string;
  country?: string;
  city?: string;
  searchIconType: string;
  lon?: number;
  lat?: number;
}

export interface IFavoriteLocations {
  [id: string]: ILocation;
}

export const getStructuredIdName = (id: string): string => {
  if (!id) return "";
  return id.includes("locationId") ? id : `locationId:${id}`;
};

export const getFromLocalStorage = (id: string): ILocation | null => {
  if (!localStorage.getItem(getStructuredIdName(id))) return null;
  try {
    return JSON.parse(localStorage.getItem(getStructuredIdName(id)) || "");
  } catch (error) {
    console.log("error retrieving from local storage", error);
    return null;
  }
};

export const addToLocalStorage = (id: string, value: ILocation): void => {
  if (!getFromLocalStorage(getStructuredIdName(id))) {
    localStorage.setItem(getStructuredIdName(id), JSON.stringify(value));
    window.dispatchEvent(new Event("storage"));
  }
};

export const existsInLocalStorage = (id: string): boolean => {
  return localStorage.getItem(getStructuredIdName(id)) ? true : false;
};

export const removeFromLocalStorage = (id: string): void => {
  if (localStorage.getItem(getStructuredIdName(id))) {
    localStorage.removeItem(getStructuredIdName(id));
    window.dispatchEvent(new Event("storage"));
  }
};

export const clearLocalStorage = (): void => {
  localStorage.clear();
};

export const getAllLocalStorageItems = (): IFavoriteLocations => {
  return Object.keys(localStorage).reduce<IFavoriteLocations>((acc, key) => {
    if (key.includes("locationId")) {
      try {
        acc[key] = JSON.parse(localStorage[key]);
      } catch (error) {
        console.log(error);
      }
    }
    return acc;
  }, {});
};
