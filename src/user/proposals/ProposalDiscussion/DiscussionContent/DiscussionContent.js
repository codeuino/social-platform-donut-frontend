import React, { Component } from "react";
import "./DiscussionContent.scss";
import { Button, Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import DiscussionComments from "./DiscussionComments/DiscussionComments";
import eventImg from "../../../../svgs/event-img-1.svg";
import userIcon2 from "../../../../images/userIcon2.jpg";
import RequestChanges from "../DiscussionPopups/RequestChanges";
import { withRouter } from "react-router-dom";
import { Remarkable } from "remarkable";
import parse from "html-react-parser";
import { Editor } from "@tinymce/tinymce-react";

const md = new Remarkable({
  html: true, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />)
  breaks: false, // Convert '\n' in paragraphs into <br>
  langPrefix: "language-", // CSS language prefix for fenced blocks

  // Enable some language-neutral replacement + quotes beautification
  typographer: false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
  quotes: "“”‘’",

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed
  highlight: function (/*str, lang*/) {
    return "";
  },
});

class DiscussionContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      showModal: false,
      selectedText: "",
      proposalId: "",
      isAdmin: false,
      proposalTitle: "",
      markdownString: "",
      proposalDescription: "",
      commentList: [],
    };
  }

  //Token would be passed down from the
  componentDidMount() {
    const { proposalId, isAdmin, userId, token } = this.props.location.state;

    this.setState(
      {
        proposalId: proposalId,
        isAdmin: isAdmin,
        userId: userId,
        token: token,
      },
      () => {
        console.log(this.state);
        this.getData();
      }
    );
  }

  getData = () => {
    console.log("getDtata called");
    fetch("http://localhost:5000/proposal/" + this.state.proposalId, {
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
        console.log(resData);
        this.setState(
          {
            proposalTitle: resData.proposal.title,
            markdownString: resData.proposal.content,
            proposalDescription: resData.proposal.proposalDescription,
            commentList: resData.proposal.comments,
          },
          () => {
            this.processComments();
          }
        );
      });
  };

  processComments = () => {
    let comments = [];

    this.state.commentList.forEach((commentItem) => {
      comments.push(
        <ListGroup.Item>
          <div className="comment-item">
            <div className="image-container">
              <Image
                src={userIcon2}
                alt="icon"
                rounded
                className="user-image"
              />
            </div>
            <div className="comment-container">
              <div className="commenting-user">{commentItem.userName}</div>
              <div className="comment-text">{commentItem.comment}</div>
            </div>
          </div>
        </ListGroup.Item>
      );
    });
    this.setState({
      comments: comments,
    });
  };

  handleTextSelction = () => {
    if (window.getSelection().toString().length > 0) {
      this.setState(
        {
          selectedText: window.getSelection().toString(),
        },
        () => {
          this.setState({
            showModal: true,
          });
        }
      );
    }
  };

  handleComment = (text) => {
    let comments = this.state.comments;

    comments.push(
      <ListGroup.Item>
        <div className="comment-item">
          <div className="image-container">
            <Image src={userIcon2} alt="icon" rounded className="user-image" />
          </div>
          <div className="comment-container">
            <div className="commenting-user">Devesh</div>
            <div className="commented-section">{this.state.selectedText}</div>
            <div className="comment-text">{text}</div>
          </div>
        </div>
      </ListGroup.Item>
    );

    this.setState({
      comments: comments,
      selectedText: "",
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    return (
      <div className="discussion-content">
        <div className="discussion-toppanel">
          <div className="discussion-title">
            <span className="title-text">{this.state.proposalTitle}</span>
          </div>
          <div className="discussion-desc"></div>
          <div className="discussion-buttons">
            <Button variant="primary" className="option-btn" size="sm" active>
              <span className="option-text">Edit</span>
            </Button>
          </div>
        </div>
        <div className="discussion-bottompanel">
          <div className="proposal-preview">
            <div className="proposal-text" onMouseUp={this.handleTextSelction}>
              {/* <p>{parse(md.render(this.state.markdownString))}</p> */}
              <Editor
                value={this.state.markdownString}
                disabled={true}
                apiKey="lvp9xf6bvvm3nkaupm67ffzf50ve8femuaztgg7rkgkmsws3"
                initialValue="<p>This is the initial content of the editor</p>"
                init={{
                  height: "100%",
                  width: "100%",
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar: false,
                }}
                onEditorChange={this.handleTinyEditorChange}
              />
            </div>
            <div className="attached-images">
              <div className="images-title">Attached Images</div>
              <Row>
                <Image src={eventImg} rounded className="image-item" />
                <Image src={eventImg} rounded className="image-item" />
              </Row>
            </div>
          </div>
          <div className="comments">
            <DiscussionComments
              commentItems={this.state.comments}
              proposalId={this.state.proposalId}
              userId={this.state.userId}
              token={this.state.token}
              getData={this.getData}
            />
          </div>
          <RequestChanges
            show={this.state.showModal && this.state.isAdmin}
            handleClose={() => {
              this.handleClose();
            }}
            handleComment={this.handleComment}
            selectedText={this.state.selectedText}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(DiscussionContent);
