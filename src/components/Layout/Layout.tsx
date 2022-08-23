import { Map } from "ol";
import React, { useState } from "react";
import FavoritesIcon from "../Favorites/FavoritesIcon";
import FavoritesList from "../Favorites/FavoritesList";
import MainMap from "../MainMap/MainMap";
import SearchBar from "../SearchBar/SearchBar";

const Layout: React.FC = (): JSX.Element => {
  const [map, setMap] = useState<Map>();
  const [favoritesOpen, setFavoritesOpen] = useState<boolean>(false);

  return (
    <div>
      <MainMap setMap={setMap} />
      <SearchBar favoritesOpen={favoritesOpen} />
      <FavoritesIcon favoritesOpen={favoritesOpen} setFavoritesOpen={setFavoritesOpen} />
      <FavoritesList favoritesOpen={favoritesOpen} setFavoritesOpen={setFavoritesOpen} locationsList={[]} />
    </div>
  );
};

export default Layout;
