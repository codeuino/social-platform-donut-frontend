import React, { Component } from "react";
import "./org-info.scss";
import { Button } from "react-bootstrap";

class OrgInfo extends Component {
  render() {
    return (
      <div className="org-details">
        <div className="org-image">
          <div className="org-pic">
            <img src="" alt="" />
          </div>
          <div className="edit-option">
            <Button variant="primary">User Edit</Button>
          </div>
        </div>
        <div className="org-data">
          <h1>
            CodeUnio Community <Button variant="primary">Follow</Button>
          </h1>
          <p className="profession">Started 10 years ago</p>
          <p className="place">584 members</p>
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

export default OrgInfo;
