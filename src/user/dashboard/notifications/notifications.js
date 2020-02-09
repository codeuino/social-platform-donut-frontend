import React, { Component } from "react";
import { Table } from "react-bootstrap";
import "./notifications.scss";
import donutIcon from '../../../images/donut-icon.svg'
import icon2 from '../../../images/not-icon-2.svg'
import icon3 from '../../../images/not-icon-3.svg'

class Notifications extends Component {
  render() {
    return (
      <div className="notifications">
        <Table responsive borderless hover>
          <thead>
            <tr>
              <th>Notifications</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="notification-container"> 
                  <div className="notification-img-container">
                    <img src={donutIcon}></img>
                  </div>
                  <div className="notification-description">
                    <h6><b>Julian Richards</b></h6>
                    <p>Lore ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="notification-container"> 
                  <div className="notification-img-container">
                    <img src={icon2}></img>
                  </div>
                  <div className="notification-description">
                    <h6><b>Julian Richards</b></h6>
                    <p>Lore ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="notification-container"> 
                  <div className="notification-img-container">
                    <img src={icon3}></img>
                  </div>
                  <div className="notification-description">
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

export default Notifications;
