import React from "react";
import { ILocation } from "../../helpers/addLocationToStorage";

export const FavoritesCard: React.FC<ILocation> = (props): JSX.Element => {
  return (
    <div className="my-2 p-2 flex flex-row gap-3 border-[1px] border-solid rounded border-gray-400">
      <div>icon</div>
      <div className="flex flex-col w-full">
        {Boolean(props.name) && <div className="font-semibold text-slate-800"> {props.name}</div>}
        {Boolean(props.street) && <div className="font-semibold text-slate-500"> {props.street}</div>}
        {(Boolean(props.city) || Boolean(props.country)) && <div className="font-semibold text-gray-500"> {props.city ? `${props.city}, ${props.country}` : `${props.country}`}</div>}
        {Boolean(props.postcode) && <div className="font-semibold text-gray-500"> {props.postcode}</div>}

        <div className="flex flex-row justify-between mt-2 mr-2">
          <button className="px-2 py-1 text-sm text-slate-800 font-semibold rounded-full border border-slate-200 hover:text-white hover:bg-slate-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 transition-all ease-in-out duration-150">
            Go To Map
          </button>
          <button className="px-4 py-1 text-sm text-red-800 font-semibold rounded-full border border-red-200 hover:text-white hover:bg-red-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 transition-all ease-in-out duration-150">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
