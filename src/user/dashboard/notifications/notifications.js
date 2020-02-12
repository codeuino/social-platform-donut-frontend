import React, { Component } from "react";
// import { Table } from "react-bootstrap";
import "./notifications.scss";
import donutIcon from '../../../images/donut-icon.svg'
import icon2 from '../../../images/not-icon-2.svg'
import icon3 from '../../../images/not-icon-3.svg'

const customNotifications = [
  {
    _id: 1,
    imgSrc: donutIcon,
    heading: 'Cody Nguyen',
    content: 'Lorem ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.',
    tag: '+1 RSVP'
  },
  {
    _id: 2,
    imgSrc: icon2,
    heading: 'Arlene Mccoy',
    content: 'Lorem ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.',
    tag: ''
  },
  {
    _id: 3,
    imgSrc: icon3,
    heading: 'Julian Richards',
    content: 'Lorem ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.',
    tag: 'View'
  },
  {
    _id: 4,
    imgSrc: donutIcon,
    heading: 'Julian Richards',
    content: 'Lorem ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.',
    tag: ''
  },
]

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
