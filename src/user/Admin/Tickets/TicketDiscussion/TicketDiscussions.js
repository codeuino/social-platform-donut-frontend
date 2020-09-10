import React, { Component } from "react";
import "./TicketDiscussion.scss";
import axios from "axios";
import Layout from "./Layout/Layout";
import History from "./History/History";
import Disscussion from "./Discussion/Discussion";
import "react-mde/lib/styles/css/react-mde-all.css";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../../../actions/baseApi";

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
      async () => {
        const ticket = (
          await axios.get(`${BASE_URL}/ticket/${this.props.ticketId}`, {
            cancelToken: this.axiosCancel.token,
          })
        ).data.ticket;
        this.editsAllowed =
          localStorage.getItem("ticketModerator") === "true" ||
          localStorage.getItem("admin") === "true" ||
          localStorage.getItem("userId") === ticket.createdBy.id;
        this.deleteAllowed =
          localStorage.getItem("ticketModerator") === "true" ||
          localStorage.getItem("admin") === "true";
        this.setState({ ticket: ticket, spinner: "" });
      }
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
      async () => {
        try {
          this.setState({
            ticket: (
              await axios.post(
                `${BASE_URL}/ticket/${this.state.ticket._id}/comment`,
                {
                  content,
                },
                { cancelToken: this.axiosCancel.token }
              )
            ).data.ticket,
            spinner: "",
          });
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong! could not add comment");
          this.setState({ spinner: "" });
        }
      }
    );
  };

  handleUpdateTicket = async (updates) => {
    this.setState(
      {
        spinner: "Updating Ticket...",
      },
      async () => {
        try {
          this.setState({
            ticket: (
              await axios.put(
                `${BASE_URL}/ticket/${this.state.ticket._id}`,
                updates,
                { cancelToken: this.axiosCancel.token }
              )
            ).data.ticket,
            spinner: "",
          });
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong! could not update Ticket");
          this.setState({ spinner: "" });
        }
      }
    );
  };

  handleCommentUpvote = (commentId) => {
    this.setState(
      {
        spinner: "Adding vote to comment...",
      },
      async () => {
        try {
          this.setState({
            ticket: (
              await axios.put(
                `${BASE_URL}/ticket/${this.state.ticket._id}/comment/${commentId}/upvote`,
                {},
                { cancelToken: this.axiosCancel.token }
              )
            ).data.ticket,
            spinner: "",
          });
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong! could not upvote comment");
          this.setState({ spinner: "" });
        }
      }
    );
  };

  handleCommentDownvote = async (commentId) => {
    this.setState(
      {
        spinner: "Removing vote from comment...",
      },
      async () => {
        try {
          this.setState({
            ticket: (
              await axios.put(
                `${BASE_URL}/ticket/${this.state.ticket._id}/comment/${commentId}/downvote`,
                {},
                { cancelToken: this.axiosCancel.token }
              )
            ).data.ticket,
            spinner: "",
          });
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong! could not downvote comment");
          this.setState({ spinner: "" });
        }
      }
    );
  };

  handleCommentDelete = async (commentId) => {
    this.setState(
      {
        spinner: "Removig comment...",
      },
      async () => {
        try {
          this.setState({
            ticket: (
              await axios.delete(
                `${BASE_URL}/ticket/${this.state.ticket._id}/comment/${commentId}`,
                { cancelToken: this.axiosCancel.token }
              )
            ).data.ticket,
            spinner: "",
          });
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong! could not remove comment");
          this.setState({ spinner: "" });
        }
      }
    );
  };

  handleAddTag = async (tagName) => {
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
        async () => {
          try {
            this.setState({
              ticket: (
                await axios.post(
                  `${BASE_URL}/ticket/${this.state.ticket._id}/tag/${tagName}`,
                  {},
                  { cancelToken: this.axiosCancel.token }
                )
              ).data.ticket,
              spinner: "",
            });
            this.props.addTag(this.state.ticket._id, tagName);
          } catch (err) {
            console.log(err);
            toast.error("Something went wrong! could not add tag");
            this.setState({ spinner: "" });
          }
        }
      );
    }
  };

  handleDeleteTag = async (tagName) => {
    this.setState(
      {
        spinner: "Removing Tag...",
      },
      async () => {
        try {
          this.setState({
            ticket: (
              await axios.delete(
                `${BASE_URL}/ticket/${this.state.ticket._id}/tag/${tagName}`,
                { cancelToken: this.axiosCancel.token }
              )
            ).data.ticket,
            spinner: "",
          });
          this.props.addTag(this.state.ticket._id, tagName);
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong! could not remove tag");
          this.setState({ spinner: "" });
        }
      }
    );
  };

  handleViewChange = (atrb) => {
    this.setState({
      view: atrb,
    });
  };

  render() {
    return (
      <>
        <Layout
          ticket={this.state.ticket}
          view={this.state.view}
          addTag={this.handleAddTag}
          handleBack={this.handleBack}
          spinner={this.state.spinner}
          removeTag={this.handleDeleteTag}
          editsAllowed={this.editsAllowed}
          deleteAllowed={this.deleteAllowed}
          updateTicket={this.handleUpdateTicket}
          singleUpdate={this.props.singleUpdate}
          deleteTicket={this.props.deleteTicket}
          handleViewChange={this.handleViewChange}
        >
          {this.state.view === "discussions" && (
            <Disscussion
              ticket={this.state.ticket}
              sendComment={this.sendComment}
              editsAllowed={this.editsAllowed}
              deleteAllowed={this.deleteAllowed}
              updateTicket={this.handleUpdateTicket}
              upVoteComment={this.handleCommentUpvote}
              deleteComment={this.handleCommentDelete}
              downVoteComment={this.handleCommentDownvote}
            />
          )}
          {this.state.view === "history" && (
            <History ticket={this.state.ticket} />
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
