import React from "react";

import "../../css/map.css";

export default function Map({map, defaultPositions, liveSocket}) {
  let style = {
    backgroundImage: "url('/img/stores/default.png')"
  }

  return (
    <div className="product-map">
      <img className="product-map_paln" src="/img/stores/default.png" alt=""/>
    </div>
  );
}