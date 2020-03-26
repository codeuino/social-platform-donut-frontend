import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './auth/login/login';
import Dashboard from './user/dashboard/dashboard';
import PinnedPosts from './user/pinned-posts/pinned-posts';
import Profile from './user/profile/profile';
import Organization from './user/organization/organization';
import NotFound from './404/notFound';
import Settings from './user/dashboard/settings/Settings';
import CalendarDashboard from './app-integrations/google-calendar/CalendarDashboard';

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
      <Route exact path='/calendar' component={CalendarDashboard} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
