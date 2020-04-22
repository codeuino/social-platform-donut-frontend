import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./auth/login/login";
import Dashboard from "./user/dashboard/dashboard";
import PinnedPosts from "./user/pinned-posts/pinned-posts";
import Profile from "./user/profile/profile";
import Organization from "./user/organization/organization";
import NotFound from "./404/notFound";
import Settings from "./user/dashboard/settings/Settings";
import Projects from "./user/projects/projects";
import ProjInfo from "./user/projects/proj-info/proj-info";
import PrivateRoute from "./common/PrivateRoute";
import Maintenance from "./maintenance/maintenance";


const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/maintenance" component={Maintenance}></Route>
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/pinned-posts" component={PinnedPosts} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/:id/proj-info" component={ProjInfo} />
      <PrivateRoute exact path="/organization" component={Organization} />
      <PrivateRoute exact path="/settings" component={Settings}/>
      <PrivateRoute exact path="/projects" component={Projects}/>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
