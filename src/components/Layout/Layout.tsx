import { Map } from "ol";
import { Geometry } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import React, { useEffect, useState } from "react";
import { handlePopupDisplay, handleTooltipDisplay } from "../../helpers/mapEvents";
import { addFeature, addVectorLayer, centerMap, layerExists, pinStyle, removeLayer } from "../../helpers/mapOperations";
import FavoritesIcon from "../Favorites/FavoritesIcon";
import FavoritesList from "../Favorites/FavoritesList";
import MainMap from "../MainMap/MainMap";
import SearchBar from "../SearchBar/SearchBar";

const Layout: React.FC = (): JSX.Element => {
  const [map, setMap] = useState<Map>();
  const [favoritesOpen, setFavoritesOpen] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<number[]>([]);
  const [locationsData, setLocationsData] = useState<[]>([]);
  const [mapExtent, setMapExtent] = useState<number[]>([]);

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
      const vectorLayer: VectorLayer<VectorSource<Geometry>> = addVectorLayer(map, "userLocation", pinStyle("user"));
      addFeature(vectorLayer.getSource(), coordinates, "user", {});
      centerMap(map, coordinates);
      handleTooltipDisplay(map);
      handlePopupDisplay(map);
    }
  }, [map, coordinates]);

  useEffect(() => {
    if (map && Boolean(locationsData) && Boolean(locationsData.length)) {
      console.log(locationsData);
      removeLayer(map, "searchLocation");
      const locationsLayer: VectorLayer<VectorSource<Geometry>> = addVectorLayer(map, "searchLocation", pinStyle("location"));
      locationsData.map((location: any) => {
        if (location.geometry.coordinates) addFeature(locationsLayer.getSource(), location.geometry.coordinates, "location", location);
      });
    }
  }, [locationsData]);

  return (
    <div>
      <MainMap setMap={(map: Map): void => setMap(map)} setExtent={(radius: number[]): void => setMapExtent(radius)} />
      <SearchBar favoritesOpen={favoritesOpen} setLocationsData={(data: []): void => setLocationsData(data)} extent={mapExtent} />
      <FavoritesIcon favoritesOpen={favoritesOpen} setFavoritesOpen={setFavoritesOpen} />
      <FavoritesList favoritesOpen={favoritesOpen} setFavoritesOpen={setFavoritesOpen} />
    </div>
  );
};

export default Layout;
