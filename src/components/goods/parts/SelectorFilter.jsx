import React, { Component, PureComponent } from "react";
import { connect } from "react-redux";

import "../../../css/filter.css";

class SelectorFilter extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      productType: "",
      country: "",
      sort: "rating"
    };
    this.timer = null;
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    this.props.filterHandler({ ...this.state });
  }

  componentDidUpdate() {
    this.props.filterHandler({ ...this.state });
  }

  render() {
    return (
      <div className="search-filter">
        <div className="search-filter_title">Filter</div>
        <form className="search-filter_main">
          <div className="search-filter_form-row">
            <label htmlFor="type">
              <span>Type:</span>
              <select name="productType" id="productType" onChange={this.changeHandler} value={this.state.productType}>
                <option value="">Select some</option>
                {
                  this.props.productTypeList &&
                  this.props.productTypeList.map(
                    el => <option key={el._id} value={el._id}>{el.name}</option>
                  )
                }
              </select>
            </label>
            <label htmlFor="country">
              <span>Country:</span>
              <select name="country" id="country" onChange={this.changeHandler} value={this.state.country}>
                <option value="">Select some</option>
                {
                  this.props.countryList &&
                  this.props.countryList.map(
                    el => <option key={el._id} value={el._id}>{el.name}</option>
                  )
                }
              </select>
            </label>
          </div>
          <div className="search-filter_form-row center">
            <span>Sort by:</span>
            <label className="search-filter_label-oneliner">
              <span>rating</span>
              <input type="radio" name="sort" value="rating"
                checked={this.state.sort == "rating"} onChange={this.changeHandler} />
            </label>
            <label className="search-filter_label-oneliner">
              <span>popularity</span>
              <input type="radio" name="sort" value="addCounter"
                checked={this.state.sort == "addCounter"} onChange={this.changeHandler} />
            </label>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    countryList: state.countries.countries,
    productTypeList: state.productTypes.types
  }
}

export default connect(mapStateToProps)(SelectorFilter);