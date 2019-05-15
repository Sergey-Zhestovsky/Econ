import React from "react";
import Map from "../../goods/Map";

export default function MapSelector(props) {
  return (
    <div className="map-selector">
      <div className="map-selector_menu">
        <label htmlFor="" className="popup_body-field">
          <span>Strage</span>
          <select name="map" id="map">
            <option value="1">map1</option>
            <option value="2">map2</option>
          </select>
        </label>
        <span className="map-selector_coordinates">x: 1, y: 2</span>
      </div>
      <div className="map-selector-map-wrapper">
        <Map />
      </div>
    </div>
  );
}