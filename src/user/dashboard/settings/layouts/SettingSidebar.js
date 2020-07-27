import React, { Component } from 'react';
import { ListGroup } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  MdSecurity,
  MdLocationOn,
  MdNotifications,
  MdBlock,
  MdLanguage
} from "react-icons/md";

class SettingSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const iconsSize = 40;
    const { privacy, notification, location, blocked, language } = this.props;
    return (
      <div className="settings__navigation mt-4">
        <ListGroup>
          <ListGroup.Item
            className={privacy ? "active" : "inactive border__bottom"}
          >
            <NavLink to="/privacy" className="link">
              <b>
                <MdSecurity size={iconsSize} />
                Security and Privacy
              </b>
            </NavLink>
          </ListGroup.Item>

          <ListGroup.Item
            className={location ? "active" : "inactive border__bottom"}
          >
            <NavLink to="/location" className="link">
              <b>
                <MdLocationOn size={iconsSize} />
                Location
              </b>
            </NavLink>
          </ListGroup.Item>

          <ListGroup.Item
            className={notification ? "active" : "inactive border__bottom"}
          >
            <NavLink to="/notifications" className="link">
              <b>
                <MdNotifications size={iconsSize} />
                Notification
              </b>
            </NavLink>
          </ListGroup.Item>


          <ListGroup.Item className={blocked ? "active" : "inactive"}>
            <NavLink to="/blocked" className="link">
              <b>
                <MdBlock size={iconsSize} />
                Blocked
              </b>
            </NavLink>
          </ListGroup.Item>


          <ListGroup.Item className={language ? "active" : "inactive"}>
            <NavLink to="/tagged" className="link">
              <b>
                <MdLanguage size={iconsSize} />
                Language
              </b>
            </NavLink>
          </ListGroup.Item>

        </ListGroup>
      </div>
    );
  }
}

SettingSidebar.propTypes = {
  privacy: PropTypes.bool,
  location: PropTypes.bool,
  notification: PropTypes.bool,
  posts: PropTypes.bool,
  blocked: PropTypes.bool,
  tagged: PropTypes.bool,
  language: PropTypes.bool
}
export default SettingSidebar;

