import React from "react";
import SearchElement from "./SearchElement";

export default function SelectorList(props) {
  let { elementList } = props;

  if (!elementList)
    return null;

  return (
    <div className="selector-list">
      <div className="selector-list_first">
        {
          elementList[0] &&
          <SearchElement element={elementList[0]} />
        }
      </div>
      <div className="selector-list_second">
        {
          elementList[1] &&
          <SearchElement element={elementList[1]} />
        }
      </div>
      <div className="selector-list_third">
        {
          elementList[2] &&
          <SearchElement element={elementList[2]} />
        }
      </div>
    </div>
  );
}