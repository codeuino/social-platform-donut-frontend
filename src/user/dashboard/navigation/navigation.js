import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import "./navigation.scss";
import logo from "../../../images/donut.png";

class Navigation extends Component {
  // onClick(params) {
  //   this.state.Link("/" + params);
  //   console.log(params);
  // }

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
          <ListGroup.Item
            className={this.props.dashboard ? "active" : "inactive"}
            // onClick={() => this.onClick("dashboard")}
          >
            Dashboard
          </ListGroup.Item>
          <ListGroup.Item
            className={this.props.posts ? "active" : "inactive"}
            // onClick={() => this.onClick("posts")}
          >
            Pinned Posts
          </ListGroup.Item>
          <ListGroup.Item
            className={this.props.org ? "active" : "inactive"}
            // onClick={() => this.onClick("orginization")}
          >
            Organization
          </ListGroup.Item>
          <ListGroup.Item
            className={this.props.profile ? "active" : "inactive"}
            // onClick={() => this.onClick("profile")}
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
