import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { FullScreen, ZoomSlider, defaults as defaultControls } from "ol/control";
import React, { useEffect, useRef, useState } from "react";
import "./MainMap.css";
import "ol/ol.css";
import { transformExtent } from "ol/proj";
import { ReactComponent as StarIcon } from "./../../assets/images/star-solid.svg";

interface MapProps {
  setMap: (map: Map) => void;
  setExtent: (extent: number[]) => void;
}

const MainMap: React.FC<MapProps> = ({ setMap, setExtent }): JSX.Element => {
  const [mainMap, setMainMap] = useState<Map>();
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapDiv.current) {
      return;
    }

    //initialize map
    const newMap: Map = new Map({
      target: mapDiv.current,
      controls: defaultControls().extend([new FullScreen(), new ZoomSlider()]),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 3,
        minZoom: 2,
        maxZoom: 18,
      }),
    });

    // newMap.on("click", (evt) => {
    //   console.log(evt.coordinate);
    // });

    newMap.getView().on("change", function () {
      // fires when map is dragged or zoomed
      if (typeof setExtent === "function") setExtent(transformExtent(newMap.getView().calculateExtent(), "EPSG:3857", "EPSG:4326"));
    });

    if (typeof setMap === "function") {
      setMap(newMap);
    }

    setMainMap(newMap);
  }, []);

  return (
    <div ref={mapDiv} className="map">
      <div id="popup-container">
        <div id="popup-content">
          <div id="popup-text"></div>
          <StarIcon id="popup-icon" />
        </div>
      </div>

      <div id="tooltip-container">
        <div id="tooltip-content"></div>
      </div>
    </div>
  );
};

export default MainMap;
