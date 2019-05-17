import React from "react";

export default function MapDots({ dots }) {
  if (!dots)
    return null;

  if (!Array.isArray(dots))
    dots = [dots];

  let view = dots.map(el => {
    let style = {
      top: el.location.y + "%",
      left: el.location.x + "%"
    },
      id = el._id || (el.location.x + " " + el.location.y);
      
    return <div className="map_dot" style={style} key={id}></div>
  });

  return view;
}