import React, { Component } from "react";
import "./TicketDashboard.scss";
import Axios from "axios";
import Moment from "react-moment";
import { connect } from "react-redux";
import { setUpSocket } from "./socket";
import TicketFilter from "./Filter/Filter";
import Button from "react-bootstrap/Button";
import NewTicketEditor from "./NewTicketEditor";
import socket from "../../dashboard/utils/socket";
import { BASE_URL } from "../../../actions/baseApi";
import TicketContent from "./TicketContent/TicketContent";
import { getTickets } from "../../../actions/ticketAction";
import donutIcon from "../../../assets/svgs/donut-icon.svg";
import Navigation from "../../dashboard/navigation/navigation";
import TicketDisscussion from "./TicketDiscussion/TicketDiscussions";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";

class TicketDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "all",
      ticket: true,
      all: [],
      filtered: [],
      socket: socket,
      notifications: [],
      editorMode: false,
      viewingTicket: null,
      notificationDrawer: false,
    };
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
    console.log(nextProps.tickets.tickets);
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

  toggleNewTicketEditor = (open) => {
    this.setState({
      editorMode: open,
    });
  };

  getTicketNotifications = async () => {
    const notifications = (
      await Axios.get(`${BASE_URL}/notification/ticket/user/all`)
    ).data.notifications;
    this.setState({ notifications });
  };

  handleCreateNewTicket = async (newTicket) => {
    const ticket = (await Axios.post(`${BASE_URL}/ticket`, newTicket)).data
      .ticket;
    ticket.comments = 0;
    this.setState({
      all: [...this.state.all, ticket],
      editorMode: false,
    });
  };

  handleTicketSingleUpdate = (id, update) => {
    console.log("Dashboard handle single update")
    console.log(update)
    const tickets = [...this.state.all];
    tickets.forEach((ele) => {
      if (ele._id === id) {
        ele[Object.keys(update)[0]] = Object.values(update)[0]
      }
    });
    this.setState({
      all: [...tickets],
      filtered: [...tickets],
    });
  }

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

  render() {
    console.log(this.state.notifications);
    return (
      <div className="ticket">
        <div className="navigation">
          <Navigation ticket={this.state.ticket} />
        </div>
        <div className="ticket-details" id="ticket-shadow">
          <div className="ticket-description">
            <div className="dashboard-title">
              Tickets
              <Button variant="light" onClick={this.toggleDrawer}>
                <NotificationsNoneOutlinedIcon />
              </Button>
            </div>
            {!this.state.editorMode &&
              this.state.all.length &&
              !this.state.viewingTicket && (
                <React.Fragment>
                  <div className="ticket-status">
                    <TicketFilter
                      tickets={this.state.all}
                      filtered={this.state.filtered}
                      clear={this.clearFilters}
                      toggleNewTicketEditor={this.toggleNewTicketEditor}
                      setFiltered={this.setFilteredTickets}
                    />
                  </div>
                  <div className="ticket-content">
                    <TicketContent
                      viewTicket={this.handleViewTicket}
                      tickets={this.state.filtered}
                    />
                  </div>
                </React.Fragment>
              )}
            {this.state.editorMode && !this.state.viewingTicket && (
              <NewTicketEditor
                save={this.handleCreateNewTicket}
                cancel={() => this.toggleNewTicketEditor(false)}
              />
            )}
            {this.state.viewingTicket && (
              <TicketDisscussion
                addTag={this.handleAddTag}
                back={this.handleViewTicket}
                currentUser={this.props.user}
                removeTag={this.handleRemoveTag}
                ticketId={this.state.viewingTicket}
                singleUpdate={this.handleTicketSingleUpdate}
              />
            )}
          </div>
        </div>
        <Drawer
          anchor={"right"}
          open={this.state.notificationDrawer}
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
            {this.state.notifications.map((notification) => (
              <ListItem
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
