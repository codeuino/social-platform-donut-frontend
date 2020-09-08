import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import React, { Component } from "react";
import { FaPlus, FaUser, FaTicketAlt } from "react-icons/fa";
import NewTicket from "../popups/NewTicket";

class FloatingActionButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayNewTicket: false,
    };
  }
  mainButtonStyles = {
    backgroundColor: "#1A73E8",
  };

  position = {
    bottom: 0,
    right: 0,
  };

  actionButtonStyles = {
    backgroundColor: "blue",
  };

  showNewTicket = () => {
    this.setState({ displayNewTicket: true });
  };

  onHide = () => {
    this.setState({
      displayNewTicket: false,
    });
  };

  render() {
    const { displayNewTicket } = this.state;
    return (
      <>
        <NewTicket show={displayNewTicket} onHide={this.onHide} />
        <Fab
          mainButtonStyles={this.mainButtonStyles}
          actionButtonStyles={this.actionButtonStyles}
          position={this.position}
          icon={<FaTicketAlt />}
          event={"click"}
        >
          <Action text="My Tickets">
            <FaUser />
          </Action>
          <Action text="New Ticket" onClick={this.showNewTicket}>
            <FaPlus />
          </Action>
        </Fab>
      </>
    );
  }
}

export default FloatingActionButton;
