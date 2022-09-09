import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App test", () => {
  test("Should render the component", () => {
    render(<App />);
    const appContainer: HTMLDivElement = screen.getByTestId("app");
    expect(appContainer).toBeInTheDocument();
  });
});
