import React, { Component } from "react";
import "./OtherIdeas.scss";
import { ListGroup, Image } from "react-bootstrap";
import userIcon2 from "../../../../../images/userIcon2.jpg";
import socket from "../Utils/socket";
import notifications from "../../../../dashboard/notifications/notifications";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: socket,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRjYjE4ZjIxNWRhNzRjMThkM2YyNzQiLCJpYXQiOjE1OTE1MjE2Nzl9.q3g5Ah_rtjPIrH7z183fVmUBTv_A4OjEoL673zeG250",
      userId: "5edcb18f215da74c18d3f274",
      notifications: [],
    };
  }

  componentDidMount() {
    this.fetchNotifications();

    this.state.socket.on("new proposal created", (data) => {
      data.newNotification = true;
      data.createdAt = new Date();
      this.setState({
        notifications: [...this.state.notifications, data],
      });
    });

    this.state.socket.on("proposal deleted", (data) => {
      data.newNotification = true;
      data.createdAt = new Date();
      this.setState({
        notifications: [...this.state.notifications, data],
      });
    });
  }

  fetchNotifications = () => {
    fetch("http://localhost:5000/notification/proposal/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        this.setState(
          {
            notifications: [
              ...this.state.notifications,
              ...resData.notifications,
            ],
          },
          () => {
            this.fetchUserNotifications();
          }
        );
      });
  };

  fetchUserNotifications = () => {
    fetch("http://localhost:5000/proposal/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.token,
      },
      body: JSON.stringify({
        userId: this.state.userId,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        this.setState(
          {
            notifications: [
              ...this.state.notifications,
              ...resData.notifications,
            ],
          },
          () => {
            this.organizaNotifications();
          }
        );
      });
  };

  organizaNotifications = () => {
    let notifications = this.state.notifications;
    console.log(notifications);

    notifications.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    this.setState({
      Notifications: notifications,
    });
  };

  render() {
    const notifications = this.state.notifications;
    return (
      <div className="ideas">
        <div className="ideas-title">Notifications</div>
        <div className="ideas-container">
          <ListGroup variant="flush">
            {notifications.map((notification, index) => {
              return (
                <ListGroup.Item
                  style={
                    notification.newNotification
                      ? { backgroundColor: "#E8F1FD" }
                      : { backgroundColor: "white" }
                  }
                >
                  <div className="idea-item">
                    <div className="image-container">
                      <Image
                        src={userIcon2}
                        alt="icon"
                        rounded
                        className="user-image"
                      />
                    </div>
                    <div className="idea-container">
                      <div className="idea-title" style={{ marginTop: "0px" }}>
                        {notification.heading}
                      </div>
                      <div className="idea-description"></div>
                      <div className="idea-description">
                        {notification.content}
                      </div>
                    </div>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default Notifications;
