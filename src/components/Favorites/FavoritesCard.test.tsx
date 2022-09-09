import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import FavoritesCard from "./FavoritesCard";
import { mockOneLocation } from "../../__mocks__/mockLocationsData";
import cateringIcon from "./../../assets/images/catering.svg";

afterEach(cleanup);

beforeEach(() => {
  render(
    <FavoritesCard
      id={mockOneLocation.id}
      name={mockOneLocation.name}
      postcode={mockOneLocation.postcode}
      street={mockOneLocation.street}
      city={mockOneLocation.city}
      country={mockOneLocation.country}
      searchIconType={mockOneLocation.searchIconType}
    />
  );
});

describe("FavoritesCard test", () => {
  test("Should render the component", () => {
    const cardContainer: HTMLDivElement = screen.getByTestId("favorites-card");
    expect(cardContainer).toBeInTheDocument();
  });

  test("Should render the correct icon type", () => {
    const imgComponent: HTMLImageElement = screen.getByTestId("favorites-card-icon");
    expect(imgComponent.src).toContain(cateringIcon);
  });
});
