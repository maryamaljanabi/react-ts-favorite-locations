import React, { useState } from "react";
import { Tooltip } from "../Tooltip/Tooltip";
import starIcon from "./../../assets/images/star-solid.svg";

export interface FavoritesProps {
  favoritesOpen: boolean;
  setFavoritesOpen: (favoritesOpen: boolean) => void;
}

const FavoritesIcon: React.FC<FavoritesProps> = ({ favoritesOpen, setFavoritesOpen }): JSX.Element => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  return (
    <div
      onClick={(): void => {
        if (typeof setFavoritesOpen === "function") setFavoritesOpen(!favoritesOpen);
      }}
      onMouseOver={(): void => setTooltipOpen(true)}
      onMouseOut={(): void => setTooltipOpen(false)}
      className="absolute left-10 top-6 border-slate-800 rounded bg-slate-800 p-1 hover:cursor-pointer"
    >
      <img src={starIcon} className="w-5 h-5 fill-yellow-400" />
      {!favoritesOpen && <Tooltip showTooltip={tooltipOpen} hoverText="Favorite Locations" />}
    </div>
  );
};

export default FavoritesIcon;
