import Map from "ol/Map";

export const handleTooltipDisplay = (map: Map) => {
  const overlayContainerElement = document.getElementById("tooltip-container") as HTMLDivElement;
  const overlayContentElement = document.getElementById("tooltip-content") as HTMLDivElement;
  const overlayContainerPopupElement = document.getElementById("popup-container") as HTMLDivElement;

  const displayTooltip = (pixel: number[]) => {
    var feature = map.forEachFeatureAtPixel(pixel, function (feature) {
      return feature;
    });
    if (feature) {
      if ((feature.get("user") || feature.get("location")) && overlayContainerPopupElement.style.display !== "block") {
        console.log("there is feature!", feature.get("location"));
        overlayContainerElement.style.display = "block";
        map.getViewport().style.cursor = "pointer";
        overlayContainerElement.style.top = pixel[1] - 65 + "px";
        overlayContentElement.innerHTML = feature.get("user") ? "Your Location" : feature.get("location").properties?.name ?? "Unnamed Place";
      } else {
        overlayContainerElement.style.display = "none";
        map.getViewport().style.cursor = "auto";
      }
    } else {
      overlayContainerElement.style.display = "none";
      map.getViewport().style.cursor = "auto";
    }
    overlayContainerElement.style.left = pixel[0] - 62 + "px";
  };

  map.on("pointermove", (evt) => {
    if (evt.dragging) {
      overlayContainerElement.style.display = "none";
    }
    displayTooltip(map.getEventPixel(evt.originalEvent));
  });
};
