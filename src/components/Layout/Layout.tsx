import { Map } from "ol";
import React, { useState } from "react";
import { Favorites } from "../Favorites/Favorites";
import MainMap from "../MainMap/MainMap";
import SearchBar from "../SearchBar/SearchBar";

const Layout: React.FC = (): JSX.Element => {
  const [map, setMap] = useState<Map>();
  return (
    <div>
      <MainMap setMap={setMap} />
      <SearchBar />
      <Favorites />
    </div>
  );
};

export default Layout;
