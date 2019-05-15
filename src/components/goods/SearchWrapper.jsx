import React, { Component } from "react";
import SearchFilter from "./parts/SearchFilter";
import SearchList from "./parts/SearchList";

import "../../css/search.css";

class SearchWrapper extends Component {
  render() {
    return (
      <div className="search">
        <SearchFilter />
        <div className="search_main container">
          <SearchList />
        </div>
      </div>
    );
  }
}

export default SearchWrapper;