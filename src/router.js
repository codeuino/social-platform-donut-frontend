import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./auth/login/login";
import Dashboard from "./user/dashboard/dashboard";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default Router;
