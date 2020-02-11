import React, { Component } from "react";
import { ListGroup , Nav} from "react-bootstrap";
import {Link, NavLink, Route} from 'react-router-dom';
import "./navigation.scss";


import logo from "../../../svgs/donut.svg";
import dashboard from "../../../svgs/dashboard.svg";


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
            <NavLink to="/dashboard"><img src={logo} alt="logo" /></NavLink>
          </ListGroup.Item>
          <ListGroup.Item
            className={this.props.dashboard ? "active" : "inactive"}
            // onClick={() => this.onClick("dashboard")}
          >
            <svg width="38" height="38" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" fill="#1A73E8"/>
            </svg>

<NavLink to="/dashboard" style={{"color" : "#1A73E8"}}><b>Dashboard</b></NavLink>
          </ListGroup.Item>
          <ListGroup.Item
            className={this.props.posts ? "active" : "inactive"}
            // onClick={() => this.onClick("posts")}
          >
            <svg width="38" height="38" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.8043 2.15521C16.2894 -0.592583 11.974 -0.725094 9.18483 1.82775C7.01728 3.81162 6.38726 6.85162 7.38933 9.39879L0.51388 16.6358L0.512961 16.6368C-0.117421 17.2947 -0.192773 18.2877 0.432155 18.9705C1.05658 19.6528 2.05245 19.6667 2.76255 19.0979L2.76367 19.097L10.5848 12.8875C13.0327 14.1087 16.1146 13.7488 18.2809 11.766C21.0701 9.2132 21.3195 4.90328 18.8043 2.15521ZM7.42991 7.18208C7.35949 5.37255 8.06656 3.5292 9.52241 2.19672C12.1156 -0.176716 16.1139 -0.0435814 18.4355 2.49291C19.2794 3.415 19.7875 4.52965 19.9677 5.68903C19.7875 4.52961 19.2795 3.41491 18.4355 2.49279C16.1139 -0.0437087 12.1156 -0.176843 9.52241 2.19659C8.06652 3.52911 7.35946 5.37251 7.42991 7.18208ZM0.501346 17.816C0.514476 17.5229 0.639746 17.227 0.874681 16.9821L7.97743 9.50584C7.97741 9.50581 7.9774 9.50578 7.97739 9.50575L0.874675 16.982C0.639707 17.2269 0.514446 17.5229 0.501346 17.816ZM1.3888 18.0951C1.55829 18.2802 1.80082 18.2289 1.96635 18.0964L9.84292 11.8427C9.791 11.8031 9.74144 11.7605 9.69188 11.7179C9.66833 11.6976 9.64478 11.6774 9.62098 11.6574C9.60059 11.6403 9.57995 11.6236 9.55931 11.6068C9.52355 11.5778 9.48777 11.5488 9.4532 11.5178C9.3222 11.3994 9.1965 11.2751 9.07586 11.1456C9.06899 11.1384 9.06178 11.1317 9.05458 11.125C9.04631 11.1173 9.03805 11.1096 9.03031 11.1012C9.02259 11.0927 9.01559 11.0837 9.00855 11.0747C9.00146 11.0656 8.99433 11.0565 8.9864 11.0479C8.86967 10.9174 8.75826 10.7832 8.65321 10.6437C8.62465 10.6055 8.59826 10.5664 8.57184 10.5273C8.55857 10.5077 8.5453 10.4881 8.53173 10.4685C8.51389 10.443 8.49568 10.4176 8.47749 10.3923C8.43899 10.3387 8.40052 10.2851 8.36551 10.2296L1.44021 17.5186C1.29214 17.6731 1.21959 17.9102 1.3888 18.0951Z" fill="#1A73E8"/>
</svg>

            <NavLink to="/pinned-posts" style={{"color" : "#1A73E8"}}><b>Pinned Posts</b></NavLink>
          </ListGroup.Item>
          <ListGroup.Item
            className={this.props.org ? "active" : "inactive"}
            // onClick={() => this.onClick("orginization")}
          >
            <svg width="38" height="38" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM2 10C2 9.101 2.156 8.238 2.431 7.431L4 9L6 11V13L8 15L9 16V17.931C5.061 17.436 2 14.072 2 10ZM16.33 14.873C15.677 14.347 14.687 14 14 14V13C14 12.4696 13.7893 11.9609 13.4142 11.5858C13.0391 11.2107 12.5304 11 12 11H8V8C8.53043 8 9.03914 7.78929 9.41421 7.41421C9.78929 7.03914 10 6.53043 10 6V5H11C11.5304 5 12.0391 4.78929 12.4142 4.41421C12.7893 4.03914 13 3.53043 13 3V2.589C15.928 3.778 18 6.65 18 10C17.9998 11.7647 17.4123 13.4791 16.33 14.873Z" fill="#1A73E8"/>
</svg>

            <NavLink to="/organization" style={{"color" : "#1A73E8"}}><b>Organization</b></NavLink>
          </ListGroup.Item>
          <ListGroup.Item
            className={this.props.profile ? "active" : "inactive"}
            // onClick={() => this.onClick("profile")}
          >
            <svg width="38" height="38" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 4.5C4.5 6.981 6.519 9 9 9C11.481 9 13.5 6.981 13.5 4.5C13.5 2.019 11.481 0 9 0C6.519 0 4.5 2.019 4.5 4.5ZM17 19H18V18C18 14.141 14.859 11 11 11H7C3.14 11 0 14.141 0 18V19H17Z" fill="#1A73E8"/>
</svg>
            <NavLink to="profile" style={{"color" : "#1A73E8"}}><b>Account</b></NavLink>
          </ListGroup.Item>
          <ListGroup.Item style={divStyle}>Settings</ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default Navigation;
