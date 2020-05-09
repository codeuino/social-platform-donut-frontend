import React, { Component } from "react";
import "./maintenance.scss";
import { DonutTitle } from "../donutTitle/donutTitle";
import Lottie from "react-lottie";
import animationData from "../lottiefiles/maintenance.json";

class Maintenance extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="maintenance">
        <div className="header">
          <DonutTitle />
        </div>
        <div className="content">
          <div className="anim">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
              },
            }}
          />
          </div>
          <div className="content__message">
            <p>
              Donut has been put under maintenance by the Admins, <br /> Please comeby Later!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Maintenance;
