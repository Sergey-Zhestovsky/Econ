import React from "react";
import Map from "./Map";

import "../../css/productDetails.css";

export default function ProductDetails(props) {
  const PROPS = ["name", "type", "company", "country", "rating", "price"];

  return (
    <div className="product-details container">
      <div className="product-details_container column-container">
        <div className="product-details_column center">
          <img className="product-details_img" src="/img/products/b6af6debb9bed5225fd914be900.png" alt="" />
        </div>
        <div className="product-details_column column-grid">

          <span className="product-details_field-title">Name</span>
          <span className="product-details_field-context">Some name</span>

          <span className="product-details_field-title">Type</span>
          <span className="product-details_field-context">Some name</span>

          <span className="product-details_field-title">Company</span>
          <span className="product-details_field-context">Some name</span>

          <span className="product-details_field-title">Country</span>
          <span className="product-details_field-context">Some name</span>

          <span className="product-details_field-title">Rating</span>
          <div className="product-details_field-wrapper">
            <span className="product-details_field-context">12,5463</span>
            <span className="product-details_field-meta-context">points</span>
          </div>

          <div className="product-details_field-title"></div>
          <div className="product-details_field-price">$ 12</div>
        </div>
      </div>
      <div className="product-details_container">
        <div className="product-details_container-title">Product Location</div>
        <div className="product-details_map-wrapper">
          <Map />
        </div>
      </div>
    </div>
  );
}