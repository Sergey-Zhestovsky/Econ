import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../storage/actions/userActions";
import Basket from "../basket/Basket";

function SignedInLinks(props) {
  return (
    <React.Fragment>
      {
        props.uathorize.user && props.uathorize.user.privilege &&
        <NavLink to="/moderation" className="navbar_menu-item">Moderation</NavLink>
      }
      <Basket />
      <button className="navbar_menu-item" onClick={props.signOut}>Log Out</button>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    uathorize: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(signOut())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);