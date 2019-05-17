import React, { Component } from "react";
import { Link } from "react-router-dom";
import Map from "./Map";
import ProductDetailField from "./parts/ProductDetailField";
import connector from "../../storage/connection/rootConnector";
import ElementBusketButton from "../basket/ElementBusketButton";

import "../../css/productDetails.css";

class ProductDetails extends Component {
  state = {
    loaded: false,
    product: null
  }

  fieldConfig = [{
    prop: "name",
    name: "Name"
  }, {
    prop: "productType",
    name: "Type",
    path: "name"
  }, {
    prop: "company",
    name: "Company"
  }, {
    prop: "country",
    name: "Country",
    path: "name"
  }];

  componentDidMount() {
    connector.goodsConnector.getProduct(this.props.match.params.id)
      .then(product => this.setState({
        product,
        loaded: true
      }))
      .catch(error => this.setState({
        loaded: true
      }));
  }

  renderWrapper(child) {
    console.log(this.props)
    return (
      <div className="product-details container">
        <div className="product-details_menu">
          <button onClick={this.props.history.goBack} className="product-details_back-btn">
            <div className="product-details_back-text"><i className="fas fa-long-arrow-alt-left"></i>Back</div>
          </button>
          {
            this.state.product &&
            <div className="product-details_menu-wrapper">
              <div className="product-details_menu-name">Basket:</div>
              <ElementBusketButton element={this.state.product} />
            </div>
          }
        </div>
        {child}
      </div>
    );
  }

  render() {
    if (!this.state.loaded)
      return this.renderWrapper(
        <div className="product-details_alert">LOADING</div>
      )

    if (!this.state.product)
      return this.renderWrapper(
        <div className="product-details_alert">NOT FOUND</div>
      )

    let product = this.state.product;

    if (!product)
      return 1;

    let fields = product && this.fieldConfig.map(
      field => <ProductDetailField
        key={field.prop}
        name={field.name}
        value={field.path ? product[field.prop][field.path] : product[field.prop]} />
    );

    return this.renderWrapper(
      <React.Fragment>
        <div className="product-details_container column-container">
          <div className="product-details_column center">
            <img className="product-details_img" src={"/img/products/" + product.image} alt="" />
          </div>
          <div className="product-details_column column-grid">
            {fields}
            <span className="product-details_field-title">Rating</span>
            <div className="product-details_field-wrapper">
              <span className="product-details_field-context">{product.rating}</span>
              <span className="product-details_field-meta-context">points</span>
            </div>
            <div className="product-details_field-title"></div>
            <div className="product-details_field-price">$ {product.price}</div>
          </div>
        </div>
        <div className="product-details_container">
          <div className="product-details_container-title">Product Location</div>
          <div className="product-details_map-wrapper">
            <Map
              map={product.store.image}
              dots={{ location: product.location }} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductDetails;