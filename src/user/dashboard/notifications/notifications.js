import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./notifications.scss";

class Notifications extends Component {
  render() {
    return (
      <div className="notifications">
        <Table bordered hover>
          <thead>
            <tr>
              <th>Notifications</th>
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

export default Notifications;
