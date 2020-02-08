import React, { Component } from "react";
import "./user-info.scss";
import { Button } from "react-bootstrap";

class UserInfo extends Component {
  render() {
    return (
      <div className="user-details">
        <div className="user-image">
          <div className="user-pic">
            <img src="" alt="" />
          </div>
          <div className="edit-option">
            <Button variant="primary">User Edit</Button>
          </div>
        </div>
        <div className="user-data">
          <h1>
            Dhanus Rajendra <Button variant="primary">Follow</Button>
          </h1>
          <p className="profession">Front end developer</p>
          <p className="place">Bengaluru, Karnataka</p>
          <p className="desc">
            where millions of people gather together every day to imagine,
            create
          </p>
          <div className="social-icons">
            <Button variant="primary">Facebook</Button>
            <Button variant="primary">Linkedin</Button>
            <Button variant="primary">Github</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
