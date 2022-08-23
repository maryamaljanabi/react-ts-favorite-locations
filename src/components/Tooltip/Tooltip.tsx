import React, { useRef, useState } from "react";

interface TooltipProps {
  showTooltip: boolean;
  hoverText: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ showTooltip, hoverText }): JSX.Element => {
  const tooltipStyle = `absolute w-max bg-white rounded border-grey-100 my-2 px-4 py-1 transition-all ease-in-out duration-150 text-sm hover:cursor-auto ${showTooltip ? "opacity-100" : "opacity-0"}`;

  return <div className={tooltipStyle}>{hoverText}</div>;
};
