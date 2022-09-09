import { storageType } from "../../__mocks__/mockLocalStorage";
import { mockOneLocation } from "../../__mocks__/mockLocationsData";
import { addToLocalStorage, clearLocalStorage, existsInLocalStorage, getAllLocalStorageItems, getFromLocalStorage, getStructuredIdName, removeFromLocalStorage } from "../addLocationToStorage";

describe("localStorage helpers test", () => {
  afterEach(() => {
    jest.clearAllMocks();
    clearLocalStorage();
  });

  describe("getStructuredIdName", () => {
    test("Should handle structuring an Id without the locationId string", () => {
      expect(getStructuredIdName("1234")).toEqual("locationId:1234");
    });
    test("Should handle structuring an Id containing the locationId string", () => {
      expect(getStructuredIdName("locationId:1234")).toEqual("locationId:1234");
    });
    test("Should handle when Id is empty", () => {
      expect(getStructuredIdName("")).toEqual("");
    });
  });

  describe("getFromLocalStorage", () => {
    beforeEach(() => {
      addToLocalStorage("1234", mockOneLocation);
    });
    test("Should return an object when Id exists in localStorage", () => {
      expect(getFromLocalStorage("1234")).toEqual(mockOneLocation);
    });
    test("Should return null when Id does not exist in localStorage", () => {
      expect(getFromLocalStorage("12345")).toEqual(null);
    });
  });

  describe("addToLocalStorage", () => {
    test("Should add key value pair to local storage", () => {
      jest.spyOn(window.localStorage.__proto__, "setItem");
      addToLocalStorage("1234", mockOneLocation);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
    test("Should not add duplicate objects when key exists in local storage", () => {
      jest.spyOn(window.localStorage.__proto__, "setItem");
      addToLocalStorage("1234", mockOneLocation);
      addToLocalStorage("1234", mockOneLocation);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
  });

  describe("existsInLocalStorage", () => {
    test("Should return true when item exists in local storage", () => {
      addToLocalStorage("1234", mockOneLocation);
      expect(existsInLocalStorage("1234")).toEqual(true);
    });
    test("Should return false when item does not exist in local storage", () => {
      expect(existsInLocalStorage("1234")).toEqual(false);
    });
  });

  describe("removeFromLocalStorage", () => {
    test("Should remove an existing item from local storage", () => {
      jest.spyOn(window.localStorage.__proto__, "removeItem");
      addToLocalStorage("1234", mockOneLocation);
      removeFromLocalStorage("1234");
      expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    });
    test("Should not be called when removing a non existent item from local storage", () => {
      jest.spyOn(window.localStorage.__proto__, "removeItem");
      removeFromLocalStorage("1234");
      expect(localStorage.removeItem).toHaveBeenCalledTimes(0);
    });
  });

  describe("clearLocalStorage", () => {
    test("Should clear store", () => {
      jest.spyOn(window.localStorage.__proto__, "clear");
      clearLocalStorage();
      expect(localStorage.clear).toHaveBeenCalledTimes(1);
      expect(localStorage.length).toEqual(0);
    });
  });

  describe("getAllLocalStorageItems", () => {
    test("Should return an array of store objects", () => {
      addToLocalStorage("1234", mockOneLocation);
      addToLocalStorage("1235", mockOneLocation);
      const getItems = getAllLocalStorageItems();
      expect(Object.keys(getItems).length).toEqual(2);
    });
    test("Should return an empty object when store has no items", () => {
      const getItems = getAllLocalStorageItems();
      expect(Object.keys(getItems).length).toEqual(0);
    });
  });
});

export default {};
