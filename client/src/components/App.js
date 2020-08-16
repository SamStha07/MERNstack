import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header";
import Landing from "./Landing";
import Survey from "./Survey";
import Dashboard from "./Dashboard";

import { fetchUser } from "../actions/index";

class App extends Component {
  componentDidMount() {
    // console.log(this.props.fetchUser());
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/surveys" exact component={Survey} />
            <Route path="/dashboard" exact component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { fetchUser })(App);
