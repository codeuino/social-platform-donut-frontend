import React, { Component } from "react";
import "./AdminProposalDashboard.scss";
import Navigation from "../../dashboard/navigation/navigation";
import DashboardContent from "./DashboardContent/DashboardContent";
import DashboardRightPanel from "./DashboardRightPanel/DashboardRightPanel";

class UserProposalDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: true,
      isLoading: true,
    };
  }
  render() {
    return (
      <div className="dashboard">
        <div className="dashboard__navigation">
          <Navigation dashboard={this.state.dashboard} />
        </div>
        <div className="dashboard__content">
          <DashboardContent />
        </div>
        <div className="dashboard__rightpanel">
          <DashboardRightPanel />
        </div>
      </div>
    );
  }
}

export default UserProposalDashboard;
