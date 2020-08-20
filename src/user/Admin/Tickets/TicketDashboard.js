import React, { Component } from "react";
import "./TicketDashboard.scss";
import Navigation from "../../dashboard/navigation/navigation";
import TicketSideBar from "./TicketSideBar";
import TicketContent from "./TicketContent";

class TicketDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { ticketState: "all", title: "" };
  }
  render() {
    const { ticketState, title } = this.state;
    return (
      <div className="ticket">
        <div className="navigation">
          <Navigation />
        </div>
        <div className="ticket-details">
          <div className="ticket-sidebar">
            <TicketSideBar />
          </div>
          <div className="ticket-description">
            <div className="ticket-status">
              {ticketState === "all" && (
                <span className="ticket-status-text">All Tickets</span>
              )}
              {ticketState === "open" && (
                <span className="ticket-status-text">Open Tickets</span>
              )}
              {ticketState === "pending" && (
                <span className="ticket-status-text">Pending Tickets</span>
              )}
              {ticketState === "onhold" && (
                <span className="ticket-status-text">On Hold Tickets</span>
              )}
              {ticketState === "solved" && (
                <span className="ticket-status-text">Solved Tickets</span>
              )}
              {ticketState === "closed" && (
                <span className="ticket-status-text">Closed Tickets</span>
              )}
              {ticketState === "selected" && (
                <span className="ticket-status-text">{title}</span>
              )}
            </div>
            <div className="ticket-content">
              <TicketContent />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketDashboard;
