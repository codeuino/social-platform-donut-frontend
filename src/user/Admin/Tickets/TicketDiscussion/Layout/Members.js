import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import userIcon2 from "../../../../../assets/images/userIcon2.jpg";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    const HtmlTooltip = withStyles((theme) => ({
      tooltip: {
        backgroundColor: "#ffffff",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
      },
    }))(Tooltip);
    const members = [
      {
        userId: this.props.ticket.createdBy.id,
        ...this.props.ticket.createdBy,
      },
    ];
    this.props.ticket.comments.forEach((comment) => {
      if (
        members.map((ele) => ele.userId).indexOf(comment.createdBy.userId) ===
        -1
      ) {
        members.push(comment.createdBy);
      }
    });
    return (
      <React.Fragment>
        <Modal
          centered
          className="modal"
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Members</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ height: "500px", overflowY: "scroll" }}>
            {members.map((ele) => (
              <div style={{ display: "flex" }}>
                <Image
                  style={{ margin: "10px" }}
                  src={userIcon2}
                  alt="icon"
                  rounded
                  className="profile-img"
                  roundedCircle
                />
                <div style={{ fontSize: "13px", fontFamily: "Inter" }}>
                  <strong>{ele.name}</strong>
                  <div>{ele.designation}</div>
                  <div>
                    {ele.location && <LocationOnOutlinedIcon />}
                    {ele.location}
                  </div>
                  <div>{ele.email}</div>
                  <div>{ele.shortDescription}</div>
                </div>
              </div>
            ))}
          </Modal.Body>
        </Modal>
        <Card className="info-card">
          <div className="info-title">Members</div>
          <div className="info-details">
            <div className="data-element">
              <span className="data-desc">
                {members.slice(0, 5).map((ele, index) => (
                  <HtmlTooltip
                    placement="top-end"
                    title={
                      <React.Fragment>
                        <div style={{ display: "flex" }}>
                          <Image
                            style={{ margin: "10px" }}
                            src={userIcon2}
                            alt="icon"
                            rounded
                            className="profile-img"
                            roundedCircle
                          />
                          <div
                            style={{ fontSize: "13px", fontFamily: "Inter" }}
                          >
                            <strong>{ele.name}</strong>
                            <div>{ele.designation}</div>
                            <div>
                              {ele.location && <LocationOnOutlinedIcon />}
                              {ele.location}
                            </div>
                            <div>{ele.email}</div>
                            <div>{ele.shortDescription}</div>
                          </div>
                        </div>
                      </React.Fragment>
                    }
                  >
                    <Image
                      src={userIcon2}
                      alt="icon"
                      rounded
                      className="profile-img"
                      roundedCircle
                    />
                  </HtmlTooltip>
                ))}
                <div className="more" onClick={this.handleShow}>
                  More
                </div>
              </span>
            </div>
          </div>
        </Card>
      </React.Fragment>
    );
  }
}

export default Members;
