import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import LoginForm from "../login-form/login-form";
import SignUpForm from "../signup-form/signup-form";
import logo from "../../images/donut.png";
import multipleDonuts from "../../images/extra-donuts.png";
// import backGroundDonut from "../../images/background-donut.png";
import "./login.scss";

class Login extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="welcome-text">
          <div className="logo">
            <img src={logo} alt="donut logo" />
            <h2>DONUT</h2>
          </div>
          <h1>One place for meeting everyone</h1>
          <p>
            An Open Source Social networking bridge between Developers,
            Organisations and Open Source aspirants
          </p>
          <div className="extra-donuts">
            <img src={multipleDonuts} alt="donut logo" />
          </div>
        </div>
        <div className="user-details">
          {/* <div className="background-donut">
            <img src={backGroundDonut} alt="donut logo" />
          </div> */}
          <div className="user-data">
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
              <Tab eventKey="home" title="Login">
                <LoginForm />
              </Tab>
              <Tab eventKey="profile" title="Sign Up">
                <SignUpForm />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
