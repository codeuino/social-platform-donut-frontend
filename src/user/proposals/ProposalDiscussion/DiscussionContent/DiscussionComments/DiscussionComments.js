import React, { Component } from "react";
import userIcon2 from "../../../../../images/userIcon2.jpg";
import { Button, Form, Col, Image, ListGroup } from "react-bootstrap";
import "./DiscussionComments.scss";

class DiscussionComments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="commentbox">
        <div className="comments">
          <div className="comment-title">Comments</div>
          <div className="comments-containers">
            <ListGroup>
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
                    <div className="commenting-user">Devesh</div>
                    <div className="commented-section">
                      "Lorem ipsum dolor sit amet"
                    </div>
                    <div className="comment-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
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
                    <div className="commenting-user">Devesh</div>
                    <div className="commented-section">
                      "Lorem ipsum dolor sit amet"
                    </div>
                    <div className="comment-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
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
                    <div className="commenting-user">Devesh</div>
                    <div className="commented-section">
                      "Lorem ipsum dolor sit amet"
                    </div>
                    <div className="comment-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
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
                    <div className="commenting-user">Devesh</div>
                    <div className="commented-section">
                      "Lorem ipsum dolor sit amet"
                    </div>
                    <div className="comment-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
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
                    <div className="commenting-user">Devesh</div>
                    <div className="commented-section">
                      "Lorem ipsum dolor sit amet"
                    </div>
                    <div className="comment-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
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
                    <div className="commenting-user">Devesh</div>
                    <div className="commented-section">
                      "Lorem ipsum dolor sit amet"
                    </div>
                    <div className="comment-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
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
