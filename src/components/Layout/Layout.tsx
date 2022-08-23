import { Map } from "ol";
import React, { useState } from "react";
import { Favorites } from "../Favorites/Favorites";
import MainMap from "../MainMap/MainMap";
import SearchBar from "../SearchBar/SearchBar";

const Layout: React.FC = (): JSX.Element => {
  const [map, setMap] = useState<Map>();
  const [favoritesOpen, setFavoritesOpen] = useState<boolean>(false);

  return (
    <div>
      <MainMap setMap={setMap} />
      <SearchBar favoritesOpen={favoritesOpen} />
      <Favorites />
    </div>
  );
};

export default Layout;
