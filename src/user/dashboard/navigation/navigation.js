import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { DonutTitleSmall } from "../../../donutTitle/donutTitle";
import "./navigation.scss";

class Navigation extends Component {
  // onClick(params) {
  //   this.state.Link("/" + params);
  //   console.log(params);
  // }
  constructor(props) {
    super(props)
  }
  

  render() {
    const divStyle = {
      position: "absolute",
      bottom: 0
    };

    return (
      <div className="navigation">
        <ListGroup>
          <ListGroup.Item>
            <NavLink to="/dashboard"><div className="donut-title"><DonutTitleSmall /></div></NavLink>
          </ListGroup.Item>
          <ListGroup.Item
            className={this.props.dashboard ? "active" : "inactive"}
            // onClick={() => this.onClick("dashboard")}
          >
            <NavLink to="/dashboard" style={{"color" : "#1A73E8"}}><b>Dashboard</b></NavLink>
          </ListGroup.Item>
          <ListGroup.Item
            className={this.props.posts ? "active" : "inactive"}
            // onClick={() => this.onClick("posts")}
          >
            <NavLink to="/pinned-posts" style={{"color" : "#1A73E8"}}><b>Pinned Posts</b></NavLink>
          </ListGroup.Item>
          <ListGroup.Item
            className={this.props.org ? "active" : "inactive"}
            // onClick={() => this.onClick("orginization")}
          >
            <NavLink to="/organization" style={{"color" : "#1A73E8"}}><b>Organization</b></NavLink>
          </ListGroup.Item>
          <ListGroup.Item
            className={this.props.profile ? "active" : "inactive"}
            // onClick={() => this.onClick("profile")}
          >
            <NavLink to="profile" style={{"color" : "#1A73E8"}}><b>Account</b></NavLink>
          </ListGroup.Item>
          <ListGroup.Item style={divStyle}>Settings</ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default Navigation;
