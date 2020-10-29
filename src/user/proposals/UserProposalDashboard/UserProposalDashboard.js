import React, { Component } from "react";
import "./UserProposalDashboard.scss";
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
      <>
        <Navigation dashboard={this.state.dashboard} />
        <div className="proposal_dashboard">
          <div className="proposal_dashboard__content">
            <DashboardContent />
          </div>
          <div className="proposal_dashboard__rightpanel">
            <DashboardRightPanel />
          </div>
        </div>
      </>
    );
  }
}

export default UserProposalDashboard;
