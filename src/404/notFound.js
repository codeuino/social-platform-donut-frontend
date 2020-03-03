import React from "react";
import { Link } from "react-router-dom";

import "./notFound.scss";
import { DonutTitle } from "../donutTitle/donutTitle";

import donut from "../images/donut.png";

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="header">
                <DonutTitle />
            </div>
            <div className="content">
                <div className="content__title">
                    <span className="title__text">4</span>
                    <span className="title__donut">
                        <img src={donut} alt="donut" />
                    </span>
                    <span className="title__text">4</span>
                </div>
                <div className="content__message">
                    <p>We weren't able to find the address you requested, <br /> the link must be old or broken</p>
                </div>
                <div className="content__redirect">
                    <p>Go to <Link className="redirect-link"to="/dashboard">Dashboard</Link></p>
                </div>
            </div>
        </div>
    )
}

export default NotFound;