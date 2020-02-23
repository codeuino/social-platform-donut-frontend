import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./news-feed.scss";
import gsoc from "../../../images/gsoc.png";
import { AddProject } from "../../../popups/AddProject/AddProject";
import { AddPost } from "../../../popups/AddPost/AddPost";

class NewsFeed extends Component {
  state = { date: new Date(), addProject: false, addPost: false };
  render() {
    const closePopup =()=>this.setState({
      addProject:false,
      addPost:false
    })
    return (
      <div className="news-feed">
        <div className="post-article">
          <div className="article">
            <input type="text" placeholder="write a post..." onClick={()=>this.setState({addPost:true})} />
            <AddPost show={this.state.addPost} onHide={closePopup}/>
            <div className="cta">
              <Button variant="primary">Event</Button>
              <Button variant="primary" onClick={()=>this.setState({addProject:true})}>Project</Button>
              <AddProject show={this.state.addProject} onHide={closePopup}/>
            </div>
          </div>
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

export default NewsFeed;
