import React, { Component } from "react";
import connector from "../../../storage/connection/rootConnector"
import Map from "../../goods/Map";
import Socket from "socket.io-client";

class MapController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: null,
      dots: []
    };
    this.socket = null;
  }

  componentDidMount() {
    this.socket = Socket();

    this.socket.on("favorite", this.setDot);
    this.socket.on('connect_timeout', this.closeConnection);
    this.socket.on('connect_error', this.closeConnection);

    connector.storesConnector.getDefaultStore()
      .then(store => {
        this.setState({
          store
        });
      });
  }

  componentWillUnmount() {
    this.closeConnection();
  }

  setDot = (dot) => {
    if (this.props.timeOut) {
      setTimeout(() => {
        this.removeDot(dot)
      }, this.props.timeOut);
    }

    this.setState({
      dots: [...this.state.dots, dot]
    });
  }

  removeDot(dot) {
    let array = [...this.state.dots],
      index = array.findIndex(el => el._id == dot._id);

    array.splice(index, 1);
    this.setState({
      dots: array
    });
  }

  closeConnection() {
    this.socket.close();
  }

  render() {
    return (
      <Map
        map={this.state.store && this.state.store.image}
        dots={this.state.dots}/>
    );
  }
}

export default MapController;