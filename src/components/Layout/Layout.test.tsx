import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout from "./Layout";
import { mockLocationsData } from "../../__mocks__/mockLocationsData";

afterEach(cleanup);
beforeEach(() => {
  render(<Layout />);
});

describe("Layout test", () => {
  test("Should render the component", () => {
    const layoutContainer: HTMLDivElement = screen.getByTestId("layout-container");
    expect(layoutContainer).toBeInTheDocument();
  });

  test("Should hide FavoritesList when close button is clicked", () => {
    const listContainer: HTMLDivElement = screen.getByTestId("favorites-list-container");
    const closeIcon: HTMLElement = screen.getByTestId("favorites-list-close-icon");
    fireEvent.click(closeIcon);
    expect(listContainer).toHaveClass("opacity-0 hidden");
  });

  test("Should return a list of locations when searchBar button is clicked", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockLocationsData),
      })
    ) as jest.Mock;
    const searchButton: HTMLDivElement = screen.getByTestId("search-bar-submit-btn");
    fireEvent.click(searchButton);
    //check that the list is rendered on map
  });
});
