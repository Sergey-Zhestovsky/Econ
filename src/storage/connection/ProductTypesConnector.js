import Connector from "./Connector";

export default class ProductTypesConnector extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      getProductTypes: pathStructure.getProductTypes = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }
  
  getProductTypes() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getProductTypes);
  }
}