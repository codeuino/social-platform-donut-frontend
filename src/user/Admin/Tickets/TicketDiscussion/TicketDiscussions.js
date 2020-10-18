import React, { Component } from "react";
import "./TicketDiscussion.scss";
import axios from "axios";
import Layout from "./Layout/Layout";
import History from "./History/History";
import Disscussion from "./Discussion/Discussion";
import "react-mde/lib/styles/css/react-mde-all.css";
import { ToastContainer, toast } from "react-toastify";
import { getTicket, createCommnet, updateTicket, upvoteComment, downvoteComment, deleteComment, addTag, deleteTag } from "../../../../utils/ticket";

class TicketDiscussions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: null,
      view: "discussions",
      spinner: "Loading",
    };
    this.axiosCancel = axios.CancelToken.source();
  }

  getTicket = () => {
    this.setState(
      {
        spinner: "Loading Ticket...",
      },
      getTicket.bind(this)
    );
  };

  componentDidMount() {
    this.getTicket();
  }

  componentWillUnmount() {
    this.axiosCancel.cancel("axios request cancelled - Component Unmounted");
  }

  handleBack = () => {
    this.props.back(null);
  };

  sendComment = (content) => {
    this.setState(
      {
        spinner: "Adding comment...",
      },
      createCommnet.bind(this, content)
    );
  };

  handleUpdateTicket = (updates) => {
    this.setState(
      {
        spinner: "Updating Ticket...",
      },
      updateTicket.bind(this, updates)
    );
  };

  handleCommentUpvote = (commentId) => {
    this.setState(
      {
        spinner: "Adding vote to comment...",
      },
      upvoteComment.bind(this, commentId)
    );
  };

  handleCommentDownvote = (commentId) => {
    this.setState(
      {
        spinner: "Removing vote from comment...",
      },
      downvoteComment.bind(this, commentId)
    );
  };

  handleCommentDelete = (commentId) => {
    this.setState(
      {
        spinner: "Removig comment...",
      },
      deleteComment.bind(this, commentId)
    );
  };

  handleAddTag = (tagName) => {
    if (this.state.ticket.tags.indexOf(tagName) !== -1) {
      toast.error("Tag already present");
    } else if (tagName.length > 10) {
      toast.error("Tag can have upto 10 characters only");
    } else if ((this.state.ticket.tags || []).length >= 7) {
      toast.error("Ticket can have upto 7 tags only");
    } else {
      this.setState(
        {
          spinner: "Adding Tag...",
        },
        addTag.bind(this, tagName)
      );
    }
  };

  handleDeleteTag = (tagName) => {
    this.setState(
      {
        spinner: "Removing Tag...",
      },
      deleteTag.bind(this, tagName)
    );
  };

  handleViewChange = (atrb) => {
    this.setState({
      view: atrb,
    });
  };

  render() {
    const { ticket, view, spinner } = this.state;
    const { singleUpdate, deleteTicket } = this.props;
    return (
      <>
        <Layout
          view={view}
          ticket={ticket}
          spinner={spinner}
          addTag={this.handleAddTag}
          singleUpdate={singleUpdate}
          deleteTicket={deleteTicket}
          handleBack={this.handleBack}
          removeTag={this.handleDeleteTag}
          editsAllowed={this.editsAllowed}
          deleteAllowed={this.deleteAllowed}
          updateTicket={this.handleUpdateTicket}
          handleViewChange={this.handleViewChange}
        >
          {view === "discussions" && (
            <Disscussion
              ticket={ticket}
              sendComment={this.sendComment}
              editsAllowed={this.editsAllowed}
              deleteAllowed={this.deleteAllowed}
              updateTicket={this.handleUpdateTicket}
              upVoteComment={this.handleCommentUpvote}
              deleteComment={this.handleCommentDelete}
              downVoteComment={this.handleCommentDownvote}
            />
          )}
          {view === "history" && (
            <History ticket={ticket} />
          )}
        </Layout>
        <ToastContainer
          draggable
          rtl={false}
          pauseOnHover
          closeOnClick
          autoClose={5000}
          pauseOnFocusLoss
          newestOnTop={false}
          position="top-right"
          hideProgressBar={false}
        />
      </>
    );
  }
}

export default TicketDiscussions;
