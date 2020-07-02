import React, { Component } from "react";
import { Form, ListGroup, Button } from "react-bootstrap";
import "./DiscussionComments.scss";
import Carousel, { Modal, ModalGateway } from "react-images";
import { connect } from "react-redux";
import { commentProposal } from "../../../../../actions/proposalActions";

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
    const commentData = {
      userId: this.props.userId,
      proposalId: this.props.proposalId,
      comment: this.state.commentContent,
      isAuthor: this.props.isAuthor,
      author: this.props.author,
    };
    this.props.commentProposal(commentData);
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
              <Form className="form-text">
                <Form.Control
                  as="input"
                  placeholder="Comment"
                  className="textinput"
                  onChange={this.handleTextCHange}
                  value={this.state.commentContent}
                />
              </Form>
              <Button
                className="form-button"
                size="sm"
                onClick={this.handleComment}
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
        <div class="images">
          <div className="images-title">Attached Images</div>
          <div className="gallery">
            {this.props.images.map((item, index) => {
              return (
                <div className="gallery-item">
                  <img
                    className="image-item"
                    onClick={this.toggleModal}
                    src={item.source}
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

export default connect(null, { commentProposal })(DiscussionComments);
