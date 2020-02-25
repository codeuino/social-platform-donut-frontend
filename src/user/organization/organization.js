import React, { Component } from "react";
import "./organization.scss";
import Navigation from "../dashboard/navigation/navigation";
import OrgInfo from "./org-info/org-info";
import Portfolio from "../dashboard/portfolio/portfolio";
import Posts from "../pinned-posts/posts/posts";
import Updates from "../dashboard/updates/updates";
import Contact from "./Contact/Contact";

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
          <div className="posts-profile">
            <Posts></Posts>
            <div className="post-sidebar">
            <Updates></Updates>
            <Contact></Contact>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Organization;
