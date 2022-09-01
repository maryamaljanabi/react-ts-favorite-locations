import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { apiRequests } from "../../api/geoapifyApi";

interface SearchBarProps {
  favoritesOpen: boolean;
  setLocationsData: (data: []) => void;
  extent: number[];
}

const SearchBar: React.FC<SearchBarProps> = ({ favoritesOpen, setLocationsData, extent }): JSX.Element => {
  const options = [
    {
      label: "Restaurants",
      value: "catering",
    },
    {
      label: "Markets",
      value: "commercial",
    },
    {
      label: "Entertainment",
      value: "entertainment",
    },
    {
      label: "Accommodation",
      value: "accommodation",
    },
  ];

  const [searchText, setSearchText] = useState<string>("");
  const [searchType, setSearchType] = useState<string>(options[0].value);

  const handleLocationsSearch = async (): Promise<void> => {
    try {
      if (extent && extent.length) {
        const res = await apiRequests(searchType, searchText, extent);
        let data = await res.json();
        if (Boolean(data.features) && Boolean(data.features.length)) {
          data = data.features.map((item: any) => {
            item.properties.searchIconType = searchType;
            return { ...item.properties };
          });

          if (typeof setLocationsData === "function") setLocationsData(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const containerStyle = `absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all ease-in-out duration-300 flex ${
    favoritesOpen ? "justify-end w-11/12" : "justify-center w-screen"
  }`;

  return (
    <div className={containerStyle}>
      <select
        value={searchType}
        onChange={(event: ChangeEvent<HTMLSelectElement>): void => setSearchType(event.target.value)}
        className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white text-sm w-60 focus:ring-0 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="rounded">
            {option.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search for a location near you..."
        value={searchText}
        onChange={(evt: ChangeEvent<HTMLInputElement>): void => setSearchText(evt.target.value)}
        className="p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white text-sm w-1/3 focus:ring-0 focus:outline-none"
      />
      <button className="px-8 rounded-r-lg bg-slate-800 text-white p-2 uppercase border-slate-800 border-t border-b border-r text-sm" onClick={(): Promise<void> => handleLocationsSearch()}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
