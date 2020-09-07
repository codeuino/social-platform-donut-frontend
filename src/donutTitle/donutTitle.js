import React from "react";

import "./donutTitle.scss";

import logoText from "../assets/images/donut-logo-text.png";
import donut from "../assets/images/donut.png";

const rotateDonut = () => {
  const donut = document.querySelector(".rotateDonut");
  if (donut.style.animation) {
    donut.style.animation = "";
  } else {
    donut.style.animation = "infiniteRotate 2s infinite forwards";
  }
};

const DonutTitle = () => {
  return (
    <div className="main-donut-logo">
      <img
        src={donut}
        alt="donut logo"
        className="rotateDonut"
        onClick={rotateDonut}
      />
      <img src={logoText} alt="donut logo text" />
    </div>
  );
};

const DonutTitleSmall = () => {
  return (
    <div className="main-donut-logo-small">
      <img src={donut} alt="donut logo" className="rotateDonut" />
      <img src={logoText} alt="donut logo text" />
    </div>
  );
};

const DonutIconSmall = () => {
  return (
    <div className="main-donut-logo-mobile">
      <img src={donut} alt="donut logo" className="rotateDonutIcon" />
    </div>
  );
};

export { DonutTitle, DonutTitleSmall, DonutIconSmall };
