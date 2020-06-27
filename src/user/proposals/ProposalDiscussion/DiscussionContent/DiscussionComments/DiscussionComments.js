import React, { Component } from "react";
import userIcon2 from "../../../../../images/userIcon2.jpg";
import { Form, ListGroup, Button } from "react-bootstrap";
import "./DiscussionComments.scss";

class DiscussionComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentContent: "",
      commentItems: this.props.commentItems,
    };
  }

  handleComment = (text) => {
    fetch("http://localhost:5000/proposal/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.token,
      },
      body: JSON.stringify({
        userId: this.props.userId,
        proposalId: this.props.proposalId,
        comment: this.state.commentContent,
        isAuthor: this.props.isAuthor,
        author: this.props.author,
      }),
    });

    this.props.handleComment(this.state.commentContent);

    this.setState({
      commentContent: "",
    });
  };

  handleTextCHange = (e) => {
    this.setState({
      commentContent: e.target.value,
    });
  };

  render() {
    const comments = this.props.commentItems;
    return (
      <div className="commentbox">
        <div className="comments">
          <div className="comment-title">Comments</div>
          <div className="comments-containers" style={{ minHeight: "75vh" }}>
            <ListGroup>{comments}</ListGroup>
          </div>
          <div className="chat-container">
            <div className="textinput-container">
              <Form
                style={{
                  display: "inline-block",
                  marginRight: "10px",
                  width: "80%",
                }}
              >
                <Form.Control
                  as="input"
                  placeholder="Comment"
                  className="textinput"
                  onChange={this.handleTextCHange}
                />
              </Form>
              <Button
                size="sm"
                style={{ display: "inline-block" }}
                onClick={this.handleComment}
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DiscussionComments;
