import React, { Component } from "react";
import "./profile.scss";
import Navigation from "../dashboard/navigation/navigation";
import UserInfo from "./user-info/user-info";
import Portfolio from "../dashboard/portfolio/portfolio";
import PinPosts from "../pinned-posts/posts/pinPosts";
import Updates from "../dashboard/updates/updates";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: true
    };
  }

  render() {
    return (
      <div className="profile">
        <div className="navigation">
          <Navigation profile={this.state.profile}></Navigation>
        </div>
        <div className="news">
          <div className="notify-user">
            <UserInfo></UserInfo>
            <Portfolio></Portfolio>
          </div>
          <div className="two">
          <div className="posts-profile">
            <PinPosts/>
          </div>
          <div className="updat">
            
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
