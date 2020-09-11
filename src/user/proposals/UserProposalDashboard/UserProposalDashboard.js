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
      sideBarOpen: true,
    };
  }
  handleViewSidebar = () => {
    console.log(this.state.sideBarOpen);
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  };
  render() {
    var sideBarClass = this.state.sideBarOpen ? "sidebar-open" : "sidebar";
    return (
      <div className="dashboard">
        <div className={sideBarClass}>
          <Navigation dashboard={this.state.dashboard} />
        </div>
        <button
          onClick={this.handleViewSidebar}
          className="sidebar-toggle"
          style={
            sideBarClass === "sidebar-open"
              ? { marginLeft: "13vw" }
              : { marginLeft: 0 }
          }
        >
          <div />
          <div />
          <div />
        </button>
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
