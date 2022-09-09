import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FavoritesIcon from "./FavoritesIcon";

afterEach(cleanup);

describe("FavoritesCard test", () => {
  test("Should render the component", () => {
    render(<FavoritesIcon favoritesOpen={false} setFavoritesOpen={(): void => {}} />);
    const iconContainer: HTMLDivElement = screen.getByTestId("favorites-icon-container");
    expect(iconContainer).toBeInTheDocument();
  });

  test("Should hide the tooltip component when favoriteOpen is true", () => {
    render(<FavoritesIcon favoritesOpen={true} setFavoritesOpen={(): void => {}} />);
    const tooltipComponent: HTMLElement | null = screen.queryByTestId("tooltip-component");
    expect(tooltipComponent).not.toBeInTheDocument();
  });

  test("Should open tooltip on mouse over", () => {
    render(<FavoritesIcon favoritesOpen={false} setFavoritesOpen={(): void => {}} />);
    const iconContainer: HTMLDivElement = screen.getByTestId("favorites-icon-container");
    const tooltipComponent: HTMLElement = screen.getByTestId("tooltip-component");
    fireEvent.mouseOver(iconContainer);
    expect(tooltipComponent).toHaveClass("opacity-100");
  });

  test("Should close tooltip on mouse out", () => {
    render(<FavoritesIcon favoritesOpen={false} setFavoritesOpen={(): void => {}} />);
    const iconContainer: HTMLDivElement = screen.getByTestId("favorites-icon-container");
    const tooltipComponent: HTMLElement = screen.getByTestId("tooltip-component");
    fireEvent.mouseOut(iconContainer);
    expect(tooltipComponent).toHaveClass("opacity-0");
  });
});
