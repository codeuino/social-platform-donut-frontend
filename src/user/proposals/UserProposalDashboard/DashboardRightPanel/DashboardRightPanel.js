import React, { Component } from "react";
import "./DashboardRightPanel.scss";
import Comments from "./Comments/Comments";
import Notifications from "./Notifications/Notifications";

class DashboardRightPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="panel">
        <div className="panel-ideas">
          <Notifications />
        </div>
        <div className="panel-comments">
          <Comments />
        </div>
      </div>
    );
  }
}

export default DashboardRightPanel;
