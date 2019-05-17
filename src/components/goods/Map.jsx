import React from "react";
import MapDots from "./parts/MapDots";

import "../../css/map.css";

export default function Map({ map, clickHandler, dots }) {
  function click(e) {
    if (!map || !clickHandler)
      return;

    let target = e.target,
    event = e.nativeEvent,
    location = {
      x: Math.max(0, (event.offsetX / target.width * 100)),
      y: Math.max(0, (event.offsetY / target.height * 100))
    };

    clickHandler(location);
  }

  let mapView;

  if (map)
    mapView = <img className="product-map_plan" src={map}/>
  else if (map === false)
    mapView = <div className="product-map_empty">Nothing yet</div>
  else
    mapView = <div className="product-map_empty">Loading</div>

  return (
    <div className="product-map" onClick={click}>
      {mapView}
      {
        map &&
        <MapDots dots={dots} />
      }
    </div>
  );
}