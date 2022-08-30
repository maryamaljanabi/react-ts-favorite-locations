import { Coordinate } from "ol/coordinate";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import Map from "ol/Map";
import Overlay from "ol/Overlay";

export const handleTooltipDisplay = (map: Map): void => {
  const tooltipContainerElement = document.getElementById("tooltip-container") as HTMLDivElement;
  const tooltipContentElement = document.getElementById("tooltip-content") as HTMLDivElement;
  const popupContainerElement = document.getElementById("popup-container") as HTMLDivElement;

  const displayTooltip = (pixel: number[]): void => {
    var feature = map.forEachFeatureAtPixel(pixel, function (feature) {
      return feature;
    });
    if (feature) {
      if ((feature.get("user") || feature.get("location")) && popupContainerElement.style.display !== "block") {
        tooltipContainerElement.style.display = "block";
        map.getViewport().style.cursor = "pointer";
        tooltipContainerElement.style.top = pixel[1] - 65 + "px";
        tooltipContentElement.innerHTML = feature.get("user") ? "Your Location" : feature.get("location").properties?.name ?? "Unnamed Place";
      } else {
        tooltipContainerElement.style.display = "none";
        map.getViewport().style.cursor = "auto";
      }
    } else {
      tooltipContainerElement.style.display = "none";
      map.getViewport().style.cursor = "auto";
    }
    tooltipContainerElement.style.left = pixel[0] - 62 + "px";
  };

  map.on("pointermove", (evt) => {
    if (evt.dragging) {
      tooltipContainerElement.style.display = "none";
    }
    displayTooltip(map.getEventPixel(evt.originalEvent));
  });
};

export const handlePopupDisplay = (map: Map): void => {
  // on click popup
  const popupContainerElement: HTMLDivElement = document.getElementById("popup-container") as HTMLDivElement;
  const popupTextElement: HTMLDivElement = document.getElementById("popup-text") as HTMLDivElement;
  const popupIconElement: HTMLDivElement = document.getElementById("popup-icon") as HTMLDivElement;
  const tooltipContainerElement: HTMLDivElement = document.getElementById("tooltip-container") as HTMLDivElement;

  const overlayLayer: Overlay = new Overlay({
    element: popupContainerElement,
    autoPan: true,
  });

  map.addOverlay(overlayLayer);

  const displayFeaturePopup = (pixel: number[]): void => {
    var feature: Feature = map.forEachFeatureAtPixel(pixel, function (feature) {
      return feature;
    }) as Feature;

    if (feature && feature.get("location")) {
      let location = feature.get("location").properties;

      popupContainerElement.style.display = "block";
      tooltipContainerElement.style.display = "none";
      map.getViewport().style.cursor = "auto";

      popupTextElement.innerHTML = `
      <p> Name: ${location.name ?? "Unknown"} </p>
      <p> Street: ${location.street ?? "Unknown"} </p>
      <p> Post Code: ${location.postcode ?? "Unknown"} </p>`;
      console.log(popupIconElement);

      popupIconElement.addEventListener("click", () => {
        popupIconElement.setAttribute("class", "popup-icon-filled");
      });

      const geometry: Point = feature.getGeometry() as Point;
      const coordinates: Coordinate = geometry.getCoordinates() as Coordinate;

      overlayLayer.setPosition(coordinates);
      map.getView().animate({
        center: coordinates,
        duration: 1000,
      });
    } else {
      popupContainerElement.style.display = "none";
      overlayLayer.setPosition(undefined);
      map.getViewport().style.cursor = "auto";
    }
  };

  map.on("singleclick", (evt) => {
    displayFeaturePopup(map.getEventPixel(evt.originalEvent));
  });
};
