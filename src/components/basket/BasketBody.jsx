import React from "react";
import { Link } from "react-router-dom";

export default function BasketBody(props) {
  let { productList } = props;

  function clickHandler(element, e) {
    e.preventDefault();
    props.removeHandler(element);
  }

  productList = productList && productList.map(
    el => (
      <Link to={"/product/" + el._id} key={el._id}>
        <div className="basket_list-element" >
          <div className="basket_list-element-image"
            style={{ backgroundImage: `url('/img/products/${el.image}')` }}></div>
          <div className="basket_list-element-name">{el.name}</div>
          <button className="basket_list-element-remove"
            onClick={clickHandler.bind(null, el)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </Link>
    )
  );

  if (productList.length === 0)
    productList = <div className="basket_empty">NOTHING YET</div>

  return (
    <div className="basket">
      <div className="basket_list">
        {productList}
      </div>
      <div className="basket_menu">
        <button className="basket_menu-button" onClick={props.removeHandler.bind(null, null)}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
}