import React, { Component } from "react";
import { connect } from "react-redux";
import { getGoods } from "../../storage/actions/goodsActions";
import SelectorFilter from "./parts/SelectorFilter";
import SearchList from "./parts/SearchList";
import SelectorList from "./parts/SelectorList";

import "../../css/search.css";

class SelectorWrapper extends Component {
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
    if (!this.props.goods || !this.state.filterObject)
      return null;

    return filterList(this.state.filterObject, [...this.props.goods]);

    function filterList(config, array) {
      if (config.productType)
        array = array.filter(el => el.productType._id == config.productType);

      if (config.country)
        array = array.filter(el => el.country._id == config.country);

      array = array.sort((a, b) => a[config.sort] - b[config.sort]);

      return array;
    }
  }

  render() {
    let elementList = this.setElementsList(),
      selectorList = elementList && elementList.splice(0, 3);

    elementList = elementList && elementList.length > 0
      ? elementList
      : null;

    return (
      <div className="search">
        <SelectorFilter filterHandler={this.getFilterObject} />
        <div className="search_main container">
          <SelectorList elementList={selectorList} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectorWrapper);