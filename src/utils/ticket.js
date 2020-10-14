import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../actions/baseApi";

export const createNewTicket = async function (newTicket) {
  try {
    const ticket = (
      await axios.post(`${BASE_URL}/ticket`, newTicket, {
        cancelToken: this.axiosCancel.token,
      })
    ).data.ticket;
    ticket.comments = 0;
    this.setState({
      all: [ticket, ...this.state.all],
      filtered: [ticket, ...this.state.all],
      editorMode: false,
      spinner: "",
    });
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong! could create Ticket");
    this.setState({ spinner: "" });
  }
};

export const deleteTicket = async function (id) {
  try {
    const newTickets = this.state.all.filter((ele) => ele._id !== id);
    await axios.delete(`${BASE_URL}/ticket/${id}`, {
      cancelToken: this.axiosCancel.token,
    });
    this.setState({
      all: [...newTickets],
      filtered: [...newTickets],
      spinner: "",
    });
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong! could not delete Ticket");
    this.setState({ spinner: "" });
  }
};

export const saveTicketTitle = async function () {
  await this.props.updateTicket({
    type: "title",
    title: this.state.title,
  });
  this.props.singleUpdate(this.props.ticket._id, {
    title: this.state.title,
  });
};

export const saveTicketSummary = async function () {
  await this.props.updateTicket({
    type: "shortDescription",
    shortDescription: this.state.data,
  });
  this.props.singleUpdate(this.props.ticketId, {
    shortDescription: this.state.data,
  });
};

export const getTicket = async function () {
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
};

export const createCommnet = async function (content) {
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
};

export const updateTicket = async function (updates) {
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
};

export const upvoteComment = async function (commentId) {
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
};

export const downvoteComment = async function (commentId) {
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
};

export const deleteComment = async function (commentId) {
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
};

export const addTag = async function (tagName) {
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
};

export const deleteTag = async function (tagName) {
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
};
