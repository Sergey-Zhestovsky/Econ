import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ElementBusketButton from "../../basket/ElementBusketButton";

function SearchElement(props) {
  let { element } = props,
    style = {
      backgroundImage: `url('/img/products/${element.image}')`
    };

  return (
    <div className="search-element">
      <div className="search-element_menu">
        <ElementBusketButton element={element} />
        <Link to={"/product/" + element._id} className="search-element_menu-link">
          <span>Learn more</span>
          <i className="fas fa-long-arrow-alt-right"></i>
        </Link>
      </div>
      <Link to={"/product/" + element._id}>
        <div className="search-element_image" style={style}></div>
        <div className="search-element_title">{element.name}</div>
        <div className="search-element_price">$ {element.price}</div>
      </Link>
    </div>
  );
}

export default SearchElement;