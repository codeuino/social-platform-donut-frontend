import React, { Component } from "react";
import "./TicketDashboard.scss";
import Navigation from "../../dashboard/navigation/navigation";
import TicketContent from "./TicketContent/TicketContent";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

class TicketDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "All",
      allTickets: [],
      open: [],
      pending: [],
      onHold: [],
      solved: [],
      closed: [],
    };
  }

  handleSearchBarChange = (e) => {};

  handleClick = (atrb) => {
    this.setState({
      type: atrb,
    });
  };
  render() {
    const { type } = this.state;
    return (
      <div className="ticket">
        <div className="navigation">
          <Navigation />
        </div>
        <div className="ticket-details">
          <div className="ticket-description">
            <div className="dashboard-title">Tickets</div>
            <div className="searchbar-container">
              <div className="searchbar">
                <span class="searchbar-icon">
                  <SearchOutlinedIcon />
                </span>
                <Form>
                  <Form.Control
                    as="input"
                    placeholder="Search Tickets"
                    onChange={this.handleSearchBarChange}
                  />
                </Form>
              </div>
              <Button>New Ticket</Button>
            </div>
            <div className="ticket-status">
              <div className="tabs__container">
                <span className="nav__tab container">
                  <ul className="nav__list__container">
                    {[
                      { type: "All", opt: "All Tickets" },
                      { type: "Open", opt: "Open" },
                      { type: "Pending", opt: "Pending" },
                      { type: "On Hold", opt: "On Hold" },
                      { type: "Solved", opt: "Solved" },
                      { type: "Closed", opt: "Closed" }
                    ].map((ele, index)=><li
                    key={index}
                    className={
                      type === ele.type
                        ? "nav__single__tab selected"
                        : "nav__single__tab"
                    }
                    onClick={() => this.handleClick(ele.type)}
                  >
                    {ele.opt}
                  </li>)}
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
