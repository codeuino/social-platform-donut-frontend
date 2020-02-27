import React, { Component } from "react";
import "./pinned-posts.scss";
import Navigation from "../dashboard/navigation/navigation";
import Posts from "./posts/posts";
import Updates from "../dashboard/updates/updates";

class PinnedPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinned_posts: true
    };
  }

  render() {
    return (
      <div className="pinned-posts">
        <div className="navigation">
          <Navigation posts={this.state.pinned_posts}></Navigation>
        </div>
        <div className="news">
        <h1 class="Pinned-post">Pinned Posts</h1>
          <Posts></Posts>
        </div>
        <div className="promotions mt-3">
        <h1 class="organization-update">Organization Updates</h1>
          <Updates></Updates>
        </div>
      </div>
    );
  }
}

export default PinnedPosts;
