import React, { Component } from "react";
// import userIcon2 from "../../../../../images/userIcon2.jpg";
import { Form, ListGroup } from "react-bootstrap";
import "./DiscussionComments.scss";

class DiscussionComments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const comments = this.props.commentItems;
    return (
      <div className="commentbox">
        <div className="comments">
          <div className="comment-title">Comments</div>
          <div className="comments-containers">
            <ListGroup>{comments}</ListGroup>
          </div>
          <div className="chat-container">
            <div className="textinput-container">
              <Form>
                <Form.Control
                  as="input"
                  placeholder="Comment"
                  className="textinput"
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DiscussionComments;
