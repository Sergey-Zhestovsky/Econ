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
    };
    return <div className="product-map_dot" style={style} key={el.location.x+" "+el.location.y}></div>
  });

  return view;
}