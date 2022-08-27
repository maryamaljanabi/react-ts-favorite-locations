import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import { Geometry, Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import { Map } from "ol";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import locationPin from "./../assets/images/location-dot-solid.svg";

// pin style
export const pinStyle = (color: string): Style => {
  return new Style({
    image: new Icon({
      anchor: [0.5, 40],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: locationPin,
      color,
    }),
  });
};

// check if a layer exists
export const layerExists = (map: Map, layerName: string): boolean => {
  let found = false;
  map.getLayers().forEach((layer) => {
    if (layer && layer.get("name") === layerName) found = true;
  });
  return found;
};

// center map on location
export const centerMap = (map: Map, coordinates: number[]): void => {
  map.getView().animate({
    center: fromLonLat(coordinates),
    duration: 1000,
    zoom: 14,
  });
};

//add a vector layer and return its source
export const addVectorLayer = (map: Map, name: string, featureStyle: Style): VectorLayer<VectorSource<Geometry>> => {
  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [],
    }),
    style: featureStyle,
  });
  vectorLayer.set("name", name);
  map.addLayer(vectorLayer);
  return vectorLayer;
};

// add a location pin
export const addFeature = (source: VectorSource<Geometry> | null, coordinates: number[]): void => {
  const feature = new Feature({
    geometry: new Point(fromLonLat(coordinates)),
  });
  source?.addFeature(feature);
};

// remove map layer
export const removeLayer = (map: Map, layerName: string): void => {
  map.getLayers().forEach((layer) => {
    if (layer && layer.get("name") === layerName) {
      map.removeLayer(layer);
    }
  });
};
