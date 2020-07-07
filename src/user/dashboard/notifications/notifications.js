import React, { Component } from "react";
import "./notifications.scss";
import Btn from "../../../common/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import donutIcon from '../../../svgs/donut-icon.svg'
import { initializeSockets } from '../utils/notification'
import socket from '../utils/socket'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getAllNotifications, getUserNotification } from '../../../actions/notificationAction'

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: socket,
      showNotification: false,
      customNotifications: [],
      isDisconnected: false
    };
  }

  addToNotification = notification => {
    this.setState({
      customNotifications: [
        notification,
        ...this.state.customNotifications
      ]
    });
  };

  componentDidMount() {
    // HERE FETCH NOTIFICATION FROM DB
    this.props.getAllNotifications()
    this.props.getUserNotification()

    this.handleConnectionChange();
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
    this.setState({socket: socket })
    initializeSockets(this.state, donutIcon, this.addToNotification)
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps)
    // set notifications 
    const { platformNotifications, userNotifications } = nextProps.notification
    let allNotifications = [];
    if(userNotifications) {
      allNotifications = [...allNotifications, ...userNotifications]
    }
    if (platformNotifications) {
      allNotifications = [...allNotifications, ...platformNotifications]
    }
    this.setState({ customNotifications: allNotifications }, () => {
      console.log('all notification ', this.state)
    })
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleConnectionChange);
    window.removeEventListener('offline', this.handleConnectionChange);
  }

  handleConnectionChange = () => {
      const condition = navigator.onLine ? 'online' : 'offline';
      if (condition === "offline") {
        toast.error("You are offline!");
        return this.setState({ isDisconnected: true }); 
      }
    }

  render() {
    const { isDisconnected } = this.state;
    let notifications = this.state.customNotifications.map((notification,i) => {
      return (
        <div key={i}>
          <div className="notification-container"> 
            <div className="notification-img-container">
              <img alt="notification-icon" src={notification.imgSrc || donutIcon}></img>
            </div>
            <div className="notification-description">
              <h6>{notification.heading}</h6>
              {notification.tag ? <Btn type="button" className="tag">{notification.tag}</Btn> : <div></div>}
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
        {isDisconnected ? (
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        ): null }
      </div>
    );
  }
}

// map state to props
const mapStateToProps = (state) => ({
  notification: state.notification,
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { getAllNotifications, getUserNotification })
(withRouter(Notifications));

