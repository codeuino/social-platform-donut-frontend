import React, { Component } from "react";
import userIcon2 from "../../../../../images/userIcon2.jpg";
import { Form, ListGroup, Button } from "react-bootstrap";
import "./DiscussionComments.scss";
import Carousel, { Modal, ModalGateway } from "react-images";

class DiscussionComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentContent: "",
      commentItems: this.props.commentItems,
      imageModalOpen: false,
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

  toggleModal = () => {
    this.setState((state) => ({ imageModalOpen: !state.imageModalOpen }));
  };

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
              <Form
                style={{
                  display: "inline-block",
                  marginRight: "10px",
                  width: "70%",
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
                onClick={this.handleComment}
                style={{ width: "25%" }}
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
        <div class="images">
          <div className="images-title">Attached Images</div>
          <div
            style={{
              overflow: "hidden",
              marginLeft: "2",
              marginRight: "2",
              padding: "12px",
              border: "1px solid black",
              height: "100%",
              border: "solid 1px #dfe9f1",
            }}
          >
            {this.props.images.map((item, index) => {
              return (
                <div
                  style={{
                    boxSizing: "border-box",
                    float: "left",
                    margin: "2px",
                    marginRight: "10px",
                    overflow: "hidden",
                    paddingBottom: "16%",
                    position: "relative",
                    width: `calc(25% - ${2 * 2}px)`,
                    "&:hover": {
                      opacity: 0.9,
                    },
                  }}
                >
                  <img
                    onClick={this.toggleModal}
                    src={item.source}
                    style={{ maxWidth: "100%", position: "absolute" }}
                  />
                </div>
              );
            })}
          </div>

          <ModalGateway>
            {this.state.imageModalOpen ? (
              <Modal onClose={this.toggleModal}>
                <Carousel views={this.props.images} />
              </Modal>
            ) : null}
          </ModalGateway>
        </div>
      </div>
    );
  }
}

export default DiscussionComments;
