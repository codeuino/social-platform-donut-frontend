import React, { Component } from 'react';
import { ListGroup } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  MdSecurity,
  MdLocationOn,
  MdNotifications,
  MdRssFeed,
  MdBlock,
  MdAddToQueue,
  MdLanguage
} from "react-icons/md";
import { FaUserTag } from "react-icons/fa"; 
import "../../../dashboard/navigation/navigation.scss";

function RightNav({ option, iconsSize, active }) {
  return (
    <ListGroup>
          <ListGroup.Item className={active ? "active" : "inactive"}>
            <NavLink to={option} className="link">
              {option === "privacy" && <b><MdSecurity size={iconsSize}/>Security and Privacy</b>}
              {option === "location" &&  <b><MdLocationOn size={iconsSize}/>Location</b> }
              {option === "notification" &&  <b><MdNotifications size={iconsSize}/>Notification</b>}
              {option === "posts" &&  <b><MdRssFeed size={iconsSize}/>Posts</b>}
              {option === "blocked" && <b><MdBlock size={iconsSize}/>Blocked</b>}
              {option === "tagged" &&  <b><FaUserTag size={iconsSize}/>Timeline and Tagged</b>}
              {option === "language" && <b><MdLanguage size={iconsSize}/>Language</b>}
              {option === "link" && <p><b><MdAddToQueue size={iconsSize}/>Apps Integrated</b></p>}
            </NavLink>
          </ListGroup.Item>
    </ListGroup>
  )
}

RightNav.propTypes = {
  option: PropTypes.string,
  iconsSize: PropTypes.number,
  active: PropTypes.bool
}
export default RightNav;