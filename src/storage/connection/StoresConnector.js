import Connector from "./Connector";

export default class StoresConnector extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      getStores: pathStructure.getStores = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }
  
  getStores() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getStores);
  }

  getDefaultStore() {
    return this.getStores()
      .then( result => result[0] )
  }
}