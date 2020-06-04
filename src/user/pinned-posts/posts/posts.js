import React, { Component } from "react";
import "./posts.scss";
import userIcon2 from "../../../images/gsoc.png";

class Posts extends Component {
  state = { date: new Date() };
  render() {
    return (
      <div className="posts">
        <div className="pinned-posts">
          <div className="categories">
            <div className="category-type active">All</div>
            <div className="category-type">Donuts</div>
            <div className="category-type">Events</div>
            <div className="category-type">Projects</div>
          </div>
          <div className="article-posts">
            <div className="individual-post">
              <div className="user-info">
                <div className="image">
                  <img src={gsoc} alt="icon" />
                </div>
                <div className="img-desc">
                  <h2>Marjorie Alexander</h2>
                  <p>{this.state.date.toTimeString()}</p>
                </div>
              </div>
              <div className="post-details">
                ex sit ex laboris adipisicing enim eiusmod proident exercitation
                ea fugiat in mollit pariatur occaecat ut nostrud ullamco ex
                official
              </div>
            </div>

            <div className="individual-post">
              <div className="user-info">
                <div className="image">
                  <img src={gsoc} alt="icon" />
                </div>
                <div className="img-desc">
                  <h2>Marjorie Alexander</h2>
                  <p>{this.state.date.toTimeString()}</p>
                </div>
              </div>
              <div className="post-details">
                ex sit ex laboris adipisicing enim eiusmod proident exercitation
                ea fugiat in mollit pariatur occaecat ut nostrud ullamco ex
                official
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
