import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./auth/login/login";
import Dashboard from "./user/dashboard/dashboard";
import PinnedPosts from "./user/pinned-posts/pinned-posts";
import Profile from "./user/profile/profile";
import Organization from "./user/organization/organization";
import NotFound from "./404/notFound";
import Discourse from "./user/apps/discourse/discourse";
import Settings from "./user/dashboard/settings/Settings";
import CategoryDetails from "./user/apps/discourse/discourse-components/category-details";
import TopicDetails from "./user/apps/discourse/discourse-components/topic-details";


const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/pinned-posts" component={PinnedPosts} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/organization" component={Organization} />
      <Route exact path="/apps/discourse" component={Discourse}/>
      <Route exact path="/c/:category/:id" component={CategoryDetails}></Route>
      <Route exact path="/t/:topic/:id" component={TopicDetails}></Route>
      <Route exact path="/settings" component={Settings}/>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
