import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./upcoming-events.scss";

class UpcomingEvents extends Component {
  render() {
    return (
      <div className="upcoming-events">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Upcoming Events</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
            </tr>
            <tr>
              <td>2</td>
            </tr>
            <tr>
              <td>3</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default UpcomingEvents;
