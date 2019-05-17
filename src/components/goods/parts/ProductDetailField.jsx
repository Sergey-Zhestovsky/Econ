import React from "react";

export default function ProductDetailField(props) {
  let { name, value } = props;

  return (
    <React.Fragment>
      <span className="product-details_field-title">{name}</span>
      <span className="product-details_field-context">{value}</span>
    </React.Fragment>
  );
}