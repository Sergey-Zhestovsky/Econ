import React from "react";

export default function SampleElement(props) {
  const style = {
    backgroundImage: "url('/img/products/b6af6debb9bed5225fd914be900.png')"
  }

  return (
    <div className="sample-product">
      <div className="sample-product_image" style={style}></div>
      <div className="sample-product_text text-name">Product name</div>
      <div className="sample-product_text text-country">Product Country</div>
      <div className="sample-product_text text-price">$ 12</div>
    </div>
  );
}