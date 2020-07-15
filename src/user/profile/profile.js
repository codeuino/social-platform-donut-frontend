import React, { Component } from "react";
import "./profile.scss";
import Navigation from "../dashboard/navigation/navigation";
import UserInfo from "./user-info/user-info";
import Portfolio from "../dashboard/portfolio/portfolio";
import { connect } from "react-redux";
import {
  getProfile,
  getEventsCreatedByUser,
  getProjectCreatedByUser,
  getPostsCreatedByUser,
} from "../../actions/usersAction";
import { getAllPinnedPosts } from "../../actions/postAction";
import { getOrgProfile } from "../../actions/orgAction";
import ProfileFeed from "./profile-feed";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: true,
      userProfile: {},
      all: [],
      userEvents: [],
      userProjects: [],
      userPosts: [],
      pinnedPosts: [],
    };
  }

  componentDidMount() {
    console.log("match", this.props.match?.path);
    const path = this.props.match?.path;
    if (path === "/profile") {
      console.log("checking profile");
      setTimeout(() => {
        this.props.getProfile();
        this.props.getOrgProfile();
      });
      setTimeout(() => {
        this.props.getPostsCreatedByUser();
      });
      setTimeout(() => {
        this.props.getEventsCreatedByUser();
      });
      setTimeout(() => {
        this.props.getProjectCreatedByUser();
      });
      setTimeout(() => {
        this.props.getAllPinnedPosts();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("profile nextProps ", nextProps);
    const { userEvents, userProjects, userPosts } = nextProps.user;
    const { pinnedPosts } = nextProps.posts;
    console.log("userEvents ", userEvents);
    console.log("userProjects ", userProjects);
    console.log("userPosts ", userPosts);
    console.log("pinnedPosts ", pinnedPosts);
    let all = [...userEvents, ...userProjects, ...userPosts];
    console.log("all ", all);
    this.setState({
      userProfile: nextProps.user?.userProfile,
      userEvents: userEvents,
      userProjects: userProjects,
      userPosts: userPosts,
      pinnedPosts: pinnedPosts,
      all: all,
    });
  }

  render() {
    const {
      userProfile,
      all,
      userEvents,
      userProjects,
      userPosts,
      pinnedPosts,
    } = this.state;
    return (
      <div className="profile">
        <div className="navigation">
          <Navigation profile={this.state.profile}></Navigation>
        </div>
        <div className="news">
          <div className="notify-user">
            <UserInfo userProfile={userProfile} />
            <Portfolio />
          </div>
          <div className="two">
            <div className="posts-profile">
              {/* <PinPosts 
                all={all} 
                userProjects={userProjects} 
                userEvents={userEvents} 
                userPosts={userPosts}
                pinnedPosts={pinnedPosts}
              /> */}
              <ProfileFeed
                all={all}
                userProjects={userProjects}
                userEvents={userEvents}
                userPosts={userPosts}
                pinnedPosts={pinnedPosts}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  user: state.user,
  posts: state.post,
  event: state.event,
  project: state.project,
});

export default connect(mapStateToProps, {
  getProfile,
  getEventsCreatedByUser,
  getProjectCreatedByUser,
  getPostsCreatedByUser,
  getAllPinnedPosts,
  getOrgProfile,
})(Profile);
