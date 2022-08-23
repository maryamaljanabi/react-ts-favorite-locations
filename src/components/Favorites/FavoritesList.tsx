import React from "react";
import { FavoritesProps } from "./FavoritesIcon";
import { ReactComponent as CloseIcon } from "./../../assets/images/circle-xmark-solid.svg";
import { ReactComponent as EmptyIcon } from "./../../assets/images/ghost-solid.svg";
import { FavoritesCard } from "./FavoritesCard";

interface FavoritesListProps extends FavoritesProps {
  locationsList?: [];
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favoritesOpen, setFavoritesOpen, locationsList }): JSX.Element => {
  const containerStyle = `absolute flex flex-col top-0 left-0 my-[1vh] mx-3 rounded-md bg-slate-50 border-slate-800 w-[30%] h-[98vh] transition-all ease-in-out duration-200 ${
    favoritesOpen ? "opacity-100 block" : "opacity-0 hidden"
  }`;
  return (
    <div className={containerStyle}>
      <div
        className="w-5 h-5 mt-2 mr-2 ml-auto fill-red-800 hover:cursor-pointer"
        onClick={(): void => {
          if (typeof setFavoritesOpen === "function") setFavoritesOpen(false);
        }}
      >
        <CloseIcon />
      </div>

      {!Boolean(locationsList) ||
        (!Boolean(locationsList?.length) && (
          <div className="p-3 flex flex-col items-center gap-2 mt-[50%] h-full">
            <EmptyIcon className="w-5 h-5" />
            <h3>No favorites locations added</h3>
          </div>
        ))}
    </div>
  );
};

export default FavoritesList;
