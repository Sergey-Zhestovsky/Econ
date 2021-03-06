import Connector from "./Connector";

export default class UserConnector extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      setUser: pathStructure.setUser = "",
      logout: pathStructure.logout = "",
      login: pathStructure.login = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }

  setUser(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.setUser, data);
  }

  logout() {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.logout);
  }

  login(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.login, data);
  }
}