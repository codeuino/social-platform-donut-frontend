import React, { Component } from "react";
import "./profile.scss";
import Navigation from "../dashboard/navigation/navigation";
import UserInfo from "./user-info/user-info";
import Portfolio from "../dashboard/portfolio/portfolio";
import ProfileCard from "./profile-card/profile-card"
import Posts from "../pinned-posts/posts/posts";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: true,
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
          <div className="org-info">
            <div className="posts">
              <h2>Pinned Posts</h2>
              <Posts className="posts-imp"></Posts>
            </div>
            <div className="promotions">
              <h2 class="organization-update">Profile</h2>
              <ProfileCard></ProfileCard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
