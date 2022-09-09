import { ILocation } from "../helpers/addLocationToStorage";

export interface storageType {
  [key: string]: string;
}

export const mockLocalStorage = () => {
  let store: storageType = {};
  return {
    getItem: (key: string): Object | null => {
      return store[key] || null;
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem: function (key: string) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
    length: function () {
      return Object.keys(store).length;
    },
    populateStore: (data: ILocation[]) => {
      let mappedData = data.reduce<storageType>((acc, location: ILocation) => {
        acc[location.id] = JSON.stringify(location);
        return acc;
      }, {});
      store = mappedData;
    },
  };
};

global.localStorage = mockLocalStorage as unknown as Storage;
