import React, { Component } from "react";
import "./Comments.scss";
import { ListGroup, Image } from "react-bootstrap";
import userIcon2 from "../../../../../assets/images/userIcon2.jpg";
import socket from "../../../../dashboard/utils/socket";
import { connect } from "react-redux";
import { getUserProposalNotifications } from "../../../../../actions/proposalActions";
import { getProposalNotifications } from "../../../../../actions/notificationAction";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: socket,
      notifications: [],
      commentNotifications: [],
    };
  }

  componentDidMount() {
    const data = {
      userId: localStorage.getItem("userId"),
    };

    this.props.getProposalNotifications();
    this.props.getUserProposalNotifications(data);

    this.state.socket.on("new proposal created", (data) => {
      this.handleNotification(data)
    });

    this.state.socket.on("proposal deleted", (data) => {
      this.handleNotification(data)
    });

    this.state.socket.on("proposal submitted", (data) => {
      this.handleNotification(data)
    });
  }

  handleNotification = (data) => {
    data.newNotification = true;
    data.createdAt = new Date().toString().substring(0, 24);
    this.setState({
      notifications: [...this.state.notifications, data],
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('RECEIVINGGGGGGGGGGGGG')
    console.log(nextProps);
    nextProps.proposalNotifications.forEach((notification, index) => {
      let createdTime = new Date(notification.createdAt)
        .toString()
        .substring(0, 24);
      notification.createdAt = createdTime.toString();
    });

    this.setState({
      notifications: [
        ...this.state.notifications,
        ...nextProps.proposalNotifications,
      ],
    });

    if (nextProps.userNotification !== null) {
      this.setState({
        commentNotifications: nextProps.userNotification,
      });
    }
  }

  organizaNotifications = () => {
    let notifications = this.state.notifications;

    notifications.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    this.setState({
      Notifications: notifications,
    });
  };

  render() {
    const notifications = this.state.commentNotifications;
    return (
      <div className="ideas">
        <div className="ideas-title">Comments</div>
        <div className="ideas-container">
          <ListGroup variant="flush">
            {notifications?.map((notification, index) => {
              return (
                <ListGroup.Item
                  key={index}
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

                      <div className="idea-description">
                        {notification.createdAt}
                      </div>
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

const mapStateToProps = (state) => ({
  proposalNotifications: state.notification.proposalNotifications,
  userNotification: state.proposal.userNotification,
});

export default connect(mapStateToProps, {
  getUserProposalNotifications,
  getProposalNotifications,
})(Comments);
