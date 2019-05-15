import React, { Component } from "react";

import "../../../css/filter.css";

class SelectorFilter extends Component {
  componentDidMount() {
    // get country and type lists
  }

  render() {
    return (
      <div className="search-filter">
        <div className="search-filter_title">Filter</div>
        <form className="search-filter_main">
          <div className="search-filter_form-row">
            <label htmlFor="type">
              <span>Type:</span>
              <select name="type" id="type">
                <option value="64623">type1</option>
                <option value="64625">type2</option>
                <option value="64624">type3</option>
                <option value="646213">type4</option>
              </select>
            </label>
            <label htmlFor="country">
              <span>Country:</span>
              <select name="country" id="country">
                <option value="64623">type1</option>
                <option value="64625">type2</option>
                <option value="64624">type3</option>
                <option value="646213">type4</option>
              </select>
            </label>
          </div>
          <div className="search-filter_form-row center">
            <span>Sort by:</span>
            <label className="search-filter_label-oneliner">
              <span>rating</span>
              <input type="radio" name="sort" value="rating" checked/>
            </label>
            <label className="search-filter_label-oneliner">
              <span>popularity</span>
              <input type="radio" name="sort" value="popularity" />
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default SelectorFilter;