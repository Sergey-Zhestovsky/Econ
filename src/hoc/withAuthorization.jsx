import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function Authorization(WrappedComponent, { authorized, redirect, privilege }) {
  function checkPrivilege(user) {
    if (!user || !user.privilege)
      return false;

    if (typeof privilege === typeof true)
      return true;

    if (user.privilege.type == privilege)
      return true;

    return false;
  }

  class WithAuthorization extends Component {
    render() {
      let enter = false;

      enter = this.props.authState === authorized
      
      if (privilege)
        enter = privilege && checkPrivilege(this.props.user);

      if (enter)
        return <WrappedComponent {...this.props} />;

      return <Redirect to={redirect} />;
    }
  }

  return connect(mapStateToProps)(WithAuthorization)
}

function mapStateToProps(state) {
  return {
    authState: state.auth.isAuthorize,
    user: state.auth.user
  }
}

export default Authorization;