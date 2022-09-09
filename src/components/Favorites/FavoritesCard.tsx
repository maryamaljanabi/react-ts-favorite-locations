import React from "react";
import { ILocation, removeFromLocalStorage } from "../../helpers/addLocationToStorage";
import cateringIcon from "./../../assets/images/catering.svg";
import accommodationIcon from "./../../assets/images/hotel.svg";
import commercialIcon from "./../../assets/images/store.svg";
import entertainmentIcon from "./../../assets/images/theater.svg";

const FavoritesCard: React.FC<ILocation> = (props): JSX.Element => {
  const handleTypeIcon = (type: string) => {
    switch (type) {
      case "catering":
        return cateringIcon;
      case "accommodation":
        return accommodationIcon;
      case "commercial":
        return commercialIcon;
      case "entertainment":
        return entertainmentIcon;
      case "default":
        return;
    }
  };
  return (
    <div className="my-2 p-2 flex flex-row gap-3 border-[1px] border-solid rounded border-gray-400" data-testid="favorites-card">
      <div>
        <img src={handleTypeIcon(props.searchIconType)} className="pt-1" data-testid="favorites-card-icon" />
      </div>
      <div className="flex flex-col w-full">
        {Boolean(props.name) && <div className="font-semibold text-slate-800"> {props.name}</div>}
        {Boolean(props.street) && <div className="font-semibold text-slate-500"> {props.street}</div>}
        {(Boolean(props.city) || Boolean(props.country)) && <div className="font-semibold text-gray-500"> {props.city ? `${props.city}, ${props.country}` : `${props.country}`}</div>}
        {Boolean(props.postcode) && <div className="font-semibold text-gray-500"> {props.postcode}</div>}

        <div className="flex flex-row justify-between mt-2 mr-2">
          {/* <button
            className="px-2 py-1 text-sm text-slate-800 font-semibold rounded-full border border-slate-200 hover:text-white hover:bg-slate-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 transition-all ease-in-out duration-150"
            onClick={(): void => handleGoToMap()}
          >
            Go To Map
          </button> */}
          <button
            className="px-4 py-1 text-sm text-red-800 font-semibold rounded-full border border-red-200 hover:text-white hover:bg-red-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 transition-all ease-in-out duration-150"
            onClick={(): void => removeFromLocalStorage(props.id as string)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesCard;
