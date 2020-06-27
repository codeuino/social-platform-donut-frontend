import React, { Component } from "react";
import "./DiscussionContent.scss";
import { Button, Badge, Image, ListGroup } from "react-bootstrap";
import DiscussionComments from "./DiscussionComments/DiscussionComments";
import eventImg from "../../../../svgs/event-img-1.svg";
import userIcon2 from "../../../../images/userIcon2.jpg";
import RequestChanges from "../DiscussionPopups/RequestChanges";
import { withRouter, Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import Carousel, { Modal, ModalGateway } from "react-images";

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
      author: "",
      images: [{ source: "../../../../images/userIcon2.jpg" }],
      imageModalOpen: false,
      proposalState: "",
      variant: "danger",
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
        const images = [];
        resData.proposal.attachments.forEach((item, index) => {
          images.push({ source: item.fileLink });
        });

        let variant;

        switch (resData.proposal.proposalStatus) {
          case "DRAFT":
            variant = "danger";
            break;
          case "SUBMITTED":
            variant = "secondary";
            break;
        }

        this.setState(
          {
            proposalTitle: resData.proposal.title,
            markdownString: resData.proposal.content,
            proposalDescription: resData.proposal.proposalDescription,
            commentList: resData.proposal.comments,
            author: resData.proposal.creator,
            proposalState: resData.proposal.proposalStatus,
            variant: variant,
            images: images,
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

  toggleModal = () => {
    this.setState((state) => ({ imageModalOpen: !state.imageModalOpen }));
  };

  handleTextSelction = () => {
    console.log("text selection called");
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
    const { imageModalOpen, images } = this.state;
    return (
      <div className="discussion-content">
        <div className="discussion-toppanel">
          <div className="discussion-title">
            <span className="title-text">
              {this.state.proposalTitle}{" "}
              <h5>
                <Badge variant={this.state.variant}>
                  {this.state.proposalState}
                </Badge>
              </h5>
            </span>
          </div>
          <div></div>
          <div className="discussion-desc"></div>
          <div className="discussion-buttons">
            <Link
              to={{
                pathname: "/proposaleditor",
                state: {
                  proposalId: this.state.proposalId,
                },
              }}
            >
              <Button variant="primary" className="option-btn" size="sm" active>
                <span className="option-text">Edit</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="discussion-bottompanel">
          <div className="proposal-preview">
            <div className="proposal-text" onMouseUp={this.handleTextSelction}>
              <Editor
                value={this.state.markdownString}
                disabled={true}
                apiKey="lvp9xf6bvvm3nkaupm67ffzf50ve8femuaztgg7rkgkmsws3"
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
              <div
                style={{
                  overflow: "hidden",
                  marginLeft: "2",
                  marginRight: "2",
                }}
              >
                {images.map((item, index) => {
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
                {imageModalOpen ? (
                  <Modal onClose={this.toggleModal}>
                    <Carousel views={this.state.images} />
                  </Modal>
                ) : null}
              </ModalGateway>
            </div>
          </div>
          <div className="comments">
            <DiscussionComments
              commentItems={this.state.comments}
              proposalId={this.state.proposalId}
              userId={this.state.userId}
              token={this.state.token}
              getData={this.getData}
              isAuthor={this.state.author === this.state.userId}
              author={this.state.author}
              handleComment={this.handleComment}
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
