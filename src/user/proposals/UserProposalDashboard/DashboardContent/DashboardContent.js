import React, { Component } from "react";
import { Button, Form, Image, Pagination } from "react-bootstrap";
import "./DashboardContent.scss";
import userIcon2 from "../../../../assets/images/userIcon2.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getProposalsByUser,
  getAllProposals,
} from "../../../../actions/proposalActions";

class DashboardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("userId"),
      proposals: [],
      displayItems: [0],
      allProposals: [],
      userProposals: [],

      pageCount: 0,
      pageSize: 4,
      currentPage: 0,
    };
  }

  componentDidMount() {
    this.props.getAllProposals();
    this.props.getProposalsByUser(this.state.userId);
  }

  componentWillReceiveProps(nextProps) {
    const { allProposals, userProposals } = nextProps;

    let pageCount = Math.ceil(allProposals.length / this.state.pageSize);

    this.setState({
      allProposals: allProposals,
      userProposals: userProposals,
      displayItems: allProposals,
      pageCount: pageCount,
    });
  }

  handleSearchBarChange = (evt) => {
    const value = evt.target.value.toLowerCase();
    const proposals = this.props.allProposals;
    let results = [];

    if (value.length === 0) {
      this.setState({
        displayItems: proposals,
        pageCount: this.calculatePageCount(proposals.length),
      });
    } else {
      proposals.forEach((item) => {
        if (item.title.toLowerCase().includes(value)) {
          results.push(item);
        }
      });

      this.setState({
        displayItems: results,
        pageCount: this.calculatePageCount(results.length),
      });
    }
  };

  calculatePageCount = (length) => {
    return Math.ceil(length / this.state.pageSize);
  };

  handleButtonClick = (name) => {
    const proposals = this.state.userProposals;
    const allProposals = this.state.allProposals;

    let results = [];
    let pageCount;

    switch (name) {
      case "All":
        this.setState({
          displayItems: allProposals,
          pageCount: this.calculatePageCount(allProposals.length),
        });
        break;
      case "Accepted":
        proposals.forEach((item) => {
          if (item.proposalStatus === "ACCEPTED") {
            results.push(item);
          }
        });
        this.handleStateChange(results)
        break;
      case "Submitted":
        proposals.forEach((item) => {
          if (item.proposalStatus === "SUBMITTED") {
            results.push(item);
          }
        });
        this.handleStateChange(results)
        break;
      case "Draft":
        proposals.forEach((item) => {
          if (item.proposalStatus === "DRAFT") {
            results.push(item);
          }
        });
        this.handleStateChange(results)
        break;
      case "Rejected":
        proposals.forEach((item) => {
          if (item.proposalStatus === "REJECTED") {
            results.push(item);
          }
        });
        this.handleStateChange(results)
        break;
    }
  };

  handleStateChange = (results)=> {
    this.setState({
      displayItems: results,
      pageCount: this.calculatePageCount(results.length),
    });
  }

  handlePaginationClick = (e, index) => {
    e.preventDefault();

    this.setState({
      currentPage: index,
    });
  };

  render() {
    const { currentPage, pageSize, displayItems } = this.state;
    return (
      <div className="dashboard-content">
        <div className="searchbar-container">
          <Form>
            <Form.Control
              as="input"
              placeholder="Search"
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
                  <span className="btn-content">All Proposals</span>
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
            {displayItems
              .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
              .map((proposalItem, index) => {
                return (
                  <div className="single-proposal" key={index}>
                    <div className="user-info">
                      <div className="image">
                        <Image src={userIcon2} alt="icon" rounded />
                      </div>
                      <div className="img-desc">
                        <h2>{proposalItem.title}</h2>
                        <p className="proposal-date">
                          {proposalItem.createdAt}
                        </p>
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
                        {proposalItem.creator === this.state.userId ? (
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
                        ) : null}
                        <Link
                          to={{
                            pathname: "/proposaldiscussion",
                            state: {
                              proposalId: proposalItem._id,
                              isAdmin: false,
                              userId: this.state.userId,
                              isCreator:
                                proposalItem.creator === this.state.userId,
                            },
                          }}
                        >
                          <Button
                            active
                            variant="primary"
                            className="option-btn"
                            size="sm"
                          >
                            <span className="option-text">View</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {this.state.pageCount !== 0 ? (
          <div className="pagination-container">
            <Pagination.Prev
              disabled={currentPage <= 0}
              onClick={(e) => this.handlePaginationClick(e, currentPage - 1)}
              className="pagination-item"
            />

            {[...Array(this.state.pageCount)].map((page, index) => {
              return (
                <Pagination.Item
                  className="pagination-item"
                  active={index === currentPage}
                  onClick={(e) => this.handlePaginationClick(e, index)}
                >
                  {index + 1}
                </Pagination.Item>
              );
            })}

            <Pagination.Next
              disabled={currentPage >= this.state.pageCount - 1}
              onClick={(e) => this.handlePaginationClick(e, currentPage + 1)}
              className="pagination-item"
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allProposals: state.proposal.allProposals,
  userProposals: state.proposal.userProposals,
});

export default connect(mapStateToProps, {
  getProposalsByUser,
  getAllProposals,
})(DashboardContent);
