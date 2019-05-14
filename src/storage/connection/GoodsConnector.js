import Connector from "./Connector";

export default class GoodsConnector extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      getGoods: pathStructure.getGoods = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }
  
  getGoods(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getGoods, data);
  }
}