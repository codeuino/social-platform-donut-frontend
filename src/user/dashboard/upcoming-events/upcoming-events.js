import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./upcoming-events.scss";
import profileImg from '../../../images/profile-icon.svg';

class UpcomingEvents extends Component {
  render() {
    return (
      <div className="upcoming-events">
        <Table responsive borderless hover>
          <thead>
            <tr>
              <th>Upcoming Events</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="event-container"> 
                  <div className="img-container">
                    <img src={profileImg}></img>
                  </div>
                  <div className="event-description">
                    <h6><b>Julian Richards</b></h6>
                    <p>Lore ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="event-container"> 
                  <div className="img-container">
                    <img src={profileImg}></img>
                  </div>
                  <div className="event-description">
                    <h6><b>Julian Richards</b></h6>
                    <p>Lore ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="event-container"> 
                  <div className="img-container">
                    <img src={profileImg}></img>
                  </div>
                  <div className="event-description">
                    <h6><b>Julian Richards</b></h6>
                    <p>Lore ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="event-container"> 
                  <div className="img-container">
                    <img src={profileImg}></img>
                  </div>
                  <div className="event-description">
                    <h6><b>Julian Richards</b></h6>
                    <p>Lore ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default UpcomingEvents;
