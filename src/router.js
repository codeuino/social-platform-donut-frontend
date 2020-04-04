import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './auth/login/Login';
import Dashboard from './user/dashboard/Dashboard';
import PinnedPosts from './user/pinned-posts/PinnedPosts';
import Profile from './user/profile/Profile';
import Organization from './user/organization/Organization';
import NotFound from './404/NotFound';
import Settings from './user/dashboard/settings/Settings';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/pinned-posts' component={PinnedPosts} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/organization' component={Organization} />
      <Route exact path='/settings' component={Settings} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
