import React, { Component } from "react";
import ReactMde from "react-mde";
import Moment from "react-moment";
import * as Showdown from "showdown";
import { Image } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Button from "react-bootstrap/Button";
// import Dropdown from "react-bootstrap/Dropdown";
import SaveButton from "@material-ui/icons/SaveOutlined";
import EditButton from "@material-ui/icons/EditOutlined";
import CancelButton from "@material-ui/icons/ClearOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import userIcon2 from "../../../../../assets/images/userIcon2.jpg";

class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editer: "new",
      content: "",
      selectedTab: "write",
    };
  }

  setContent = (content) => this.setState({ content });

  setSelectedTab = (selectedTab) => this.setState({ selectedTab });

  handleEditTicket = () => {
    this.setState({
      content: this.props.ticket.content,
      editer: "ticket",
    });
  };

  cancelEditTicket = () => {
    this.setState({
      content: "",
      editer: "new",
    });
  };

  handleUpdateTicket = () => {
    const content = this.state.content;
    this.setState(
      {
        editer: "new",
        content: "",
      },
      async () => await this.props.updateTicket({ content })
    );
  };

  sendComment = () => {
    const content = this.state.content;
    this.setState({ content: "" }, async () => {
      await this.props.sendComment(content);
    });
  };

  render() {
    const currentUser = {
      name: localStorage.getItem("username"),
      id: localStorage.getItem("userId"),
    };
    const converter = new Showdown.Converter({
      tables: true,
      tasklists: true,
      strikethrough: true,
      simplifiedAutoLink: true,
    });
    return (
      <React.Fragment>
        <div
          className="discussions"
          style={{
            height: this.state.editer === "ticket" ? "80vh" : "50vh",
          }}
        >
          <div className="single-discussion">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="user-info">
                <div className="image">
                  <Image src={userIcon2} alt="icon" rounded roundedCircle />
                </div>
                <div className="img-desc">
                  <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <h2>{this.props.ticket.createdBy.name}</h2>
                        {this.state.editer === "new" && (
                          <EditButton
                            style={{
                              color: "rgba(0,0,0,0.5)",
                              fontSize: "18px",
                            }}
                            onClick={this.handleEditTicket}
                          />
                        )}
                      </div>
                      <div className="discussion-date">
                        <Moment format="DD MMM YYYY">
                          {this.props.ticket.createdAt}
                        </Moment>
                      </div>
                    </div>
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
                        <ReactMarkdown source={this.props.ticket.content} />
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
              </div>
            </div>
          </div>
          {this.props.ticket.comments.map((ele, index) => (
            <div key={index} className={`single-discussion`}>
              <div className="user-info">
                <div className="image">
                  <Image
                    src={userIcon2}
                    width="70px"
                    alt="icon"
                    rounded
                    roundedCircle
                  />
                </div>
                <div className="img-desc">
                  <h2>{ele.createdBy.name}</h2>
                  <p className="discussion-date">
                    <Moment format="DD MMM YYYY">{ele.createdAt}</Moment>
                  </p>
                  <div className="comment-content">
                    <div className="comment-details">
                      <ReactMarkdown source={ele.content} />
                    </div>
                  </div>
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
                  <Image src={userIcon2} alt="icon" rounded roundedCircle />
                </div>
                <div className="img-desc">
                  <h2>{currentUser.name}</h2>
                </div>
              </div>
              <Button onClick={this.sendComment} style={{ margin: "8px" }}>
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
      </React.Fragment>
    );
  }
}

export default Discussion;
