import React, { Component } from "react";
import { Timeline } from "antd";
import Moment from "react-moment";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import ReactMarkdown from "react-markdown";
import BadgeElement from "../../TicketContent/BadgeElement";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: null,
    };
  }

  handleClose = () => {
    this.setState({
      modal: null,
    });
  };

  view = () => {};

  render() {
    return (
      <div
        style={{ padding: "10px 2rem", overflowY: "scroll", height: "75vh" }}
      >
        <Timeline>
          {this.props.ticket.history.map((ele, index) => {
            return (
              <Timeline.Item key={index}>
                <div className="history-item" onClick={() => this.view()}>
                  <div className="line">
                    <h5>{ele.updatedBy.name}</h5>
                    <h5>
                      <Moment format="MMMM Do YYYY, h:mm:ss a">{ele.updatedAt}</Moment>
                    </h5>
                  </div>
                  <div>
                    {ele.type === "title" ? (
                      <span>
                        {"Updated Title from "}
                        <strong>
                          <del>{ele.title.old}</del>
                        </strong>
                        {" to "}
                        <strong>{ele.title.new}</strong>
                      </span>
                    ) : (
                      ""
                    )}
                    {ele.type === "add tag" ? (
                      <span>
                        Assigned tag{" "}
                        <Badge
                          pill
                          variant="info"
                          style={{ fontSize: "13px", margin: "2px" }}
                        >
                          <span style={{ verticalAlign: "middle" }}>
                            {ele.tag}
                          </span>
                        </Badge>
                      </span>
                    ) : (
                      ""
                    )}
                    {ele.type === "remove tag" ? (
                      <span>
                        Removed tag{" "}
                        <Badge
                          pill
                          variant="info"
                          style={{ fontSize: "13px", margin: "2px" }}
                        >
                          <span style={{ verticalAlign: "middle" }}>
                            <del>{ele.tag}</del>
                          </span>
                        </Badge>
                      </span>
                    ) : (
                      ""
                    )}
                    {ele.type === "status" ? (
                      <span style={{display: "flex"}}>
                        Changed status to{" "}
                        <BadgeElement style={{ fontSize: "13px", margin: "2px" }} ticketState={ele.status} />
                      </span>
                    ) : (
                      ""
                    )}
                    {ele.type === "shortDescription" ? (
                      <span>
                        <span>
                          {"Ticket Summary Updated "}
                          <span
                            style={{
                              color: "rgba(0,0,0,0.5)",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              this.setState({
                                modal: {
                                  title: "History - Ticket Summary",
                                  bodyTitle: "Updated Ticket Summary",
                                  bodyContent: ele.shortDescription,
                                  type: ele.type,
                                },
                              })
                            }
                          >
                            View Update
                          </span>
                        </span>
                      </span>
                    ) : (
                      ""
                    )}
                    {ele.type === "content" ? (
                      <span>
                        <span>
                          {"Ticket Content Updated "}
                          <span
                            style={{
                              color: "rgba(0,0,0,0.5)",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              this.setState({
                                modal: {
                                  title: "History - Ticket Content",
                                  bodyTitle: "Updated Ticket Content",
                                  bodyContent: ele.content,
                                  type: ele.type,
                                },
                              })
                            }
                          >
                            View Update
                          </span>
                        </span>
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Timeline.Item>
            );
          })}
        </Timeline>
        {this.state.modal && (
          <Modal
            centered
            className="modal"
            show={this.state.modal}
            onHide={this.handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>{this.state.modal.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={
                this.state.modal.type === "content"
                  ? { height: "500px", overflowY: "scroll", padding: "0 30px" }
                  : {}
              }
            >
              <h5>{this.state.modal.bodyTitle}</h5>
              <ReactMarkdown source={this.state.modal.bodyContent}/>
            </Modal.Body>
          </Modal>
        )}
      </div>
    );
  }
}

export default History;
