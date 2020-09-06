import React, { Component } from "react";
import "./TicketDiscussion.scss";
import Axios from "axios";
import ReactMde from "react-mde";
import Moment from "react-moment";
import * as Showdown from "showdown";
import ReactMarkdown from "react-markdown";
import Button from "react-bootstrap/Button";
import { FaArrowLeft } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { BASE_URL } from "../../../actions/baseApi";
import "react-mde/lib/styles/css/react-mde-all.css";
import { Image, Card, Badge } from "react-bootstrap";
import SaveButton from "@material-ui/icons/SaveOutlined";
import EditButton from "@material-ui/icons/EditOutlined";
import CancelButton from "@material-ui/icons/ClearOutlined";
import userIcon2 from "../../../assets/images/userIcon2.jpg";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

class TicketDiscussions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "discussions",
      ticket: null,
      selectedTab: "write",
      content: "",
      editer: "new",
    };
  }

  getTicket = async () => {
    const ticket = (
      await Axios.get(`${BASE_URL}/ticket/${this.props.ticketId}`)
    ).data;
    this.setState({ ticket: ticket.ticket });
  };

  componentDidMount() {
    this.getTicket();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  handleBack = () => {
    this.props.back(null);
  };

  sendComment = async () => {
    const newTicket = (
      await Axios.post(`${BASE_URL}/ticket/${this.state.ticket._id}/comment`, {
        content: this.state.content,
      })
    ).data.ticket;
    this.setState({
      ticket: newTicket,
      content: "",
    });
  };

  setContent = (content) => this.setState({ content });

  setSelectedTab = (selectedTab) => this.setState({ selectedTab });

  handleEditTicket = () => {
    this.setState({
      content: this.state.ticket.content,
      editer: "ticket",
    });
  };

  cancelEditTicket = () => {
    this.setState({
      content: "",
      editer: "new",
    });
  };

  handleUpdateTicket = async () => {
    try {
      const newTicket = (
        await Axios.put(`${BASE_URL}/ticket/${this.state.ticket._id}`, {
          content: this.state.content,
        })
      ).data.ticket;
      this.setState({
        ticket: newTicket,
        editer: "new",
        content: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  setTicketContent = (content) => {
    this.setState((state) => {
      this.setState({
        ticket: { ...state.ticket, content: content },
      });
    });
  };

  handleViewChange = (atrb) => {
    this.setState({
      view: atrb,
    });
  };

  render() {
    const converter = new Showdown.Converter({
      tables: true,
      tasklists: true,
      strikethrough: true,
      simplifiedAutoLink: true,
    });
    const currentUser = {
      name: localStorage.getItem("username"),
      id: localStorage.getItem("userId"),
    };
    // console.log(this.state.ticket);
    return (
      <>
        {this.state.ticket && (
          <div className="discussion">
            <div className="ticket-discussion">
              <div className="discussion">
                <div className="discussion-title">
                  <div className="back-icon" onClick={this.handleBack}>
                    <FaArrowLeft className="fa-icon" />
                  </div>
                  <div className="ticket-title">
                    <span className="title-text">
                      {this.state.ticket.title}
                    </span>
                  </div>
                </div>
                <div className="ticket-tabs">
                  <span className="nav__tab container">
                    <ul className="nav__list__container">
                      {[
                        { view: "discussions", opt: "Discussions" },
                        { view: "history", opt: "History" },
                      ].map((ele, index) => (
                        <li
                          key={index}
                          className={
                            this.state.view === ele.view
                              ? "nav__single__tab selected"
                              : "nav__single__tab"
                          }
                          onClick={() => this.handleViewChange(ele.view)}
                        >
                          {ele.opt}
                        </li>
                      ))}
                    </ul>
                  </span>
                </div>
                <div
                  className="discussions"
                  style={{
                    height: this.state.editer === "ticket" ? "80vh" : "50vh",
                  }}
                >
                  <div className={`single-discussion discussion-ticket`}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="user-info">
                        <div className="image">
                          <Image src={userIcon2} alt="icon" rounded />
                        </div>
                        <div className="img-desc">
                          <h2>{this.state.ticket.createdBy.name}</h2>
                          <p className="discussion-date">
                            <Moment format="DD MMM YYYY">
                              {this.state.ticket.createdAt}
                            </Moment>
                            <Dropdown>
                              <Dropdown.Toggle variant="light">
                                Edits
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {this.state.ticket.history.map((item) => (
                                  <Dropdown.Item
                                    onClick={() =>
                                      this.setTicketContent(item.content)
                                    }
                                  >
                                    <Moment format="DD MMM YYYY">
                                      {item.editedAt}
                                    </Moment>
                                  </Dropdown.Item>
                                ))}
                              </Dropdown.Menu>
                            </Dropdown>
                          </p>
                        </div>
                      </div>
                      {this.state.editer === "new" && (
                        <Button
                          onClick={this.handleEditTicket}
                          style={{ margin: "8px" }}
                          variant="light"
                        >
                          <EditButton />
                        </Button>
                      )}
                      {this.state.editer === "ticket" && (
                        <div>
                          <Button
                            style={{ margin: "8px" }}
                            variant="light"
                            onClick={this.cancelEditTicket}
                          >
                            <CancelButton />
                            Cancel
                          </Button>
                          <Button
                            style={{ margin: "8px" }}
                            onClick={this.handleUpdateTicket}
                          >
                            <SaveButton />
                            Save
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="comment-content">
                      <div className="comment-details">
                        {this.state.editer === "new" && (
                          <ReactMarkdown source={this.state.ticket.content} />
                        )}
                        {this.state.editer === "ticket" && (
                          <ReactMde
                            value={this.state.content}
                            selectedTab={this.state.selectedTab}
                            onChange={this.setContent}
                            onTabChange={this.setSelectedTab}
                            generateMarkdownPreview={(markdown) =>
                              Promise.resolve(converter.makeHtml(markdown))
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {this.state.ticket.comments.map((ele, index) => (
                    <div
                      key={index}
                      className={`single-discussion ${
                        ele.createdBy.userId === currentUser.id
                          ? "right"
                          : "left"
                      }`}
                    >
                      <div className="user-info">
                        <div className="image">
                          <Image src={userIcon2} alt="icon" rounded />
                        </div>
                        <div className="img-desc">
                          <h2>{ele.createdBy.name}</h2>
                          <p className="discussion-date">
                            <Moment format="DD MMM YYYY">
                              {ele.createdAt}
                            </Moment>
                          </p>
                        </div>
                      </div>
                      <div className="comment-content">
                        <div className="comment-details">
                          <ReactMarkdown source={ele.content} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {this.state.editer === "new" && (
                  <div
                    className={`single-discussion discussion-ticket`}
                    id="discussion-editor"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="user-info">
                        <div className="image">
                          <Image src={userIcon2} alt="icon" rounded />
                        </div>
                        <div className="img-desc">
                          <h2>{currentUser.name}</h2>
                        </div>
                      </div>
                      <Button
                        onClick={this.sendComment}
                        style={{ margin: "8px" }}
                      >
                        <SendOutlinedIcon />
                        Send
                      </Button>
                    </div>
                    <div className="comment-content">
                      <ReactMde
                        value={this.state.content}
                        selectedTab={this.state.selectedTab}
                        onChange={this.setContent}
                        onTabChange={this.setSelectedTab}
                        generateMarkdownPreview={(markdown) =>
                          Promise.resolve(converter.makeHtml(markdown))
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="ticket-info">
              <Card className="info-card">
                <div className="info-title">Ticket Info</div>
                <div className="info-details">
                  <div className="data-element">
                    <span className="data-title">Ticket ID </span>
                    <span className="data-desc">9SUQb28020N</span>
                  </div>
                  <div className="data-element">
                    <span className="data-title">Created </span>
                    <span className="data-desc">23 Aug 2020</span>
                  </div>
                  <div className="data-element">
                    <span className="data-title">Last Message</span>
                    <span className="data-desc">24 Aug 2020</span>
                  </div>
                  <div className="data-element">
                    <span className="data-title">Status</span>
                    <span className="data-desc">
                      <Badge pill variant="primary">
                        Open
                      </Badge>
                    </span>
                  </div>
                  <div className="data-element">
                    <span className="data-title">Ticket ID </span>
                    <span className="data-desc">001</span>
                  </div>
                </div>
              </Card>
              <Card className="info-card">
                <div className="info-title">Requester</div>
                <div className="info-details">
                  <div className="data-element">
                    <Image
                      src={userIcon2}
                      alt="icon"
                      rounded
                      className="profile-img"
                      roundedCircle
                    />
                    <span className="data-desc">Devesh Verma</span>
                  </div>
                </div>
              </Card>
              {/* <Card className="info-card">
                <div className="info-title">Requester's other tickets</div>
                <div className="info-details">
                  <div className="data-element">
                    <span className="data-desc">
                      <Badge pill variant="primary">
                        Open
                      </Badge>
                    </span>
                    <span className="data-desc">
                      Requirement for a third party integration
                    </span>
                  </div>
                  <div className="data-element">
                    <span className="data-desc">
                      <Badge pill variant="primary">
                        Closed
                      </Badge>
                    </span>
                    <span className="data-desc">
                      Google Calendar integration
                    </span>
                  </div>
                </div>
              </Card> */}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default TicketDiscussions;
