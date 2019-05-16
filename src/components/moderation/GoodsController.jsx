import React, { Component } from "react";
import { connect } from "react-redux";
import { getGoods, deleteProduct } from "../../storage/actions/goodsActions";
import ControlTable from "./parts/TableController";
import GoodsEditForm from "./parts/GoodsEditForm";
import moment from "moment";

class GoodsController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: {
        show: false,
        condition: null,
        element: null
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

  componentDidMount() {
    this.props.getGoods();
  }

  openPopUp(condition, element) {
    this.setState({
      ...this.state,
      popup: {
        show: true,
        condition,
        element
      }
    });
  }

  closePopUp() {
    this.setState({
      ...this.state,
      popup: {
        show: false,
        condition: null,
        element: null
      }
    });
  }

  popupCloseHandler = () => {
    this.closePopUp();
  }

  deleteHandler = (object) => {
    this.props.deleteProduct(object._id);
  }

  editHandler = (object) => {
    this.openPopUp("edit", object);
  }

  render() {
    return (
      <div className="goods-controller">
        <div className="goods-controller_controll-panel">
          <button
            className="goods-controller_controll-add-btn"
            onClick={this.openPopUp.bind(this, "add", null)}>
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
          isOpen={this.state.popup.show}
          element={this.state.popup.element} />
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

function mapDispatchToProps(dispatch) {
  return {
    getGoods: () => dispatch(getGoods()),
    deleteProduct: (id) => dispatch(deleteProduct(id))
  }
}

export default connect(mapStateFromProps, mapDispatchToProps)(GoodsController);