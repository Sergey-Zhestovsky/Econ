import React, { Component, PureComponent } from "react";
import Map from "../../goods/Map";
import connections from "../../../storage/connection/rootConnector";

class MapSelector extends PureComponent {
  constructor(props) {
    super(props);
    
    
    this.state = {
      stores: null,
      location: null,
      selectedStore: false
    }
  }

  componentDidMount() {
    connections.storesConnector.getStores()
      .then(result => {
        this.setState({
          stores: result,
          location: this.props.initialLocation || null,
          selectedStore: this.props.initialStore || false
        });
      });
  }

  componentDidUpdate() {
    this.props.stateHandler({
      store: this.state.selectedStore,
      location: this.state.location
    });
  }

  mapClickHandler = (location) => {
    this.setState({
      location
    });
  }

  selectHandler = (e) => {
    this.setState({
      location: null,
      selectedStore: (
        e.target.value !== ""
          ? this.state.stores.find(el => el._id === e.target.value)
          : false
      )
    });
  }

  formatLocation(location) {
    return location && (
      <React.Fragment>
        <span className="map-selector_coordinate-name">x</span>
        {numberFormat(location.x)}
        <span className="map-selector_coordinate-name">y</span>
        {numberFormat(location.y)}
      </React.Fragment>
    );

    function numberFormat(number) { 
      let int = number|0,
        remainder = ((number - int) * 100)|0;

      return (
        <span className="map-selector_coordinate">
          <span>{ int }</span>
          <span className="map-selector_coordinate-sub">{ remainder }</span>
        </span>
      )
    }
  }

  render() {
    return (
      <div className="map-selector">
        <div className="map-selector_menu">
          <label htmlFor="" className="popup_body-field">
            <span>Strage</span>
            <select name="map" id="map" onChange={this.selectHandler} value={this.state.selectedStore._id}>
              <option value="">Select one</option>
              {
                this.state.stores &&
                this.state.stores.map(
                  el => <option value={el._id} key={el._id}>{el.name}</option>
                )
              }
            </select>
          </label>
          <span className="map-selector_coordinates">{this.formatLocation(this.state.location)}</span>
        </div>
        <div className="map-selector-map-wrapper">
          <Map
            map={this.state.selectedStore && this.state.selectedStore.image}
            clickHandler={this.mapClickHandler}
            dots={this.state.location && { location: this.state.location }} />
        </div>
      </div>
    );
  }
}

export default MapSelector;