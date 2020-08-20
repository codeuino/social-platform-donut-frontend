import React, { Component } from "react";
import {
  ListGroup,
  Button,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "./TicketSideBar.scss";
import { FaInfoCircle } from "react-icons/fa";

class TicketSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSelection: "all",
    };
  }

  handleActiveSelection = (activeItem) => {
    console.log("ACTIVE CALLED");
    this.setState({
      activeSelection: activeItem,
    });
  };

  render() {
    return (
      <div className="ticket-sidebar">
        <ListGroup className="list-group">
          <ListGroup.Item className="list-group-item-top">
            <span>Tickets</span>
            <Button>New Ticket</Button>
          </ListGroup.Item>

          <ListGroup.Item style={{ marginTop: "15px" }}>
            <Form>
              <Form.Control as="input" placeholder="Search" />
            </Form>
          </ListGroup.Item>
          <ListGroup.Item onClick={() => this.handleActiveSelection("all")}>
            <span
              className={
                this.state.activeSelection === "all"
                  ? "sorting-element-active"
                  : "sorting-element"
              }
            >
              All Tickets
            </span>
          </ListGroup.Item>
          <ListGroup.Item style={{ marginTop: "15px" }}>
            <span className="sorting-title">Statuses</span>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip>
                  Statuses help you stay up to date with your tickets
                </Tooltip>
              }
            >
              <FaInfoCircle className="info-icon" />
            </OverlayTrigger>
          </ListGroup.Item>
          <ListGroup.Item onClick={() => this.handleActiveSelection("open")}>
            <span
              className={
                this.state.activeSelection === "open"
                  ? "sorting-element-active"
                  : "sorting-element"
              }
            >
              Open
            </span>
          </ListGroup.Item>
          <ListGroup.Item onClick={() => this.handleActiveSelection("pending")}>
            <span
              className={
                this.state.activeSelection === "pending"
                  ? "sorting-element-active"
                  : "sorting-element"
              }
            >
              Pending
            </span>
          </ListGroup.Item>
          <ListGroup.Item onClick={() => this.handleActiveSelection("onhold")}>
            <span
              className={
                this.state.activeSelection === "onhold"
                  ? "sorting-element-active"
                  : "sorting-element"
              }
            >
              On Hold
            </span>
          </ListGroup.Item>
          <ListGroup.Item onClick={() => this.handleActiveSelection("solved")}>
            <span
              className={
                this.state.activeSelection === "solved"
                  ? "sorting-element-active"
                  : "sorting-element"
              }
            >
              Solved
            </span>
          </ListGroup.Item>
          <ListGroup.Item onClick={() => this.handleActiveSelection("closed")}>
            <span
              className={
                this.state.activeSelection === "closed"
                  ? "sorting-element-active"
                  : "sorting-element"
              }
            >
              Closed
            </span>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default TicketSideBar;
