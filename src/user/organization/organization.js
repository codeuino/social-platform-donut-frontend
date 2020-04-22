import React, { Component } from "react";
import "./organization.scss";
import Navigation from "../dashboard/navigation/navigation";
import OrgInfo from "./org-info/org-info";
import Portfolio from "../dashboard/portfolio/portfolio";
import Posts from "../pinned-posts/posts/posts";

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="organization">
        <div className="navigation">
          <Navigation></Navigation>
        </div>
        <div className="news">
          <div className="notify-user">
            <OrgInfo></OrgInfo>
            <Portfolio></Portfolio>
          </div>
          <div className="posts-profile">
            <Posts></Posts>
          </div>
        </div>
      </div>
    );
  }
}

export default Organization;
