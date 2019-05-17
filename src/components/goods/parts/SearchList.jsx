import React from "react";
import SearchElement from "./SearchElement";

export default function SearchList(props) {
  let { elementList } = props;

  if (elementList && elementList.length > 0)
    return (
      <div className="search-list">
        {
          elementList.map(el => <SearchElement key={el._id} element={el} />)
        }
      </div>
    );

  if (elementList && elementList.length === 0)
    return (
      <div className="search-list_empty">SO EMPTY</div>
    );

  return null;
}