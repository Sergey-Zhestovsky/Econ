import React, { Component } from "react";
import { connect } from "react-redux";
import { getGoods } from "../../storage/actions/goodsActions";
import SearchFilter from "./parts/SearchFilter";
import SearchList from "./parts/SearchList";

import "../../css/search.css";

class SearchWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterObject: null
    };
  }

  getFilterObject = (filter) => {
    this.setState({
      filterObject: filter
    });
  }

  componentDidMount() {
    this.props.getGoods();
  }

  setElementsList() {
    if (!this.props.goods)
      return null;

    let isFilter = this.state.filterObject && this.state.filterObject.useFilter,
      result = isFilter
        ? filterList(this.state.filterObject, [...this.props.goods])
        : this.props.goods

    return result;

    function filterList(config, array) {
      if (config.productType)
        array = array.filter(el => el.productType._id == config.productType);

      if (config.country)
        array = array.filter(el => el.country._id == config.country);

      if (config.discount)
        array = array.filter(el => !!el.discount);

      if (config.name)
        array = array.filter(el => ~el.name.indexOf(config.name));

      return array;
    }
  }

  render() {
    let elementList = this.setElementsList();

    return (
      <div className="search">
        <SearchFilter filterHandler={this.getFilterObject} />
        <div className="search_main container">
          <SearchList elementList={elementList} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    goods: state.goods.goods
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getGoods: () => dispatch(getGoods())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchWrapper);