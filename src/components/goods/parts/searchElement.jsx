import React from "react";
import { Link } from "react-router-dom";

export default function SearchElement(props) {
  const style = {
    backgroundImage: "url('/img/products/b6af6debb9bed5225fd914be900.png')"
  };

  return (

    <div className="search-element">
      <div className="search-element_menu">
        <button className="search-element_menu-add-btn">
          <i class="fas fa-cart-plus"></i>
        </button>
        <Link to={"/product/123"} className="search-element_menu-link">
          <span>Learn more</span>
          <i class="fas fa-long-arrow-alt-right"></i>
        </Link>
      </div>
      <Link to={"/product/123"}>
        <div className="search-element_image" style={style}></div>
        <div className="search-element_title">Product name</div>
        <div className="search-element_price">$ 12</div>
      </Link>
    </div>

  );
}