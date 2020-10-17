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
      userId: "",
    };
  }

  componentDidMount() {
    console.log("match", this.props.match?.path);
    const { path, params } = this.props.match;
    const userId = params.id ? params.id : localStorage.getItem("userId");
    console.log("checking profile", userId);
    setTimeout(() => {
      this.props.getProfile(userId);
      this.props.getOrgProfile();
    });
    setTimeout(() => {
      this.props.getPostsCreatedByUser(userId);
    });
    setTimeout(() => {
      this.props.getEventsCreatedByUser(userId);
    });
    setTimeout(() => {
      this.props.getProjectCreatedByUser(userId);
    });
    setTimeout(() => {
      this.props.getAllPinnedPosts();
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("profile nextProps ", nextProps);
    const { userEvents, userProjects, userPosts } = nextProps.user;
    const { pinnedPosts } = nextProps.posts;
    let all = [...userEvents, ...userProjects, ...userPosts];
    this.setState(
      {
        userProfile: nextProps.user?.userProfile,
        userEvents: userEvents,
        userProjects: userProjects,
        userPosts: userPosts,
        pinnedPosts: pinnedPosts,
        all: all,
      },
      () => {
        console.log("setting profile ", this.state);
      }
    );
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
        <div
          className="navigation"
          style={{
            background: "#f5f5f5",
          }}
        >
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
