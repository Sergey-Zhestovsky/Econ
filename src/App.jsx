import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Overview from "./components/main/Overview";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path={"/"} exaxt component={Overview}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;