class User {
  constructor({ id, privilege } = {}) {
    this.id = id;
    this.privilege = privilege;
  }

  get user() {
    return {
      id: this.id,
      privilege: this.privilege
    }
  }
}

module.exports = User;