import React, { Component } from "react";
import Donut from "./Donut/Donut";
import AboutUs from "./AboutUs/AboutUs";
import "./posts.scss";

class Posts extends Component {
  state = { route: "AboutUs", active:1 };

  onTabChange = (data,index) => {
    this.setState({
      route: data,
      active:index
    }
    )
  }

  render() {
    return (
      <div className="posts">
        <h1>Posts</h1>
        <div className="pinned-posts">
          <div className="categories">
            <div className={this.state.active==1 ? "category-type active" : "category-type"} onClick={()=>this.onTabChange("AboutUs",1)}>About Us</div>
            <div className={this.state.active==2 ? "category-type active" : "category-type"} onClick={()=>this.onTabChange("Donuts",2)}>Donuts</div>
            <div className={this.state.active==3 ? "category-type active" : "category-type"} onClick={()=>this.onTabChange("Events",3)}>Events</div>
            <div className={this.state.active==4 ? "category-type active" : "category-type"} onClick={()=>this.onTabChange("Projects",4)}>Projects</div>
          </div>

          { this.state.route==="AboutUs" ?
            <AboutUs></AboutUs>:
            <Donut></Donut>
          }
    
        </div>
      </div>
    );
  }
}

export default Posts;
