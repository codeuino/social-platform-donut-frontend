import React, { Component } from "react";
import "./TicketDashboard.scss";
import Navigation from "../../dashboard/navigation/navigation";
import TicketContent from "./TicketContent";

class TicketDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { ticketState: "all", title: "", type: "All" };
  }

  handleClick = (atrb) => {
    this.setState({
      type: atrb,
    });
  };
  render() {
    const { ticketState, title, type } = this.state;
    return (
      <div className="ticket">
        <div className="navigation">
          <Navigation />
        </div>
        <div className="ticket-details">
          <div className="ticket-sidebar"></div>
          <div className="ticket-description">
            <div className="ticket-status">
              <div className="tabs__container">
                <span className="nav__tab container">
                  <ul className="nav__list__container">
                    <li
                      className={
                        type === "All"
                          ? "nav__single__tab selected"
                          : "nav__single__tab"
                      }
                      onClick={() => this.handleClick("All")}
                    >
                      All Tickets
                    </li>
                    <li
                      className={
                        type === "Open"
                          ? "nav__single__tab selected"
                          : "nav__single__tab"
                      }
                      onClick={() => this.handleClick("Open")}
                    >
                      Open
                    </li>
                    <li
                      className={
                        type === "Pending"
                          ? "nav__single__tab selected"
                          : "nav__single__tab"
                      }
                      onClick={() => this.handleClick("Pending")}
                    >
                      Pending
                    </li>
                    <li
                      className={
                        type === "On Hold"
                          ? "nav__single__tab selected"
                          : "nav__single__tab"
                      }
                      onClick={() => this.handleClick("On Hold")}
                    >
                      On Hold
                    </li>
                    <li
                      className={
                        type === "Solved"
                          ? "nav__single__tab selected"
                          : "nav__single__tab"
                      }
                      onClick={() => this.handleClick("Solved")}
                    >
                      Solved
                    </li>
                    <li
                      className={
                        type === "Closed"
                          ? "nav__single__tab selected"
                          : "nav__single__tab"
                      }
                      onClick={() => this.handleClick("Closed")}
                    >
                      Closed
                    </li>
                  </ul>
                </span>
              </div>
            </div>
            <div className="ticket-content">
              <TicketContent selectedState={this.state.type} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketDashboard;
