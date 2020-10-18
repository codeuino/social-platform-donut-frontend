import React, { Component } from "react";
import "./TicketDashboard.scss";
import axios from "axios";
import Moment from "react-moment";
import { connect } from "react-redux";
import { setUpSocket } from "./socket";
import TicketFilter from "./Filter/Filter";
import Button from "react-bootstrap/Button";
import NewTicketEditor from "./NewTicketEditor";
import socket from "../../dashboard/utils/socket";
import LoadingOverlay from "react-loading-overlay";
import { BASE_URL } from "../../../actions/baseApi";
import ClockLoader from "react-spinners/ClockLoader";
import { ToastContainer, toast } from "react-toastify";
import TicketContent from "./TicketContent/TicketContent";
import { getTickets } from "../../../actions/ticketAction";
import { Drawer, List, ListItem } from "@material-ui/core";
import donutIcon from "../../../assets/svgs/donut-icon.svg";
import Navigation from "../../dashboard/navigation/navigation";
import TicketDisscussion from "./TicketDiscussion/TicketDiscussions";
import { createNewTicket, deleteTicket } from "../../../utils/ticket";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";

class TicketDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      view: "all",
      spinner: "",
      ticket: true,
      filtered: [],
      socket: socket,
      notifications: [],
      editorMode: false,
      viewingTicket: null,
      notificationDrawer: false,
    };
    this.axiosCancel = axios.CancelToken.source();
  }

  toggleDrawer = () => {
    this.setState((state) => {
      return {
        notificationDrawer: !state.notificationDrawer,
      };
    });
  };

  addToNotification = (notification) => {
    this.setState({
      notifications: [notification, ...this.state.notifications],
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      all: nextProps.tickets.tickets,
      filtered: nextProps.tickets.tickets,
    });
  }

  setFilteredTickets = (tickets) => {
    this.setState({
      filtered: [...tickets],
    });
  };

  clearFilters = () => {
    this.setState({
      filtered: [...this.state.all],
    });
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.getTickets();
    });
    this.getTicketNotifications();
    setUpSocket(this.state, donutIcon, this.addToNotification);
  }

  componentWillUnmount() {
    this.axiosCancel.cancel("axios request cancelled - Component Unmounted");
  }

  toggleNewTicketEditor = (open) => {
    this.setState({
      editorMode: open,
    });
  };

  getTicketNotifications = async () => {
    try {
      const notifications = (
        await axios.get(`${BASE_URL}/notification/ticket/user/all`, {
          cancelToken: this.axiosCancel.token,
        })
      ).data.notifications;
      this.setState({ notifications });
    } catch (err) {
      console.log(err);
    }
  };

  handleCreateNewTicket = (newTicket) => {
    this.setState(
      {
        spinner: "Creating new Ticket...",
      },
      createNewTicket.bind(this, newTicket)
    );
  };

  handleTicketSingleUpdate = (id, update) => {
    const tickets = [...this.state.all];
    tickets.forEach((ele) => {
      if (ele._id === id) {
        ele[Object.keys(update)[0]] = Object.values(update)[0];
      }
    });
    this.setState({
      all: [...tickets],
      filtered: [...tickets],
    });
  };

  handleAddTag = (id, tagName) => {
    const tickets = [...this.state.all];
    tickets.forEach((ele) => {
      if (ele._id === id) {
        ele.tags.push(tagName);
      }
    });
    this.setState({
      all: [...tickets],
      filtered: [...tickets],
    });
  };

  handleRemoveTag = async (id, tagName) => {
    const tickets = [...this.state.all];
    tickets.forEach((ele) => {
      if (ele._id === id) {
        ele.tags.splice(ele.tags.indexOf(tagName), 1);
      }
    });
    this.setState({
      all: [...tickets],
      filtered: [...tickets],
    });
  };

  handleViewTicket = (id) => {
    this.setState({
      filtered: [...this.state.all],
      viewingTicket: id,
    });
  };

  deleteTicket = (id) => {
    this.setState(
      { spinner: "Deleting Ticket,,,", viewingTicket: null },
      deleteTicket.bind(this, id)
    );
  };

  render() {
    const { spinner, editorMode, viewingTicket, ticket, all, filtered, notificationDrawer, notifications } = this.state;
    return (
      <div className="ticket">
        <div className="navigation">
          <Navigation ticket={ticket} />
        </div>
        <div className="ticket-details" id="ticket-shadow">
          <LoadingOverlay
            text={spinner}
            active={!!spinner}
            spinner={<ClockLoader color={"#1A73E8"} />}
            styles={{
              spinner: (base) => ({
                ...base,
                width: "100px",
                "& svg circle": {
                  stroke: "rgba(26, 115, 232, 0.5)",
                },
              }),
            }}
          >
            <div className="ticket-description">
              <div className="dashboard-title">
                Tickets
                <Button variant="light" onClick={this.toggleDrawer}>
                  <NotificationsNoneOutlinedIcon />
                </Button>
              </div>
              {!editorMode && !viewingTicket && (
                <React.Fragment>
                  <div className="ticket-status">
                    <TicketFilter
                      tickets={all}
                      filtered={filtered}
                      clear={this.clearFilters}
                      toggleNewTicketEditor={this.toggleNewTicketEditor}
                      setFiltered={this.setFilteredTickets}
                    />
                  </div>
                  {!!all.length && (
                    <div className="ticket-content">
                      <TicketContent
                        viewTicket={this.handleViewTicket}
                        tickets={filtered}
                      />
                    </div>
                  )}
                </React.Fragment>
              )}
              {editorMode && !viewingTicket && (
                <NewTicketEditor
                  save={this.handleCreateNewTicket}
                  cancel={() => this.toggleNewTicketEditor(false)}
                />
              )}
              {viewingTicket && (
                <TicketDisscussion
                  addTag={this.handleAddTag}
                  back={this.handleViewTicket}
                  currentUser={this.props.user}
                  removeTag={this.handleRemoveTag}
                  deleteTicket={this.deleteTicket}
                  ticketId={viewingTicket}
                  singleUpdate={this.handleTicketSingleUpdate}
                />
              )}
            </div>
          </LoadingOverlay>
          <Drawer
            anchor={"right"}
            open={notificationDrawer}
            PaperProps={{ style: { position: "absolute", zIndex: "5000" } }}
            BackdropProps={{ style: { position: "absolute", zIndex: "5000" } }}
            ModalProps={{
              container: document.getElementById("ticket-shadow"),
              style: { position: "absolute", zIndex: "5000" },
            }}
            variant="temporary"
            onClose={this.toggleDrawer}
          >
            <List className="list">
              {notifications &&
                notifications.map((notification, index) => (
                  <ListItem
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>{notification.tag}</div>
                    <div>{notification.heading}</div>
                    <div>
                      <Moment date={notification.createdAt} durationFromNow />
                    </div>
                    <div>{notification.content}</div>
                    <hr></hr>
                  </ListItem>
                ))}
            </List>
          </Drawer>
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
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = (state) => ({
  tickets: state.tickets,
  user: state.user,
});

export default connect(mapStateToProps, { getTickets })(TicketDashboard);
