import React, { Component } from "react";
import SelectorFilter from "./parts/SelectorFilter";
import SearchList from "./parts/SearchList";
import SelectorList from "./parts/SelectorList";

import "../../css/search.css";

class SelectorWrapper extends Component {
  render() {
    return (
      <div className="search">
        <SelectorFilter />
        <div className="search_main container">
          <SelectorList />
          <SearchList />
        </div>
      </div>
    );
  }
}

export default SelectorWrapper;