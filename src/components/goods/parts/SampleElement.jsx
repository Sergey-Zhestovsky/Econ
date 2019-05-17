import React from "react";
import { Link } from "react-router-dom";

export default function SampleElement(props) {
  let { element } = props,
  style = {
    backgroundImage: `url('/img/products/${element.image}')`
  };

  return (
    <Link to={`/product/${element._id}`} className="sample-product">
      <div className="sample-product_image" style={style}></div>
      <div className="sample-product_text text-name">{element.name}</div>
      <div className="sample-product_text text-country">{element.productType.name}</div>
      <div className="sample-product_text text-price">$ {element.price}</div>
    </Link>
  );
}