import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
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
              <Tab eventKey="home" title="Login">
                <LoginForm />
              </Tab>
              <Tab eventKey="profile" title="Sign Up">
                <SignUpForm />
              </Tab>
            </Tabs>
            <hr />
            <p style={{ textAlign: "center" }}>Or Sign In/Sign Up with</p>
            <a href="http://localhost:4000/auth/google" style={{padding: '1vh'}}>
              <button className="loginbtn">
                <span className="loginbtn-content">
                  <svg
                    preserveAspectRatio="xMidYMid meet"
                    height="18"
                    width="18"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    className="login-icon"
                  >
                    <g>
                      <g fill="none" fillRule="evenodd">
                        <path
                          d="M482.56 261.36c0-16.73-1.5-32.83-4.29-48.27H256v91.29h127.01c-5.47 29.5-22.1 54.49-47.09 71.23v59.21h76.27c44.63-41.09 70.37-101.59 70.37-173.46z"
                          fill="#4285f4"
                        />
                        <path
                          d="M256 492c63.72 0 117.14-21.13 156.19-57.18l-76.27-59.21c-21.13 14.16-48.17 22.53-79.92 22.53-61.47 0-113.49-41.51-132.05-97.3H45.1v61.15C83.93 439.12 163.74 492 256 492z"
                          fill="#34a853"
                        />
                        <path
                          d="M123.95 300.84c-4.72-14.16-7.4-29.29-7.4-44.84s2.68-30.68 7.4-44.84v-61.15H45.1C29.12 181.87 20 217.92 20 256s9.12 74.13 25.1 105.99l78.85-61.15z"
                          fill="#fbbc05"
                        />
                        <path
                          d="M256 113.86c34.65 0 65.76 11.91 90.22 35.29l67.69-67.69C373.03 43.39 319.61 20 256 20 163.75 20 83.93 72.89 45.1 150.01l78.85 61.15c18.56-55.78 70.59-97.3 132.05-97.3z"
                          fill="#ea4335"
                        />
                        <path d="M20 20h472v472H20V20z" />
                      </g>
                    </g>
                  </svg>
                  Google
                </span>
              </button>
            </a>
            <a href="http://localhost:4000/auth/github" style={{padding: '1vh'}}>
              <button className="loginbtn">
                <span className="loginbtn-content">
                  <svg
                    preserveAspectRatio="xMidYMid meet"
                    height="1em"
                    width="1em"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 438.549 438.549"
                    stroke="none"
                    className="login-icon"
                  >
                    <g>
                      <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 0 1-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" />
                    </g>
                  </svg>
                  GitHub
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
