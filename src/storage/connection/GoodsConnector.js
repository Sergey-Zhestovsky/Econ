import Connector from "./Connector";

export default class GoodsConnector extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      getGoods: pathStructure.getGoods = "",
      setProduct: pathStructure.setProduct = "",
      updateProduct: pathStructure.updateProduct = "",
      deleteProduct: pathStructure.deleteProduct = "",
      getProduct: pathStructure.getProduct = "",
      setFavorite: pathStructure.setFavorite = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }

  getGoods(length, sortedBy) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getGoods, {length, sortedBy});
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

  getProduct(id) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getProduct, {id});
  }

  setFavorite(product) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.setFavorite, product);
  }
}