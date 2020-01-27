import React, { Component } from "react";
import "./portfolio.scss";

class Portfolio extends Component {
  render() {
    return (
      <div className="portfolio">
        <div className="items-list">
          <div className="item">
            <h1>41</h1>
            <h3>Donuts</h3>
          </div>
          <div className="item">
            <h1>59</h1>
            <h3>Events Organized</h3>
          </div>
        </div>
        <div className="items-list">
          <div className="item">
            <h1>123</h1>
            <h3>Followers</h3>
          </div>
          <div className="item">
            <h1>87</h1>
            <h3>Events Attended</h3>
          </div>
        </div>
        <div className="items-list">
          <div className="item">
            <h1>12</h1>
            <h3>Projects</h3>
          </div>
          <div className="item">
            <h1>41</h1>
            <h3>Following</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
