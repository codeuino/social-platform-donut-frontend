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
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }

  render() {
    return (
      <div className="pinned-posts">
        <div className="navigation">
          <Navigation posts={this.state.pinned_posts}></Navigation>
        </div>
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
