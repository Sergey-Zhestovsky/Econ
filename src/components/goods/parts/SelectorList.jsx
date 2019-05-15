import React from "react";
import SearchElement from "./SearchElement";

export default function SelectorList(props) {
  return (
    <div className="selector-list">
      <div className="selector-list_first">
        <SearchElement />
      </div>
      <div className="selector-list_second">
        <SearchElement />
      </div>
      <div className="selector-list_third">
        <SearchElement />
      </div>
    </div>
  );
}