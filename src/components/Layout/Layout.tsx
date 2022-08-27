import { Map } from "ol";
import { Geometry } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import React, { useEffect, useState } from "react";
import { addFeature, addVectorLayer, centerMap, layerExists, pinStyle } from "../../helpers/mapOperations";
import FavoritesIcon from "../Favorites/FavoritesIcon";
import FavoritesList from "../Favorites/FavoritesList";
import MainMap from "../MainMap/MainMap";
import SearchBar from "../SearchBar/SearchBar";

const Layout: React.FC = (): JSX.Element => {
  const [map, setMap] = useState<Map>();
  const [favoritesOpen, setFavoritesOpen] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<number[]>([]);
  const [locationsLayer, setLocationsLayer] = useState<VectorLayer<VectorSource<Geometry>> | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setCoordinates([position.coords.longitude, position.coords.latitude]);
      });
    }
  }, []);

  useEffect(() => {
    //add coordinates on map in center

    if (map && !layerExists(map, "userLocation") && coordinates && coordinates.length) {
      const vectorLayer: VectorLayer<VectorSource<Geometry>> = addVectorLayer(map, "userLocation", pinStyle("#3fa4e8"));
      setLocationsLayer(vectorLayer);
      console.log(vectorLayer);
      addFeature(vectorLayer.getSource(), coordinates);
      centerMap(map, coordinates);
    }
  }, [map, coordinates]);

  return (
    <div>
      <MainMap setMap={(map: Map): void => setMap(map)} />
      <SearchBar favoritesOpen={favoritesOpen} />
      <FavoritesIcon favoritesOpen={favoritesOpen} setFavoritesOpen={setFavoritesOpen} />
      <FavoritesList favoritesOpen={favoritesOpen} setFavoritesOpen={setFavoritesOpen} locationsList={[]} />
    </div>
  );
};

export default Layout;
