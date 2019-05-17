import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setFavoriteProduct } from "../../storage/actions/goodsActions";

function ElementBusketButton(props) {
  if (!props.element)
    return null;

  let { element, basketList } = props,
    inBasket = ~basketList.findIndex(el => el._id == element._id);

  if (!props.isAuthorized)
    return (
      <Link className="element-basket-btn" to="/signin">
        <i class="fas fa-sign-in-alt"></i>
      </Link>
    )

  if (!inBasket)
    return (
      <button className="element-basket-btn"
        onClick={props.setProductToBasket.bind(null, element)}>
        <i className="far fa-thumbs-up"></i>
      </button>
    )

  return (
    <button className="element-basket-btn"
      onClick={props.removeProductFromBasket.bind(null, element)}>
      <i className="fas fa-times"></i>
    </button>
  );
}

function mapStateToProps(state) {
  return {
    isAuthorized: state.auth.isAuthorize,
    basketList: state.basket.productrs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setProductToBasket: (product) =>  dispatch(setFavoriteProduct(product)),
    removeProductFromBasket: (product) => dispatch({
      type: "REMOVE_BASKET",
      product
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementBusketButton);