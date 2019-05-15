import React from "react";
import { Link } from "react-router-dom";

export default function SampleElement(props) {
  const style = {
    backgroundImage: "url('/img/products/b6af6debb9bed5225fd914be900.png')"
  };

  return (
    <Link to="/product/123" className="sample-product">
      <div className="sample-product_image" style={style}></div>
      <div className="sample-product_text text-name">Product name</div>
      <div className="sample-product_text text-country">Product Country</div>
      <div className="sample-product_text text-price">$ 12</div>
    </Link>
  );
}