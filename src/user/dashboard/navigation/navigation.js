import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import "./navigation.scss";
import logo from "../../../images/donut.png";

class Navigation extends Component {
  render() {
    const divStyle = {
      position: "absolute",
      bottom: 0
    };

    return (
      <div className="navigation">
        <ListGroup>
          <ListGroup.Item>
            <img src={logo} alt="logo" /> <span>DONUT</span>
          </ListGroup.Item>
          <ListGroup.Item active>Dashboard</ListGroup.Item>
          <ListGroup.Item>Pinned Posts</ListGroup.Item>
          <ListGroup.Item>Organization</ListGroup.Item>
          <ListGroup.Item>Account</ListGroup.Item>
          <ListGroup.Item style={divStyle}>Settings</ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default Navigation;
