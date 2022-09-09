import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import FavoritesList from "./FavoritesList";
import { addToLocalStorage } from "../../helpers/addLocationToStorage";
import { mockOneLocation } from "../../__mocks__/mockLocationsData";

afterEach(cleanup);

describe("FavoritsList test", () => {
  test("Should render the component", () => {
    render(<FavoritesList favoritesOpen={true} setFavoritesOpen={(): void => {}} />);
    const listContainer: HTMLDivElement = screen.getByTestId("favorites-list-container");
    expect(listContainer).toBeInTheDocument();
    expect(listContainer).toHaveClass("opacity-100 block");
  });

  test("Should hide the component when favoritesOpen is false", () => {
    render(<FavoritesList favoritesOpen={false} setFavoritesOpen={(): void => {}} />);
    const listContainer: HTMLDivElement = screen.getByTestId("favorites-list-container");
    expect(listContainer).toBeInTheDocument();
    expect(listContainer).toHaveClass("opacity-0 hidden");
  });

  test("Should display a text message when LocalStorage is empty", () => {
    render(<FavoritesList favoritesOpen={true} setFavoritesOpen={(): void => {}} />);
    const noDataElement: HTMLDivElement = screen.getByTestId("favorites-list-nodata");
    expect(noDataElement).toBeInTheDocument();
    expect(noDataElement).toHaveTextContent("No favorites locations added");
  });

  test("Should display a list of cards when LocalStorage is not empty", () => {
    addToLocalStorage("1234", mockOneLocation);
    addToLocalStorage("1235", mockOneLocation);
    render(<FavoritesList favoritesOpen={true} setFavoritesOpen={(): void => {}} />);
    const dataListMapper: HTMLDivElement = screen.getByTestId("favorites-list-locations-mapper");
    expect(dataListMapper).toBeInTheDocument();
  });
});
