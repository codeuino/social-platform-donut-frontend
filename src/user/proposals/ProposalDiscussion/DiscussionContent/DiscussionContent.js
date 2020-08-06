import React, { Component } from "react";
import "./DiscussionContent.scss";
import { Button, Badge, Image, ListGroup } from "react-bootstrap";
import DiscussionComments from "./DiscussionComments/DiscussionComments";
import userIcon2 from "../../../../assets/images/userIcon2.jpg";
import RequestChanges from "../DiscussionPopups/RequestChanges";
import { withRouter, Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import { getProposal } from "../../../../actions/proposalActions";
import InsightsModal from "../InsightsModal";
import ReactGA from "react-ga";

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
      displayInsights: false,
    };
  }

  //Token would be passed down from the
  componentDidMount() {
    const { proposalId, isAdmin, userId, token } = this.props.location.state;
    console.log(proposalId);
    ReactGA.pageview(`/${proposalId}`);

    this.setState(
      {
        proposalId: proposalId,
        isAdmin: isAdmin,
        userId: userId,
        token: token,
      },
      () => {
        this.props.getProposal(this.state.proposalId);
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    const { fetchedProposal } = nextProps;
    const images = [];
    let variant = "";

    fetchedProposal.attachments.forEach((item, index) => {
      images.push({ source: item.fileLink });
    });

    switch (fetchedProposal.proposalStatus) {
      case "DRAFT":
        variant = "danger";
        break;
      case "SUBMITTED":
        variant = "secondary";
        break;
    }

    this.setState(
      {
        proposalTitle: fetchedProposal.title,
        markdownString: fetchedProposal.content,
        proposalDescription: fetchedProposal.proposalDescription,
        commentList: fetchedProposal.comments,
        author: fetchedProposal.creator,
        proposalState: fetchedProposal.proposalStatus,

        images: images,
      },
      () => {
        this.processComments();
      }
    );
  }

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

  showInsights = () => {
    this.setState({ displayInsights: true });
  };

  closeInsights = () => {
    this.setState({ displayInsights: false });
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
            <Button
              variant="primary"
              className="option-btn"
              size="sm"
              active
              onClick={this.showInsights}
            >
              <span className="option-text">View Insights</span>
            </Button>
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
              images={this.state.images}
            />
          </div>
          <InsightsModal
            show={this.state.displayInsights}
            handleClose={this.closeInsights}
            proposalId={this.state.proposalId}
          />
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

const mapStateToProps = (state) => ({
  fetchedProposal: state.proposal.fetchedProposal,
});

export default connect(mapStateToProps, { getProposal })(
  withRouter(DiscussionContent)
);
