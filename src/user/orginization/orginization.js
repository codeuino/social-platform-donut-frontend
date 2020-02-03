import React, { Component } from "react";
import "./orginization.scss";
import Navigation from "../dashboard/navigation/navigation";
import OrgInfo from "./org-info/org-info";
import Portfolio from "../dashboard/portfolio/portfolio";
import Posts from "../pinned-posts/posts/posts";

class Orginization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org: true
    };
  }

  render() {
    return (
      <div className="orginization">
        <div className="navigation">
          <Navigation org={this.state.org}></Navigation>
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

export default Orginization;
