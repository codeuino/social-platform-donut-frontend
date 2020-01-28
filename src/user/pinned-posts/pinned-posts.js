import React, { Component } from "react";
import "./pinned-posts.scss";
import Navigation from "../dashboard/navigation/navigation";
import Posts from "./posts/posts";
import Updates from "../dashboard/updates/updates";

class PinnedPosts extends Component {
  render() {
    return (
      <div className="pinned-posts">
        <div className="navigation">
          <Navigation></Navigation>
        </div>
        <div className="news">
          <Posts></Posts>
        </div>
        <div className="promotions">
          <Updates></Updates>
        </div>
      </div>
    );
  }
}

export default PinnedPosts;
