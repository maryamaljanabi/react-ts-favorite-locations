import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchBar from "./SearchBar";

const mockExtent = [-112.15391101963272, 35.249935405423486, -91.77377083916214, 47.80770197746497];

describe("SearchBar test", () => {
  test("Should render the component", () => {
    render(<SearchBar favoritesOpen={false} setLocationsData={(): void => {}} extent={mockExtent} />);
    const searchBarContainer: HTMLDivElement = screen.getByTestId("search-bar-container");
    expect(searchBarContainer).toBeInTheDocument();
    expect(searchBarContainer).toHaveClass("justify-center w-screen");
  });
  test("Should render the component on the right side", () => {
    render(<SearchBar favoritesOpen={true} setLocationsData={(): void => {}} extent={mockExtent} />);
    const searchBarContainer: HTMLDivElement = screen.getByTestId("search-bar-container");
    expect(searchBarContainer).toBeInTheDocument();
    expect(searchBarContainer).toHaveClass("justify-end w-11/12");
  });
  test("Should render search bar with default options", () => {
    render(<SearchBar favoritesOpen={false} setLocationsData={(): void => {}} extent={mockExtent} />);
    const searchButton: HTMLDivElement = screen.getByTestId("search-bar-submit-btn");
    const textField: HTMLInputElement = screen.getByTestId("name-search-text");
    let options: HTMLOptionElement[] = screen.getAllByTestId("select-option");
    fireEvent.click(searchButton);
    expect(textField.value).toEqual("");
    expect(options[0].selected).toBeTruthy();
  });
  test("Should change search bar options", () => {
    render(<SearchBar favoritesOpen={false} setLocationsData={(): void => {}} extent={mockExtent} />);
    const searchButton: HTMLDivElement = screen.getByTestId("search-bar-submit-btn");
    const textField: HTMLInputElement = screen.getByTestId("name-search-text");
    const selectField: HTMLSelectElement = screen.getByTestId("select-search");
    fireEvent.change(selectField, { target: { value: "accommodation" } });
    fireEvent.change(textField, { target: { value: "new york" } });
    fireEvent.click(searchButton);
    const options: HTMLOptionElement[] = screen.getAllByTestId("select-option");
    expect(textField.value).toEqual("new york");
    expect(options[3].selected).toBeTruthy();
  });
});
