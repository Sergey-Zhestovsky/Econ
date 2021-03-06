import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./parts/ModerationNavigationBar";
import Goods from "./GoodsController";
import Types from "./TypesTable";
import Countries from "./CountriesTable";
import withAuthrization from "../../hoc/withAuthorization";

import "../../css/moderation.css";

class Moderation extends Component {
  render() {
    let { match } = this.props;

    if (Object.keys(match.params).length === 0)
      return <Redirect to={match.path + "/goods"} />;

    return (
      <div className="moderation container">
        <Router basename="/moderation">
          <div className="moderation_menu">
            <NavBar />
          </div>
          <div className="moderation_main">
            <Switch>
              <Route path={"/goods"} component={Goods} />
              <Route path={"/types"} component={Types} />
              <Route path={"/countries"} component={Countries} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default withAuthrization(Moderation, { authorized: true, redirect: "/", privilege: true });