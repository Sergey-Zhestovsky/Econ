import Connector from "./Connector";

export default class CountryConnector extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      getCountries: pathStructure.getCountries = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }
  
  getCountries() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getCountries);
  }
}