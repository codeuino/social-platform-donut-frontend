import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./user/auth/login/login";
import Dashboard from "./user/dashboard/dashboard";
import PinnedPosts from "./user/pinned-posts/pinned-posts";
import Profile from "./user/profile/profile";
import Organization from "./user/organization/organization";
import Wikis from "./user/wikis/Wikis";
import NotFound from "./404/notFound";
import Settings from "./user/dashboard/settings/Settings";
import Projects from "./user/projects/projects";
import ProjInfo from "./user/projects/proj-info/proj-info";
import PrivateRoute from "./common/PrivateRoute";
import Maintenance from "./maintenance/maintenance";
import Events from "./user/events/events";
import UserProposalDashboard from "./user/proposals/UserProposalDashboard/UserProposalDashboard";
import ProposalDiscussion from "./user/proposals/ProposalDiscussion/ProposalDiscussion";
import ProposalEditor from "./user/proposals/ProposalEditor/ProposalEditor";
import Admin from "./user/Admin/Admin";
import Setup from "./user/setup/Setup";
import CommunitySetting from "./user/dashboard/Community/CommunitySetting";
import Insight from "./user/dashboard/insights/Insight";
import AdminRoute from "./common/AdminRoute";
import Activity from "./user/Activity/Activity";
import IntegrationsPage from "./user/integrations/IntegrationsPage/IntegrationsPage";
import UserIntegrations from "./user/integrations/UserIntegrations/UserIntegrations";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/maintenance" component={Maintenance}></Route>
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/pinned-posts" component={PinnedPosts} />
      <PrivateRoute exact path="/profile/:id" component={Profile} />
      <PrivateRoute exact path="/:id/proj-info" component={ProjInfo} />
      <PrivateRoute exact path="/organization" component={Organization} />
      <PrivateRoute exact path="/wikis" component={Wikis} />
      <PrivateRoute exact path="/settings" component={Settings} />
      <PrivateRoute exact path="/projects" component={Projects} />
      <PrivateRoute exact path="/events" component={Events} />
      <PrivateRoute exact path="/proposal" component={UserProposalDashboard} />
      <PrivateRoute
        exact
        path="/proposaldiscussion"
        component={ProposalDiscussion}
      />
      <PrivateRoute exact path="/proposaleditor" component={ProposalEditor} />
      <PrivateRoute exact path="/setup" component={Setup} />
      <AdminRoute exact path="/org-settings" component={CommunitySetting} />
      <AdminRoute exact path="/activity/:userId" component={Activity} />
      <PrivateRoute exact path="/insight" component={Insight} />
      <PrivateRoute exact path="/admin" component={Admin} />
      <PrivateRoute exact path="/integrations" component={IntegrationsPage} />
      <PrivateRoute
        exact
        path="/userintegrations"
        component={UserIntegrations}
      />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
