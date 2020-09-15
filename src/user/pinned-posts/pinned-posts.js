import React, { Component } from "react";
import "./pinned-posts.scss";
import Navigation from "../dashboard/navigation/navigation";
import PinPosts from "../pinned-posts/posts/pinPosts";
import pinnedPostsLoading from "../../placeholderLoading/pinnedPostsLoading/pinnedPostsLoading";

class PinnedPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pinned_posts: true,
      sideBarOpen: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }
  handleViewSidebar = () => {
    console.log(this.state.sideBarOpen);
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  };
  render() {
    var sideBarClass = this.state.sideBarOpen ? "sidebar-open" : "sidebar";
    return (
      <div className="pinned-posts">
        <div className={sideBarClass}>
          <Navigation posts={this.state.pinned_posts}></Navigation>
        </div>
        <button
          onClick={this.handleViewSidebar}
          className="sidebar-toggle"
          style={
            sideBarClass === "sidebar-open"
              ? { marginLeft: "13vw" }
              : { marginLeft: 0 }
          }
        >
          <div />
          <div />
          <div />
        </button>
        <div className="news">
          {this.state.isLoading ? pinnedPostsLoading() : <PinPosts />}
        </div>
        <div className="promotions">
          {/* {this.state.isLoading ? orgUpdatesLoading() : <Updates />} */}
        </div>
      </div>
    );
  }
}

export default PinnedPosts;
