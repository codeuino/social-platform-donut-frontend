import React, { Component } from "react";
import "./notifications.scss";
import customNotifications from '../../../jsonData/notifications'

class Notifications extends Component {
  render() {
    let notifications = customNotifications.map((notification,i) => {
      return (
        <div key={i}>
          <div className="notification-container"> 
            <div className="notification-img-container">
              <img alt="notification-icon" src={notification.imgSrc}></img>
            </div>
            <div className="notification-description">
              <h6>{notification.heading}</h6>
              {notification.tag ? <button type="button" className="tag">{notification.tag}</button> : <div></div>}
              <p>{notification.content}</p>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="notifications">
        <div className="text-center heading-container">
          <h5>Notifications</h5>
        </div>
        <div className="all-notifications">
          {notifications}
        </div>
      </div>
    );
  }
}

export default Notifications;

