import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Tooltip } from "./Tooltip";

describe("Tooltip test", () => {
  test("Should render the component", () => {
    render(<Tooltip hoverText="test hover text" showTooltip={true} />);
    const tooltipContainer: HTMLDivElement = screen.getByTestId("tooltip-component");
    expect(tooltipContainer).toBeInTheDocument();
  });
});
