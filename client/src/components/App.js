import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Landing from "./Landing";
import Survey from "./Survey";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/surveys" exact component={Survey} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
