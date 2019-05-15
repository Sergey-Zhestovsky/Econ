import React, { Component } from "react";
import withOverlay from "../../../hoc/withOverlay";
import FileInput from "./FileInput";
import MapSelector from "./MapSelector";

import "../../../css/popup.css";

class GoodsEditForm extends Component {
  constructor(props) {
    super(props);

    this.imageType = /^image\/*/;

    this.state = {
      action: null,
      form: {
        image: {}
      },
      errors: {},
      backgroundImage: "",
      isDragged: false
    };

    this.dragCounter = 0;
  }

  onImageAdded = (file) => {
    if (!file)
      return;

    this.setState({
      form: {
        ...this.state.form,
        image: file
      }
    });

    if (!this.imageType.test(file.type))
      return this.setState({
        backgroundImage: ""
      });;

    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        backgroundImage: reader.result
      });
    }
    reader.readAsDataURL(file);
  }

  onImageDeleted = () => {
    this.setState({
      form: {
        ...this.state.form,
        image: {}
      },
      backgroundImage: ""
    });
  }

  handleDragEnter = (e) => {

    let isFile = e.dataTransfer.types[0] === "Files";

    if (!isFile)
      return;

    e.preventDefault();
    this.dragState(true);
    this.dragCounter++;
  }

  handleDragEnd = (e) => {
    let isFile = e.dataTransfer.types[0] === "Files";

    if (!isFile)
      return;

    e.preventDefault();
    this.dragCounter--;
    this.dragState(false);
  }

  handleDrop = (e) => {
    e.preventDefault();
    this.dragCounter = 0;
    this.dragState(false);
  }

  dragState = (isDragged) => {
    if (this.dragCounter === 0) {
      this.setState({
        isDragged
      });
    }
    console.log(this.state.isDragged);

  }

  render() {
    return (
      <div className="popup">
        <div className="popup_header">
          <div className="popup_header-title">Add</div>
          <div className="popup_header-close">
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="popup_body">
          <div className="popup_body-title">Product</div>
          <form
            autoComplete="off"
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragEnd}
            onDrop={this.handleDrop}>
            <div className="popup_body-wrpper">
              <div className="popup_body-coll">
                <div className="popup_body-img-wrapper">
                  <FileInput
                    onImageAdded={this.onImageAdded}
                    onImageDeleted={this.onImageDeleted}
                    imageName={this.state.form.image.name}
                    backgroundImage={this.state.backgroundImage}
                    isDragged={this.state.isDragged} />
                </div>
              </div>
              <div className="popup_body-coll">
                <div className="popup_body-field-wrapper">
                  <label className="popup_body-field">
                    <span>Name</span>
                    <input type="text" name="name" id="name" />
                  </label>
                  <label className="popup_body-field">
                    <span>type</span>
                    <select name="type" id="type">
                      <option value="1">type1</option>
                      <option value="2">type2</option>
                    </select>
                  </label>
                  <label className="popup_body-field">
                    <span>country</span>
                    <select name="country" id="country">
                      <option value="1">country1</option>
                      <option value="2">country2</option>
                    </select>
                  </label>
                  <label className="popup_body-field">
                    <span>Company</span>
                    <input type="text" name="company" id="company" />
                  </label>
                  <label className="popup_body-field">
                    <span>Price</span>
                    <input type="text" name="price" id="price" />
                  </label>
                  <label className="popup_body-field">
                    <span>Discount</span>
                    <input type="text" name="discount" id="discount" />
                  </label>
                </div>
              </div>
            </div>
            <div className="popup_body-title">Location</div>
            <div className="popup_body-wrpper">
              <MapSelector />
            </div>
            <div className="center">
              <button className="popup_body-submit-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withOverlay(GoodsEditForm);