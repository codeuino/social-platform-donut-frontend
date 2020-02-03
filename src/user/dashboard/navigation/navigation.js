import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import "./navigation.scss";
import logo from "../../../images/donut.png";

class Navigation extends Component {
  render() {
    console.log(this.props);
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
          <ListGroup.Item
            className={this.props.dashboard ? "active" : "inactive"}
          >
            Dashboard
          </ListGroup.Item>
          <ListGroup.Item className={this.props.posts ? "active" : "inactive"}>
            Pinned Posts
          </ListGroup.Item>
          <ListGroup.Item className={this.props.org ? "active" : "inactive"}>
            Organization
          </ListGroup.Item>
          <ListGroup.Item
            className={this.props.profile ? "active" : "inactive"}
          >
            Account
          </ListGroup.Item>
          <ListGroup.Item style={divStyle}>Settings</ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default Navigation;
