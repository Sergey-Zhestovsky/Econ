import React, { Component } from "react";
import { connect } from "react-redux";
import BasketBody from "./BasketBody";

import "../../css/basket.css";

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.basketRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    if (this.basketRef && this.state.isOpen && !this.basketRef.current.contains(e.target))
      this.toggleMenu();
  }

  toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  removeHandler = (product) => {
    if (product)
      return this.props.deleteProduct(product);

    return this.props.clearBasket();
  }

  render() {
    return (
      <div className="basket_wrapper" ref={this.basketRef}>
        <button onClick={this.toggleMenu}>
          <div className="basket_open-button"><i className="fas fa-star"></i></div>
        </button>
        {
          this.state.isOpen &&
          <BasketBody
            productList={this.props.basket}
            removeHandler={this.removeHandler} />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    basket: state.basket.productrs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteProduct: (product) => dispatch({
      type: "REMOVE_BASKET",
      product
    }),
    clearBasket: () => dispatch({
      type: "CLEAR_BASKET"
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket);