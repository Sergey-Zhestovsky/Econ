import React, { Component } from "react";
import { connect } from "react-redux";
import ControlTable from "./TableController";
import GoodsEditForm from "./GoodsEditForm";
import moment from "moment";

class GoodsController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: {
        show: true,
        condition: "add"
      }
    };

    this.schema = {
      numeric: true,
      fields: [
        "name",
        {
          property: "country",
          path: "name"
        },
        {
          property: "productType",
          name: "Type",
          path: "name"
        },
        "rating",
        {
          property: "date",
          format: function (value) {
            return moment(value).calendar()
          }
        }
      ],
      controls: {
        name: "Options",
        buttons: [{
          name: "edit",
          handler: this.editHandler
        }, {
          name: "delete",
          handler: this.deleteHandler
        }]
      }
    };
  }

  openPopUp(condition) {
    this.setState({
      ...this.state,
      popup: {
        show: true,
        condition
      }
    });
  }

  closePopUp() {
    this.setState({
      ...this.state,
      popup: {
        show: false,
        condition: null
      }
    });
  }

  popupCloseHandler = () => {
    this.closePopUp();
  }

  deleteHandler(object) {
    console.log(object);
  }

  editHandler(object) {
    console.log(object);
  }

  render() {
    return (
      <div className="goods-controller">
        <div className="goods-controller_controll-panel">
          <button
            className="goods-controller_controll-add-btn"
            onClick={this.openPopUp.bind(this, "add")}>
            Add
          </button>
        </div>
        <ControlTable
          elements={this.props.goods.goods}
          schema={this.schema} />
        {
          this.state.popup.show &&
          <GoodsEditForm 
          condition={this.state.popup.condition}
          clickHandler={this.popupCloseHandler}
          isOpen={this.state.popup.show} />
        }
      </div>
    );
  }
}

function mapStateFromProps(state) {
  return {
    goods: state.goods
  }
}

export default connect(mapStateFromProps)(GoodsController);