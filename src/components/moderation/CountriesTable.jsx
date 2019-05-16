import React, { Component } from "react";
import { connect } from "react-redux";
import ControlTable from "./parts/TableController";

class CountriesTable extends Component {
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
          elements={this.props.countryList}
          schema={this.schema} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    countryList: state.countries.countries,
  }
}

export default connect(mapStateToProps)(CountriesTable);