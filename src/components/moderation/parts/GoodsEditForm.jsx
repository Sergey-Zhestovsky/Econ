import React, { Component } from "react";
import withOverlay from "../../../hoc/withOverlay";
import FileInput from "./FileInput";
import MapSelector from "./MapSelector";
import { connect } from "react-redux";
import Validator from "../../../js/validator";
import FormErrors from "./FormErrors";
import { setProduct, editProduct } from "../../../storage/actions/goodsActions";

import "../../../css/popup.css";

class GoodsEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        _id: null,
        name: "",
        productType: "",
        country: "",
        company: "",
        price: "",
        discount: "",
        image: {},
        store: null,
        location: null
      },
      errors: {},
      backgroundImage: "",
      isDragged: false,
      initialImage: ""
    };

    this.dragCounter = 0;
    this.imageMaxSize = 20000000;
    this.imageType = /^image\/*/;
    this.validator = {};
    this.validator.add = {
      name: ["required", ["maxSize", 50]],
      productType: ["required"],
      country: ["required"],
      company: ["required", ["maxSize", 50]],
      price: ["required", "number"],
      discount: ["number"],
      image: {
        property: ["type", "type", "size"],
        rules: [
          "required",
          ["test", this.imageType, "imageType"],
          ["larger", this.imageMaxSize, "imageSize"]
        ]
      },
      store: ["required"],
      location: ["required"]
    };
    this.validator.edit = {
      ...this.validator.add,
      image: {
        property: ["type", "size"],
        rules: [
          ["test", this.imageType, "imageType"],
          ["larger", this.imageMaxSize, "imageSize"]
        ]
      }
    };
    
    this.validator = new Validator(this.validator[this.props.condition]);

    if (props.element) {
      this.initStateByElement(props.element);
    }
  }

  initStateByElement(el) {
    this.state = {
      ...this.state,
      form: {
        _id: el._id,
        name: el.name || "",
        productType: el.productType._id || "",
        country: el.country._id || "",
        company: el.company || "",
        price: el.price || "",
        discount: el.discount || "",
        image: el.image || {},
        store: el.store,
        location: el.location
      },
      initialImage: "/img/products/" + el.image
    };
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  submitHandler = (e) => {
    e.preventDefault();

    if (this.props.poductLoaded)
      return;

    let product = {...this.state.form},
      errors = this.validator.validate(product);

    this.setState({
      errors
    });

    if (Object.keys(errors).length === 0) {
      if (!product._id)
        delete product._id;

      product.date = Date.now();
      product.location = JSON.stringify(this.state.form.location);
      typeof product.image === typeof "" && ( delete product.image )

      let fc = this.setFunction(this.props.condition);

      if (fc)
        return fc(product, (result) => {
          this.props.clickHandler();
        });
    }
  }

  setFunction(action) {
    switch (action) {
      case "add":
        return this.props.setProduct;
      case "edit":
        return this.props.editProduct;
      default:
        return null;
    }
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
  }

  mapSateHandler = (state) => {
    this.setState({
      form: {
        ...this.state.form,
        ...state,
        location: state.location,
        store: state.store._id
      }
    })
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_header">
          <div className="popup_header-title">{this.props.condition}</div>
          <div className="popup_header-close" onClick={this.props.clickHandler}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="popup_body">
          <div className="popup_body-title">Product</div>
          <form
            autoComplete="off"
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragEnd}
            onDrop={this.handleDrop}
            onSubmit={this.submitHandler}>
            <div className="popup_body-wrpper">
              <div className="popup_body-coll">
                <div className="popup_body-img-wrapper">
                  <FileInput
                    onImageAdded={this.onImageAdded}
                    onImageDeleted={this.onImageDeleted}
                    imageName={this.state.form.image.name}
                    backgroundImage={this.state.backgroundImage || this.state.initialImage}
                    isDragged={this.state.isDragged} />
                </div>
              </div>
              <div className="popup_body-coll">
                <div className="popup_body-field-wrapper">
                  <label className="popup_body-field">
                    <span>Name</span>
                    <input type="text" name="name" id="name" onChange={this.handleChange} value={this.state.form.name} />
                  </label>
                  <label className="popup_body-field">
                    <span>type</span>
                    <select name="productType" id="productType" onChange={this.handleChange} value={this.state.form.productType}>
                      <option value="">Select one</option>
                      {
                        this.props.productTypeList.map(
                          (el) => <option value={el._id} key={el._id}>{el.name}</option>
                        )
                      }
                    </select>
                  </label>
                  <label className="popup_body-field">
                    <span>country</span>
                    <select name="country" id="country" onChange={this.handleChange} value={this.state.form.country}>
                      <option value="">Select one</option>
                      {
                        this.props.countryList.map(
                          (el) => <option value={el._id} key={el._id}>{el.name}</option>
                        )
                      }
                    </select>
                  </label>
                  <label className="popup_body-field">
                    <span>Company</span>
                    <input type="text" name="company" id="company" onChange={this.handleChange} value={this.state.form.company} />
                  </label>
                  <label className="popup_body-field">
                    <span>Price</span>
                    <input type="text" name="price" id="price" onChange={this.handleChange} value={this.state.form.price} />
                  </label>
                  <label className="popup_body-field">
                    <span>Discount</span>
                    <input type="text" name="discount" id="discount" onChange={this.handleChange} value={this.state.form.discount} />
                  </label>
                </div>
              </div>
            </div>
            <div className="popup_body-title">Location</div>
            <div className="popup_body-wrpper">
              <MapSelector
                stateHandler={this.mapSateHandler}
                initialStore={this.state.form.store}
                initialLocation={this.state.form.location} />
            </div>
            <FormErrors errors={this.state.errors} />
            <div className="center">
              <button className="popup_body-submit-btn">
                {
                  this.props.poductLoaded
                    ? "Loading"
                    : "Submit"
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    poductLoaded: state.goods.loading,
    countryList: state.countries.countries,
    productTypeList: state.productTypes.types
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setProduct: (product, cb) => dispatch(setProduct(product, cb)),
    editProduct: (product, cb) => dispatch(editProduct(product, cb)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withOverlay(GoodsEditForm));