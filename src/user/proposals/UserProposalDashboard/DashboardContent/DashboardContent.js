import React, { Component } from "react";
import { Button, Form, Col, Image } from "react-bootstrap";
import "./DashboardContent.scss";
import userIcon2 from "../../../../images/userIcon2.jpg";

class DashboardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="dashboard-content">
        <div className="searchbar-container">
          <Form>
            <Form.Control
              as="input"
              placeholder="search"
              className="searchbar"
            />
          </Form>
          <div className="dashboard-title">
            <span className="title-text">Proposals</span>
          </div>
          <div className="button-container">
            <div className="posts">
              <div className="category">
                <Button variant="primary" className="category-btn">
                  <span className="btn-content">All</span>
                </Button>
                <span className="space"></span>
                <Button variant="primary" className="category-btn">
                  <span className="btn-content">Accepted</span>
                </Button>
                <span className="space"></span>
                <Button variant="primary" className="category-btn">
                  <span className="btn-content">Under Review</span>
                </Button>
                <span className="space"></span>
                <Button variant="primary" className="category-btn">
                  <span className="btn-content">Drafts</span>
                </Button>
                <Button variant="primary" className="category-btn">
                  <span className="btn-content">Rejected</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="proposal-container">
          <div className="proposals">
            <div className="single-proposal">
              <div className="user-info">
                <div className="image">
                  <Image src={userIcon2} alt="icon" rounded />
                </div>
                <div className="img-desc">
                  <h2>Sample Proposal</h2>
                  <p className="proposal-date">June 5, 2018 4:31 AM</p>
                </div>
                <Button variant="primary" className="status-btn" size="sm">
                  <span className="btn-content">Draft</span>
                </Button>
              </div>
              <div className="proposal-content">
                <div className="proposal-details">
                  ex sit ex laboris adipisicing enim eiusmod proident
                  exercitation ea fugiat in llit pariatur occaecat ut nostrud
                  ullamco ex official ex sit ex laboris adipisicing enim eiusmod
                  proident exercitation ea...
                </div>
                <div className="proposal-options">
                  <Button variant="primary" className="option-btn" size="sm">
                    <span className="option-text">Edit</span>
                  </Button>
                  <Button
                    variant="primary"
                    className="option-btn"
                    size="sm"
                    active
                  >
                    <span className="option-text">View</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardContent;
