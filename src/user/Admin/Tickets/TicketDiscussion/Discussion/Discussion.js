import React, { Component } from "react";
import ReactMde from "react-mde";
import Moment from "react-moment";
import * as Showdown from "showdown";
import { Image } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Button from "react-bootstrap/Button";
import SaveButton from "@material-ui/icons/SaveOutlined";
import EditButton from "@material-ui/icons/EditOutlined";
import CancelButton from "@material-ui/icons/ClearOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import userIcon2 from "../../../../../assets/images/userIcon2.jpg";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: "new",
      content: "",
      selectedTab: "write",
    };
  }

  setContent = (content) => this.setState({ content });

  setSelectedTab = (selectedTab) => this.setState({ selectedTab });

  handleEditTicket = () => {
    this.setState({
      content: this.props.ticket.content,
      editor: "ticket",
    });
  };

  cancelEditTicket = () => {
    this.setState({
      content: "",
      editor: "new",
    });
  };

  handleUpdateTicket = () => {
    const content = this.state.content;
    this.setState(
      {
        editor: "new",
        content: "",
      },
      async () => await this.props.updateTicket({ type: "content", content })
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
    const { editor, content, selectedTab } = this.state;
    const { ticket, editsAllowed, deleteAllowed, deleteComment, upVoteComment, downVoteComment} = this.props;
    return (
      <React.Fragment>
        <div
          className="discussions"
          style={{
            height: editor === "ticket" ? "80vh" : "50vh",
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <h2>{ticket.createdBy.name}</h2>
                        {editor === "new" &&
                          editsAllowed && (
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
                          {ticket.createdAt}
                        </Moment>
                      </div>
                    </div>
                    {editor === "ticket" && (
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
                          disabled={ticket.content === content}
                        >
                          <SaveButton />
                          Save
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="comment-content">
                    <div className="comment-details">
                      {editor === "new" && (
                        <ReactMarkdown source={ticket.content} />
                      )}
                      {editor === "ticket" && (
                        <ReactMde
                          value={content}
                          selectedTab={selectedTab}
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
          {ticket.comments.map((ele, index) => (
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
                  <h2>
                    {ele.createdBy.name}
                    {deleteAllowed && <DeleteOutlineOutlinedIcon
                      style={{
                        color: "rgba(0,0,0,0.5)",
                        fontSize: "18px",
                        cursor: "pointer"
                      }}
                      onClick={() => deleteComment(ele._id)}
                    />}
                  </h2>
                  <p className="discussion-date">
                    <Moment format="DD MMM YYYY">{ele.createdAt}</Moment>
                  </p>
                  <div className="comment-content">
                    <div className="comment-details">
                      <ReactMarkdown source={ele.content} />
                    </div>
                  </div>
                  <div className="comment-footer">
                    <div
                      className={
                        ele.votes.upVotes.user.indexOf(currentUser.id) === -1
                          ? ""
                          : "selected"
                      }
                      onClick={() => upVoteComment(ele._id)}
                    >
                      <ThumbUpAltOutlinedIcon />
                      <span>{ele.votes.upVotes.user.length}</span>
                    </div>
                    <div
                      className={
                        ele.votes.downVotes.user.indexOf(currentUser.id) === -1
                          ? ""
                          : "selected"
                      }
                      onClick={() => downVoteComment(ele._id)}
                    >
                      <ThumbDownOutlinedIcon />
                      <span>{ele.votes.downVotes.user.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {editor === "new" && (
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
                value={content}
                selectedTab={selectedTab}
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
