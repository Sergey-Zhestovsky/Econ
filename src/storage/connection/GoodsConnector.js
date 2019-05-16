import Connector from "./Connector";

export default class GoodsConnector extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      getGoods: pathStructure.getGoods = "",
      setProduct: pathStructure.setProduct = "",
      updateProduct: pathStructure.updateProduct = "",
      deleteProduct: pathStructure.deleteProduct = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }

  getGoods() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getGoods);
  }

  setProduct(product) {
    let path = this.pathStructure,
      formData = new FormData();

    for (let field in product) {
      formData.append(field, product[field]);
    }

    return super.straightRequest(path.root + path.setProduct, formData, undefined, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  updateProduct(product) {
    let path = this.pathStructure,
      formData = new FormData();

    for (let field in product) {
      formData.append(field, product[field]);
    }

    return super.straightRequest(path.root + path.updateProduct, formData, undefined, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  deleteProduct(id) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.deleteProduct, {id});
  }
}