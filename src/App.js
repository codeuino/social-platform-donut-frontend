import React, { Component, useEffect } from "react";
import Router from "./router";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import "./css/main.scss";
import ReactGA from "react-ga";

// check if user already loggedIn
const token = localStorage.getItem("jwtToken");
console.log("CHECKING TOKEN ", token);
if (token) {
  const decodedData = jwt_decode(token);
  // set auth token in axios header
  setAuthToken(token);
  // set user in the state
  setCurrentUser(decodedData);
  // check if token is valid or expired
  const currentTime = Date.now() / 1000; // in ms
  const expiryTime = decodedData.iat + 10800000; // 24 hrs
  if (expiryTime <= currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}

function App() {
  useEffect(() => {
    ReactGA.initialize("UA-173245995-1");
  });
  return (
    <Provider store={store}>
      <React.Fragment>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <Router />
      </React.Fragment>
    </Provider>
  );
}

document.title = "Donut";
export default App;
