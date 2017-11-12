import React, { Component } from "react";
import { Router } from "react-router";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import history from "./history";
import { Main, Properties, Map } from "./components";

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Properties} />
      </Switch>
    </Router>
  );
}

export default Routes;
