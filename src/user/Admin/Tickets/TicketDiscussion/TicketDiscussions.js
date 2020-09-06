import React, { Component } from "react";
import "./TicketDiscussion.scss";
import Axios from "axios";
import Layout from "./Layout";
import ReactMde from "react-mde";
import Moment from "react-moment";
import * as Showdown from "showdown";
import { Image } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Disscussion from "./Discussion/Discussion";
import "react-mde/lib/styles/css/react-mde-all.css";
import { BASE_URL } from "../../../../actions/baseApi";
import SaveButton from "@material-ui/icons/SaveOutlined";
import EditButton from "@material-ui/icons/EditOutlined";
import CancelButton from "@material-ui/icons/ClearOutlined";
import userIcon2 from "../../../../assets/images/userIcon2.jpg";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

class TicketDiscussions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "discussions",
      ticket: null,
    };
  }

  getTicket = async () => {
    const ticket = (
      await Axios.get(`${BASE_URL}/ticket/${this.props.ticketId}`)
    ).data;
    this.setState({ ticket: ticket.ticket });
  };

  componentDidMount() {
    this.getTicket();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  handleBack = () => {
    this.props.back(null);
  };

  sendComment = async (content) => {
    const newTicket = (
      await Axios.post(`${BASE_URL}/ticket/${this.state.ticket._id}/comment`, {
        content,
      })
    ).data.ticket;
    this.setState({
      ticket: newTicket,
    });
  };

  // setTicketContent = (content) => {
  //   this.setState({
  //     ticket: { ...this.state.ticket, content: content },
  //   });
  // };

  handleUpdateTicket = async (updates) => {
    try {
      const newTicket = (
        await Axios.put(`${BASE_URL}/ticket/${this.state.ticket._id}`, updates)
      ).data.ticket;
      this.setState({
        ticket: newTicket,
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleViewChange = (atrb) => {
    this.setState({
      view: atrb,
    });
  };

  render() {
    // console.log(this.state.ticket);
    return (
      <>
        {this.state.ticket && (
          <Layout
            ticket={this.state.ticket}
            view={this.state.view}
            handleViewChange={this.handleViewChange}
            handleBack={this.handleBack}
          >
            <Disscussion
              ticket={this.state.ticket}
              sendComment={this.sendComment}
              updateTicket={this.handleUpdateTicket}
              // setTicketContent={this.setTicketContent}
            />
          </Layout>
        )}
      </>
    );
  }
}

export default TicketDiscussions;
