import React from "react";

import "./donutTitle.scss";

import logoText from "../images/donut-logo-text.png"
import donut from "../images/donut.png";

const rotateDonut = () => {
    const donut = document.querySelector('.rotateDonut');
    if (donut.style.animation) {
        donut.style.animation = '';
    } else {
        donut.style.animation = 'infiniteRotate 2s infinite forwards'
    }
};

const DonutTitle = () => {
    return (
        <div className="main-donut-logo">
            <img src={donut} alt="donut logo" className="rotateDonut" onClick={rotateDonut} />
            <img src={logoText} alt="donut logo text" />
        </div>
    )
}

const DonutTitleSmall = () => {
    return (
        <div className="main-donut-logo-small">
            <img src={donut} alt="donut logo" className="rotateDonut" onClick={rotateDonut} />
            <img src={logoText} alt="donut logo text" />
        </div>
    )
}


export { DonutTitle, DonutTitleSmall };