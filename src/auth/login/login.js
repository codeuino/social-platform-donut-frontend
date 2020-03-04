import React, { Component } from "react";
import { Tab, Tabs, Button } from "react-bootstrap";
import LoginForm from "../login-form/login-form";
import SignUpForm from "../signup-form/signup-form";
import { DonutTitle } from "../../donutTitle/donutTitle";
import multipleDonuts from "../../images/extra-donuts.png";
// import backGroundDonut from "../../images/background-donut.png";
import "./login.scss";

class Login extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="welcome-text">
          <div className="logo">
            <DonutTitle />
          </div>
          <h1>One place for meeting everyone.</h1>
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
              <Tab eventKey="home" title="Login" style={{"fontFamily":"Inter"}}>
                <LoginForm />
              </Tab>
              <Tab eventKey="profile" title="Sign Up" style={{"fontFamily":"Inter"}}>
                <SignUpForm />
              </Tab>
            </Tabs>
            <p style={{ textAlign: "center" }}>Or Login With</p>
            <a href="http://localhost:4000/auth/google" style={{padding: '1vh'}}>
              <Button className="loginbtn">
                <span className="loginbtn-content">
                  Google
                </span>
              </Button>
            </a>
            <a href="http://localhost:4000/auth/github" style={{padding: '1vh'}}>
              <Button className="loginbtn">
                <span className="loginbtn-content">
                  GitHub
                </span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
