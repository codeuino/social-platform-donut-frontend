import React from "react";
import { Link } from "react-router-dom";
import "./notFound.scss";
import Lottie from "react-lottie";
import { DonutTitle } from "../donutTitle/donutTitle";
import animationData from "../lottiefiles/404.json";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="header">
        <DonutTitle />
      </div>
      <div className="content">
        <div className="content__title">
          <span className="title__text">4</span>
          <div className="title_donut">
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
          <span className="title__text">4</span>
        </div>
        <div className="content__message">
          <p>
            We weren't able to find the address you requested, <br /> the link
            must be old or broken
          </p>
        </div>
        <div className="content__redirect">
          <p>
            Go to{" "}
            <Link className="redirect-link" to="/dashboard">
              Dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
