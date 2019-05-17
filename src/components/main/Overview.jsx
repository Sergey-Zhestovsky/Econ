import React, { Component } from "react";
import MapController from "./parts/MapController";
import SampleList from "../goods/SampleList";
import connector from "../../storage/connection/rootConnector";

import "../../css/overview.css";

class Overview extends Component {
  state = {
    ratelist: null,
    countList: null
  };

  componentDidMount() {
    connector.goodsConnector.getGoods(3, "rating")
      .then(result => this.setState({ ratelist: result }));

    connector.goodsConnector.getGoods(3, "addCounter")
      .then(result => this.setState({ countList: result }));
  }

  render() {
    return (
      <div className="overview container">
        <div className="overview_container">
          <span className="overview_container-title main-title">Grocery area</span>
          <div className="overview_map-wrapper">
            <MapController timeOut={1500} />
          </div>
        </div>
        <div className="overview_container">
          <span className="overview_container-title">Most added products</span>
          <SampleList elements={this.state.ratelist} />
        </div>
        <div className="overview_container">
          <span className="overview_container-title">Most rated products</span>
          <SampleList elements={this.state.countList} />
        </div>
      </div>
    );
  }
}

export default Overview;