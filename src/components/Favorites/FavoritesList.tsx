import React, { useEffect, useState } from "react";
import { FavoritesProps } from "./FavoritesIcon";
import { ReactComponent as CloseIcon } from "./../../assets/images/circle-xmark-solid.svg";
import { ReactComponent as EmptyIcon } from "./../../assets/images/ghost-solid.svg";
import { FavoritesCard } from "./FavoritesCard";
import { getAllLocalStorageItems, IFavoriteLocations } from "../../helpers/addLocationToStorage";

const FavoritesList: React.FC<FavoritesProps> = ({ favoritesOpen, setFavoritesOpen }): JSX.Element => {
  const [favoriteLocations, setFavoriteLocations] = useState<IFavoriteLocations>({});

  const containerStyle = `absolute flex flex-col top-0 left-0 my-[1vh] mx-3 rounded-md bg-slate-50 border-slate-800 w-[30%] h-[98vh] transition-all ease-in-out duration-200 ${
    favoritesOpen ? "opacity-100 block" : "opacity-0 hidden"
  }`;

  useEffect(() => {
    setFavoriteLocations(getAllLocalStorageItems());
    window.addEventListener("storage", () => {
      setFavoriteLocations({ ...getAllLocalStorageItems() });
    });
  }, []);

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

      {!Boolean(Object.keys(favoriteLocations)?.length) ? (
        <div className="p-3 flex flex-col items-center gap-2 mt-[50%] h-full">
          <EmptyIcon className="w-5 h-5" />
          <h3>No favorites locations added</h3>
        </div>
      ) : (
        <div className="mt-3 px-2 text-sm h-full overflow-auto">
          {Object.entries(favoriteLocations).map(([key, value]) => (
            <FavoritesCard key={key} id={key} name={value.name} postcode={value.postcode} street={value.street} city={value.city} country={value.country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
