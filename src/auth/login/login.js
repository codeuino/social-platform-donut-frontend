import React, { Component } from "react";
import { Tab, Tabs, Button } from "react-bootstrap";
import LoginForm from "../login-form/login-form";
import SignUpForm from "../signup-form/signup-form";
import { DonutTitle } from "../../donutTitle/donutTitle";
import multipleDonuts from "../../images/extra-donuts.png";
import "./login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeForm: "login",
    };
  }
  handleSelectorClick = (formItem) => {
    this.setState({
      activeForm: formItem,
    });
  };

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
            <p className="text-center">
              {this.state.activeForm === "login" ? (
                <span className="form-header ">Login</span>
              ) : (
                <span className="form-header ">SignUp</span>
              )}
            </p>

            {this.state.activeForm === "login" ? <LoginForm /> : <SignUpForm />}
            <hr />
            <p style={{ textAlign: "center" }} className="login-text">
              {this.state.activeForm === "login"
                ? "Or Sign In with"
                : "Or SignUp with"}
            </p>
            <a
              href="http://localhost:4000/auth/google"
              style={{ padding: "1vh" }}
            >
              <Button
                className="selectorbtn"
                type="submit"
                variant="primary"
                color="primary"
                size="sm"
              >
                <span className="selectorbtn-content">Google</span>
              </Button>
            </a>
            <a
              href="http://localhost:4000/auth/github"
              style={{ padding: "1vh" }}
            >
              <Button
                className="selectorbtn"
                type="submit"
                variant="primary"
                color="primary"
                size="sm"
              >
                <span className="selectorbtn-content">Github</span>
              </Button>
            </a>
            <p className="login-text-selector">
              {this.state.activeForm === "login"
                ? "Don't have an account? "
                : "Already have an account? "}

              {this.state.activeForm === "login" ? (
                <span
                  className="selector-text"
                  onClick={() => this.handleSelectorClick("signup")}
                >
                  SignUp
                </span>
              ) : (
                <span
                  className="selector-text"
                  onClick={() => this.handleSelectorClick("login")}
                >
                  Login
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
