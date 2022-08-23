import React, { ChangeEvent, ChangeEventHandler, useState } from "react";

interface SearchBarProps {
  favoritesOpen: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ favoritesOpen }): JSX.Element => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("restaurants");

  const options = [
    {
      label: "Restaurants",
      value: "restaurants",
    },
    {
      label: "Markets",
      value: "markets",
    },
    {
      label: "Parks",
      value: "parks",
    },
  ];

  const containerStyle = `absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen transition ease-in-out duration-300 flex ${
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
        placeholder="Search for a location..."
        value={searchText}
        onChange={(evt: ChangeEvent<HTMLInputElement>): void => setSearchText(evt.target.value)}
        className="p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white text-sm w-1/3 focus:ring-0 focus:outline-none"
      />
      <button className="px-8 rounded-r-lg bg-slate-800 text-white p-2 uppercase border-slate-800 border-t border-b border-r text-sm">Search</button>
    </div>
  );
};

export default SearchBar;
