import React, { Component } from "react";
import "./profile-feed.scss";
import { FaComments, FaGlobe, FaStickyNote, FaCalendar } from "react-icons/fa";
import { connect } from "react-redux";
import {
  getProfile,
  getEventsCreatedByUser,
  getProjectCreatedByUser,
  getPostsCreatedByUser,
} from "../../actions/usersAction";

import { resetComments } from "../../actions/commentAction";
import { Card, Image } from "react-bootstrap";
import { Circle } from "react-shapes";
import ReadMe from "./ReadMe";
import userIcon2 from "../../assets/images/userIcon2.jpg";
import parse from "html-react-parser";
import PostContent from "./content/PostContent";

class ProfileFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "All",
      userProfile: {},
      userEvents: [],
      userProjects: [],
      userPosts: [],
      displayPostContent: false,
      displayingPost: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { userEvents, userProjects, userPosts, userProfile } = nextProps.user;

    this.setState(
      {
        userProfile: nextProps.user?.userProfile,
        userEvents: userEvents,
        userProjects: userProjects,
        userPosts: userPosts,
        longDescription: userProfile?.info?.about?.longDescription,
      },
      () => {
        console.log(this.state.longDescription);
      }
    );
  }

  handleClick = (atrb) => {
    this.setState({
      type: atrb,
    });
  };

  handlePostCLick = (index, postId) => {
    this.setState(
      {
        displayingPost: index,
      },
      () => {
        this.setState({ displayPostContent: true, postId: postId });
      }
    );
  };

  handleOnHide = () => {
    this.props.resetComments();
    this.setState({
      displayingPost: 0,
      displayPostContent: false,
    });
  };

  render() {
    const {
      type,
      userProfile,
      userPosts,
      userEvents,
      displayPostContent,
    } = this.state;

    const events = userEvents.map((post, index) => {
      return (
        <div className="postItem" key={index}>
          <Card className="cardElement">
            <div className="cardTitle">
              <div className="imageContainer">
                <Image src={userIcon2} rounded className="userImage" />
              </div>
              <div className="titleDetails">
                <div className="postTitle">
                  {`${post.createdBy.name.firstName} ${post.createdBy.name.lastName}`}
                </div>
                <dic className="postDate">{post.createdAt}</dic>
              </div>
            </div>
            <div className="cardContent">
              {post.description.shortDescription}
            </div>
            <div className="cardTag">
              <Circle r={5} fill={{ color: "#9e4141" }} /> Event
            </div>
          </Card>
        </div>
      );
    });

    const posts = userPosts.map((post, index) => {
      return (
        <div
          className="postItem"
          onClick={() => this.handlePostCLick(index, post._id)}
        >
          <Card className="cardElement">
            <div className="cardTitle">
              <div className="imageContainer">
                <Image src={userIcon2} rounded className="userImage" />
              </div>
              <div className="titleDetails">
                <div className="postTitle">
                  {`${post?.userId.name.firstName} ${post?.userId.name.lastName}`}
                </div>
                <dic className="postDate">{post.createdAt}</dic>
              </div>
            </div>
            <div className="cardContent">{parse(post.content)}</div>
            <div className="cardTag">
              <Circle r={5} fill={{ color: "#2409ba" }} /> Post
            </div>
          </Card>
        </div>
      );
    });

    const overviewContent = [...posts, ...events];
    const { longDescription } = this.state;

    return (
      <div>
        <div className="feed-posts">
          <div className="categories">
            <div className="tab__container">
              <span className="nav__tab container">
                <ul className="nav__list__container">
                  <li
                    className={
                      type === "All"
                        ? "nav__single__tab selected"
                        : "nav__single__tab"
                    }
                    onClick={() => this.handleClick("All")}
                  >
                    <FaGlobe className="tab__icon" />
                    Overview
                  </li>
                  <li
                    className={
                      type === "Post"
                        ? "nav__single__tab selected"
                        : "nav__single__tab"
                    }
                    onClick={() => this.handleClick("Post")}
                  >
                    <FaComments className="tab__icon" />
                    Pinned Posts
                  </li>
                  <li
                    className={
                      type === "Event"
                        ? "nav__single__tab selected"
                        : "nav__single__tab"
                    }
                    onClick={() => this.handleClick("Event")}
                  >
                    <FaCalendar className="tab__icon" />
                    Events
                  </li>
                  <li
                    className={
                      type === "ReadMe"
                        ? "nav__single__tab selected"
                        : "nav__single__tab"
                    }
                    onClick={() => this.handleClick("ReadMe")}
                  >
                    <FaStickyNote className="tab__icon" />
                    Read Me
                  </li>
                </ul>
              </span>
            </div>
          </div>
        </div>
        <div className="postsContainer">
          {type === "ReadMe" ? <ReadMe userProfile={userProfile} /> : null}
          <div className="gridContainer">
            {type === "All" ? overviewContent : null}
            {type === "Event" ? events : null}
            <PostContent
              show={this.state.displayPostContent}
              displayingPost={this.state.displayingPost}
              onHide={this.handleOnHide}
              postId={this.state.postId}
            />
          </div>
        </div>
      </div>
    );
  }
}

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
  resetComments,
})(ProfileFeed);
