import React, { Component } from "react";
import Map from "../goods/Map";
import SampleList from "../goods/SampleList";

import "../../css/overview.css";

class Overview extends Component {
  render() {
    return (
      <div className="overview container">
        <div className="overview_container">
          <span className="overview_container-title main-title">Grocery area</span>
          <div className="overview_map-wrapper">
            <Map />
          </div>
        </div>
        <div className="overview_container">
          <span className="overview_container-title">Most added products</span>
          <SampleList />
        </div>
        <div className="overview_container">
          <span className="overview_container-title">Most rated products</span>
          <SampleList />
        </div>
      </div>
    );
  }
}

export default Overview;