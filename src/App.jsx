import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./hoc/ScrollToTop";
import Navbar from "./components/navigation/Navbar";
import Overview from "./components/main/Overview";
import Search from "./components/goods/SearchWrapper";
import Selector from "./components/goods/SelectorWrapper";
import ProductDetails from "./components/goods/ProductDetails";
import Moderation from "./components/moderation/Moderation";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";

class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <div className="App">
            <Navbar />
            <Switch>
              <Route path={"/"} exact component={Overview} />
              <Route path={"/products"} component={Search} />
              <Route path={"/selector"} component={Selector} />
              <Route path={"/product/:id"} component={ProductDetails} />
              <Route path={["/moderation/:table", "/moderation", ]} component={Moderation} />
              <Route path={"/signup"} component={SignUp} />
              <Route path={"/signin"} component={SignIn} />
            </Switch>
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;