import React, { useState } from "react";
import { Tooltip } from "../Tooltip/Tooltip";
import { ReactComponent as StarIcon } from "./../../assets/images/star-solid.svg";

interface FavoritesProps {
  favoritesOpen: boolean;
  setFavoritesOpen: (favoritesOpen: boolean) => void;
}

export const Favorites: React.FC<FavoritesProps> = ({ favoritesOpen, setFavoritesOpen }): JSX.Element => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  return (
    <div
      onClick={(): void => {
        if (typeof setFavoritesOpen === "function") setFavoritesOpen(!favoritesOpen);
      }}
      onMouseOver={(): void => setTooltipOpen(true)}
      onMouseOut={(): void => setTooltipOpen(false)}
      className="absolute left-10 top-7 border-slate-800 rounded bg-slate-800 p-1 hover:cursor-pointer"
    >
      <StarIcon className="w-5 h-5 fill-yellow-400" />
      <Tooltip showTooltip={tooltipOpen} hoverText="Favorite Locations" />
    </div>
  );
};
