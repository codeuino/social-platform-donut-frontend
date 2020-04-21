import React, { Component } from "react";
import "./organization.scss";
import Navigation from "../dashboard/navigation/navigation";
import OrgInfo from "./org-info/org-info";
import Portfolio from "../dashboard/portfolio/portfolio";
import PinPosts from "../pinned-posts/posts/pinPosts";
import Updates from "../dashboard/updates/updates";

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org: true
    };
  }

  render() {
    return (
      <div className="organization">
        <div className="navigation">
          <Navigation org={this.state.org}></Navigation>
        </div>
        <div className="news">
          <div className="notify-user">
            <OrgInfo></OrgInfo>
            <Portfolio></Portfolio>
          </div>
          <div className="org">
          <div className="posts-profile">
            <PinPosts/>
          </div>
          <div className="updat">
            <Updates/>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Organization;
