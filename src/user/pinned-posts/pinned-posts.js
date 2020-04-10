import React, { Component } from "react";
import "./pinned-posts.scss";
import Navigation from "../dashboard/navigation/navigation";
import Updates from "../dashboard/updates/updates";
import PinPosts from '../pinned-posts/posts/pinPosts';

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
          <PinPosts/>
        </div> 
        <div className="promotions">
        <h1 class="organization-update">Organization Updates</h1>
          <Updates></Updates>
        </div>
      </div>
    );
  }
}

export default PinnedPosts;
