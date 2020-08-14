import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import "./navigation.scss";

class Navigation extends Component {

 handleParentView = (item) => {
   this.props.data.changeOption(item);
 }
  render() {
    const { 
      profile, 
      permission, 
      settings, 
      authentication, 
      maintenance,
      activity,
      details
    } = this.props.data.option;
    return (
      <div className="settings__navigation">
        <ListGroup>
          <ListGroup.Item
            className={profile ? "active" : "inactive border__bottom"}
            onClick={() => this.handleParentView("profile")}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                d="M8 1.9C8.27578 1.9 8.54885 1.95432 8.80364 2.05985C9.05842 2.16539 9.28992 2.32007 9.48492 2.51508C9.67993 2.71008 9.83461 2.94158 9.94015 3.19636C10.0457 3.45115 10.1 3.72422 10.1 4C10.1 4.27578 10.0457 4.54885 9.94015 4.80364C9.83461 5.05842 9.67993 5.28992 9.48492 5.48492C9.28992 5.67993 9.05842 5.83461 8.80364 5.94015C8.54885 6.04568 8.27578 6.1 8 6.1C7.44305 6.1 6.9089 5.87875 6.51508 5.48492C6.12125 5.0911 5.9 4.55695 5.9 4C5.9 3.44305 6.12125 2.9089 6.51508 2.51508C6.9089 2.12125 7.44305 1.9 8 1.9ZM8 10.9C10.97 10.9 14.1 12.36 14.1 13V14.1H1.9V13C1.9 12.36 5.03 10.9 8 10.9ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                fill="black"
                fillOpacity="0.5"
                className="path-name"
              />
            </svg>

            <a href="javascript:void(0)" className="link">
              <b className="left__nav__text">Profile</b>
            </a>
          </ListGroup.Item>
          <ListGroup.Item
            className={settings ? "active" : "inactive border__bottom"}
            onClick={() => this.handleParentView("settings")}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                d="M17.4298 10.98C17.4698 10.66 17.4998 10.34 17.4998 9.99999C17.4998 9.65999 17.4698 9.33999 17.4298 9.01999L19.5398 7.36999C19.7298 7.21999 19.7798 6.94999 19.6598 6.72999L17.6598 3.26999C17.6009 3.16681 17.5071 3.088 17.3953 3.04769C17.2836 3.00738 17.1611 3.00819 17.0498 3.04999L14.5598 4.04999C14.0398 3.64999 13.4798 3.31999 12.8698 3.06999L12.4898 0.419986C12.4733 0.302327 12.4144 0.194746 12.3242 0.117422C12.234 0.0400971 12.1186 -0.00165877 11.9998 -1.42462e-05H7.99984C7.74984 -1.42462e-05 7.53984 0.179986 7.50984 0.419986L7.12984 3.06999C6.51984 3.31999 5.95984 3.65999 5.43984 4.04999L2.94984 3.04999C2.89186 3.03032 2.83107 3.02018 2.76984 3.01999C2.59984 3.01999 2.42984 3.10999 2.33984 3.26999L0.339839 6.72999C0.209839 6.94999 0.26984 7.21999 0.45984 7.36999L2.56984 9.01999C2.52984 9.33999 2.49984 9.66999 2.49984 9.99999C2.49984 10.33 2.52984 10.66 2.56984 10.98L0.45984 12.63C0.26984 12.78 0.219839 13.05 0.339839 13.27L2.33984 16.73C2.39879 16.8332 2.49256 16.912 2.60434 16.9523C2.71612 16.9926 2.8386 16.9918 2.94984 16.95L5.43984 15.95C5.95984 16.35 6.51984 16.68 7.12984 16.93L7.50984 19.58C7.53984 19.82 7.74984 20 7.99984 20H11.9998C12.2498 20 12.4598 19.82 12.4898 19.58L12.8698 16.93C13.4798 16.68 14.0398 16.34 14.5598 15.95L17.0498 16.95C17.1098 16.97 17.1698 16.98 17.2298 16.98C17.3998 16.98 17.5698 16.89 17.6598 16.73L19.6598 13.27C19.7798 13.05 19.7298 12.78 19.5398 12.63L17.4298 10.98ZM15.4498 9.26999C15.4898 9.57999 15.4998 9.78999 15.4998 9.99999C15.4998 10.21 15.4798 10.43 15.4498 10.73L15.3098 11.86L16.1998 12.56L17.2798 13.4L16.5798 14.61L15.3098 14.1L14.2698 13.68L13.3698 14.36C12.9398 14.68 12.5298 14.92 12.1198 15.09L11.0598 15.52L10.8998 16.65L10.6998 18H9.29984L9.10984 16.65L8.94984 15.52L7.88984 15.09C7.45984 14.91 7.05984 14.68 6.65984 14.38L5.74984 13.68L4.68984 14.11L3.41984 14.62L2.71984 13.41L3.79984 12.57L4.68984 11.87L4.54984 10.74C4.51984 10.43 4.49984 10.2 4.49984 9.99999C4.49984 9.79999 4.51984 9.56999 4.54984 9.26999L4.68984 8.13999L3.79984 7.43999L2.71984 6.59999L3.41984 5.38999L4.68984 5.89999L5.72984 6.31999L6.62984 5.63999C7.05984 5.31999 7.46984 5.07999 7.87984 4.90999L8.93984 4.47999L9.09984 3.34999L9.29984 1.99999H10.6898L10.8798 3.34999L11.0398 4.47999L12.0998 4.90999C12.5298 5.08999 12.9298 5.31999 13.3298 5.61999L14.2398 6.31999L15.2998 5.88999L16.5698 5.37999L17.2698 6.58999L16.1998 7.43999L15.3098 8.13999L15.4498 9.26999ZM9.99984 5.99999C7.78984 5.99999 5.99984 7.78999 5.99984 9.99999C5.99984 12.21 7.78984 14 9.99984 14C12.2098 14 13.9998 12.21 13.9998 9.99999C13.9998 7.78999 12.2098 5.99999 9.99984 5.99999ZM9.99984 12C8.89984 12 7.99984 11.1 7.99984 9.99999C7.99984 8.89999 8.89984 7.99999 9.99984 7.99999C11.0998 7.99999 11.9998 8.89999 11.9998 9.99999C11.9998 11.1 11.0998 12 9.99984 12Z"
                fill="black"
                fillOpacity="0.5"
                className="path-name"
              />
            </svg>

            <a href="javascript:void(0)" className="link">
              <b id="left__nav__text">Settings</b>
            </a>
          </ListGroup.Item>
          <ListGroup.Item
            className={permission ? "active" : "inactive border__bottom"}
            onClick={() => this.handleParentView("permission")}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                d="M8 16C9.1 16 10 15.1 10 14C10 12.9 9.1 12 8 12C6.9 12 6 12.9 6 14C6 15.1 6.9 16 8 16ZM14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5H4.9C4.9 3.29 6.29 1.9 8 1.9C9.71 1.9 11.1 3.29 11.1 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM14 19H2V9H14V19Z"
                fill="black"
                fillOpacity="0.5"
                className="path-name"
              />
            </svg>

            <a href="javascript:void(0)" className="link">
              <b className="left__nav__text">Permissions</b>
            </a>
          </ListGroup.Item>

          <ListGroup.Item
            className={authentication ? "active" : "inactive border__bottom"}
            onClick={() => this.handleParentView("authentication")}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                d="M22 14H16V10H13.32C12.18 12.42 9.72 14 7 14C3.14 14 0 10.86 0 7C0 3.14 3.14 0 7 0C9.72 0 12.17 1.58 13.32 4H24V10H22V14ZM18 12H20V8H22V6H11.94L11.71 5.33C11.01 3.34 9.11 2 7 2C4.24 2 2 4.24 2 7C2 9.76 4.24 12 7 12C9.11 12 11.01 10.66 11.71 8.67L11.94 8H18V12ZM7 10C5.35 10 4 8.65 4 7C4 5.35 5.35 4 7 4C8.65 4 10 5.35 10 7C10 8.65 8.65 10 7 10ZM7 6C6.45 6 6 6.45 6 7C6 7.55 6.45 8 7 8C7.55 8 8 7.55 8 7C8 6.45 7.55 6 7 6Z"
                fill="black"
                fillOpacity="0.5"
                className="path-name"
              />
            </svg>

            <a href="javascript: void(0)" className="link">
              <b className="left__nav__text">Authentication</b>
            </a>
          </ListGroup.Item>

          <ListGroup.Item
            className={maintenance ? "active" : "inactive border__bottom"}
            onClick={() => this.handleParentView("maintenance")}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                d="M22 14H16V10H13.32C12.18 12.42 9.72 14 7 14C3.14 14 0 10.86 0 7C0 3.14 3.14 0 7 0C9.72 0 12.17 1.58 13.32 4H24V10H22V14ZM18 12H20V8H22V6H11.94L11.71 5.33C11.01 3.34 9.11 2 7 2C4.24 2 2 4.24 2 7C2 9.76 4.24 12 7 12C9.11 12 11.01 10.66 11.71 8.67L11.94 8H18V12ZM7 10C5.35 10 4 8.65 4 7C4 5.35 5.35 4 7 4C8.65 4 10 5.35 10 7C10 8.65 8.65 10 7 10ZM7 6C6.45 6 6 6.45 6 7C6 7.55 6.45 8 7 8C7.55 8 8 7.55 8 7C8 6.45 7.55 6 7 6Z"
                fill="black"
                fillOpacity="0.5"
                className="path-name"
              />
            </svg>

            <a href="javascript: void(0)" className="link">
              <b className="left__nav__text">Maintenance</b>
            </a>
          </ListGroup.Item>
          <ListGroup.Item
            className={activity ? "active" : "inactive border__bottom"}
            onClick={() => this.handleParentView("activity")}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                d="M22 14H16V10H13.32C12.18 12.42 9.72 14 7 14C3.14 14 0 10.86 0 7C0 3.14 3.14 0 7 0C9.72 0 12.17 1.58 13.32 4H24V10H22V14ZM18 12H20V8H22V6H11.94L11.71 5.33C11.01 3.34 9.11 2 7 2C4.24 2 2 4.24 2 7C2 9.76 4.24 12 7 12C9.11 12 11.01 10.66 11.71 8.67L11.94 8H18V12ZM7 10C5.35 10 4 8.65 4 7C4 5.35 5.35 4 7 4C8.65 4 10 5.35 10 7C10 8.65 8.65 10 7 10ZM7 6C6.45 6 6 6.45 6 7C6 7.55 6.45 8 7 8C7.55 8 8 7.55 8 7C8 6.45 7.55 6 7 6Z"
                fill="black"
                fillOpacity="0.5"
                className="path-name"
              />
            </svg>

            <a href="javascript: void(0)" className="link">
              <b className="left__nav__text">Activity</b>
            </a>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

Navigation.propTypes = {
  data: PropTypes.object
};

export default Navigation;
