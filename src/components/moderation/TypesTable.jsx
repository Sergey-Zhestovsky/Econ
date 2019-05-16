import React, { Component } from "react";
import { connect } from "react-redux";
import ControlTable from "./parts/TableController";

class TypesTable extends Component {
  schema = {
    numeric: true,
    fields: [
      "name",
      "rating",
    ]
  };

  render() {
    return (
      <div className="goods-controller">
        <ControlTable
          elements={this.props.productTypeList}
          schema={this.schema} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    productTypeList: state.productTypes.types
  }
}

export default connect(mapStateToProps)(TypesTable);