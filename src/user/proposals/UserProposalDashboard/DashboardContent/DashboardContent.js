import React, { Component } from "react";
import { Button, Form, Col, Image } from "react-bootstrap";
import "./DashboardContent.scss";
import userIcon2 from "../../../../images/userIcon2.jpg";
import { Link } from "react-router-dom";

class DashboardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRjYjE4ZjIxNWRhNzRjMThkM2YyNzQiLCJpYXQiOjE1OTE1MjE2Nzl9.q3g5Ah_rtjPIrH7z183fVmUBTv_A4OjEoL673zeG250",
      userId: "5edcb18f215da74c18d3f274",
      proposals: [],
      displayItems: [],
    };
  }

  componentDidMount() {
    this.getProposalsByUserId();
  }

  getProposalsByUserId() {
    fetch(`http://localhost:5000/proposal/user/${this.state.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          proposals: resData.proposal,
          displayItems: resData.proposal,
        });
      });
  }

  handleSearchBarChange = (evt) => {
    const value = evt.target.value.toLowerCase();
    const proposals = this.state.proposals;
    let results = [];

    if (value.length === 0) {
      this.setState({
        displayItems: proposals,
      });
    } else {
      proposals.forEach((item) => {
        if (item.title.toLowerCase().includes(value)) {
          results.push(item);
        }
      });

      this.setState({
        displayItems: results,
      });
    }
  };

  handleButtonClick = (name) => {
    const proposals = this.state.proposals;
    let results = [];

    switch (name) {
      case "All":
        this.setState({
          displayItems: proposals,
        });
        break;
      case "Accepted":
        proposals.forEach((item) => {
          if (item.proposalStatus === "ACCEPTED") {
            results.push(item);
          }
        });
        this.setState({
          displayItems: results,
        });
        break;
      case "Submitted":
        proposals.forEach((item) => {
          if (item.proposalStatus === "SUBMITTED") {
            results.push(item);
          }
        });
        this.setState({
          displayItems: results,
        });
        break;
      case "Draft":
        proposals.forEach((item) => {
          if (item.proposalStatus === "DRAFT") {
            results.push(item);
          }
        });
        this.setState({
          displayItems: results,
        });
        break;
      case "Rejected":
        proposals.forEach((item) => {
          if (item.proposalStatus === "REJECTED") {
            results.push(item);
          }
        });
        this.setState({
          displayItems: results,
        });
        break;
    }
  };

  render() {
    return (
      <div className="dashboard-content">
        <div className="searchbar-container">
          <Form>
            <Form.Control
              as="input"
              placeholder="search"
              className="searchbar"
              onChange={this.handleSearchBarChange}
            />
          </Form>
          <div className="dashboard-title">
            <span className="title-text">Proposals</span>
          </div>
          <div className="button-container">
            <div className="posts">
              <div className="category">
                <Button
                  name="All"
                  variant="primary"
                  className="category-btn"
                  onClick={() => this.handleButtonClick("All")}
                >
                  <span className="btn-content">All</span>
                </Button>
                <span className="space"></span>
                <Button
                  variant="primary"
                  className="category-btn"
                  name="Accepted"
                  onClick={() => this.handleButtonClick("Accepted")}
                >
                  <span className="btn-content">Accepted</span>
                </Button>
                <span className="space"></span>
                <Button
                  variant="primary"
                  className="category-btn"
                  onClick={() => this.handleButtonClick("Submitted")}
                >
                  <span className="btn-content">Submitted</span>
                </Button>
                <span className="space"></span>
                <Button
                  variant="primary"
                  className="category-btn"
                  onClick={() => this.handleButtonClick("Draft")}
                >
                  <span className="btn-content">Draft</span>
                </Button>
                <Button
                  variant="primary"
                  className="category-btn"
                  onClick={() => this.handleButtonClick("Rejected")}
                >
                  <span className="btn-content">Rejected</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="proposal-container">
          <div className="proposals">
            {this.state.displayItems.map((proposalItem, index) => {
              return (
                <div className="single-proposal" key={index}>
                  <div className="user-info">
                    <div className="image">
                      <Image src={userIcon2} alt="icon" rounded />
                    </div>
                    <div className="img-desc">
                      <h2>{proposalItem.title}</h2>
                      <p className="proposal-date">{proposalItem.createdAt}</p>
                    </div>
                    {proposalItem.proposalStatus === "DRAFT" ? (
                      <Button
                        variant="primary"
                        className="status-btn"
                        size="sm"
                      >
                        <span className="btn-content">
                          {proposalItem.proposalStatus}
                        </span>
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        className="status-btn-submitted"
                        size="sm"
                      >
                        <span className="btn-content">
                          {proposalItem.proposalStatus}
                        </span>
                      </Button>
                    )}
                  </div>
                  <div className="proposal-content">
                    <div className="proposal-details">
                      {proposalItem.proposalDescription}
                    </div>
                    <div className="proposal-options">
                      <Link
                        to={{
                          pathname: "/proposaleditor",
                          state: {
                            proposalId: proposalItem._id,
                          },
                        }}
                      >
                        <Button
                          variant="primary"
                          className="option-btn"
                          size="sm"
                        >
                          <span className="option-text">Edit</span>
                        </Button>
                      </Link>
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
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardContent;
