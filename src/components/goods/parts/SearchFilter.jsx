import React, { PureComponent } from "react";
import { connect } from "react-redux";

import "../../../css/filter.css";

class SearchFilter extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      productType: "",
      country: "",
      discount: false,
      name: "",
      useFilter: false
    };
    this.timer = null;
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  toggleHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  }

  componentDidUpdate() {
    const TIMEOT = 10;

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      let temp = { ...this.state };
      return this.props.filterHandler(temp);
    }, TIMEOT);
  }

  render() {
    return (
      <div className={"search-filter" + (this.state.useFilter && " active" || "")}>
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
          <div className="search-filter_form-row">
            <label htmlFor="discount">
              <span>With discount</span>
              <input type="checkbox" name="discount" id="discount"
                onChange={this.toggleHandler}
                checked={this.state.discount} />
            </label>
          </div>
          <div className="search-filter_form-row">
            <label className="full-width" htmlFor="name">
              <span>Name:</span>
              <input className="search-filter_input-full-width" type="text" name="name" id="name"
                onChange={this.changeHandler}
                value={this.state.name} />
            </label>
          </div>
          <div className="search-filter_form-row center">
            <label htmlFor="useFilter">
              <span>Use filter</span>
              <input type="checkbox" name="useFilter" id="useFilter"
                onChange={this.toggleHandler}
                checked={this.state.useFilter} />
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

export default connect(mapStateToProps)(SearchFilter);