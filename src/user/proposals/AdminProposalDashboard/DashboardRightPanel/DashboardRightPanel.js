import React, { Component } from "react";
import "./DashboardRightPanel.scss";
import Comments from "./Comments/Comments";
import OtherIdeas from "./OtherIdeas/OtherIdeas";

class DashboardRightPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="panel">
        <div className="panel-comments">
          <Comments />
        </div>
        <div className="panel-ideas">
          <OtherIdeas />
        </div>
      </div>
    );
  }
}

export default DashboardRightPanel;
