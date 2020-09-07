import React, { Component } from "react";
import "./Filter.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

// Author, tags and status are the three filters that we want
// only one author can be selected at a time, clicking on a different authoir will unclick the first author
// implement search bar in author filter
// implement

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: null,
      status: [],
      tags: [],
      search: "",
      allTags: Array.from(
        new Set(
          props.tickets.reduce(
            (acc, curr) => [...acc, ...(curr.tags || [])],
            []
          )
        )
      ),
      allAuthors: Array.from(
        new Set(
          props.tickets.map((ticket) =>
            JSON.stringify({
              id: ticket.createdBy.id,
              name: ticket.createdBy.name,
            })
          )
        )
      ),
      tickets: props.tickets,
    };
    this.allTickets = props.tickets;
  }

  filter = (remove) => {
    let filtered = this.props.tickets;
    if (this.state.search) {
      filtered = filtered.filter(
        (ele) => ele.title.toLowerCase().indexOf(this.state.search) !== -1
      );
    }
    if (this.state.author) {
      filtered = filtered.filter(
        (ele) => this.state.author === JSON.stringify(ele.createdBy)
      );
    }
    if (this.state.status.length) {
      filtered = filtered.filter(
        (ele) => this.state.status.indexOf(ele.status) !== -1
      );
    }
    console.log(filtered);
    this.props.setFiltered(filtered);
  };

  handleSearchBarChange = (evt) => {
    const currentValue = evt.target.value;
    this.setState(
      {
        search: currentValue,
      },
      this.filter
    );
  };

  handleAuthorChange = (author) => {
    if (author === this.state.author) {
      console.log("Same author clicked twice");
      this.setState({ author: null }, this.filter);
    } else {
      this.setState({ author: author }, this.filter);
    }
  };

  handleTagsChange = (tag) => {
    // in not present then add if already present then clicking on it will remove it
    if (this.state.tags.indexOf(tag) === -1) {
      this.setState({
        tags: [...this.state.tags, tag],
      });
    } else {
      this.setState({
        tags: [...this.state.tags.filter((ele) => ele === tag)],
      });
    }
  };

  handleStatusChange = (status) => {
    // in not present then add if already present then clicking on it will remove it
    if (this.state.status.indexOf(status) === -1) {
      this.setState(
        {
          status: [...this.state.status, status],
        },
        this.filter
      );
    } else {
      this.setState(
        {
          status: [...this.state.status.filter((ele) => ele !== status)],
        },
        this.filter
      );
    }
  };

  clearFilters = () => {
    this.setState(
      {
        search: "",
        author: null,
        status: ["OPEN", "CLOSED", "PENDING", "SOLVED", "ON_HOLD"],
      },
      this.props.clear
    );
  };

  componentDidMount() {
    // fetch all labels and all
  }

  render() {
    // console.log(this.state.allAuthors);
    const allStatus = [
      { label: "Open", status: "OPEN" },
      { label: "Closed", status: "CLOSED" },
      { label: "Pending", status: "PENDING" },
      { label: "Solved", status: "SOLVED" },
      { label: "On Hold", status: "ON_HOLD" },
    ];
    return (
      <div className="tickets-dashboard-filter">
        <div className="searchbar-container">
          <div className="searchbar">
            <span className="searchbar-icon">
              <SearchOutlinedIcon />
            </span>
            <Form>
              <Form.Control
                as="input"
                value={this.state.search}
                placeholder="Search Tickets"
                onChange={this.handleSearchBarChange}
              />
            </Form>
          </div>
          <Button onClick={() => this.toggleNewTicketEditor(true)}>
            New Ticket
          </Button>
        </div>
        <div className="filters">
          <div onClick={this.clearFilters} className="clear-filters">
            {this.state.search
              ? "Clear Search and Filters"
              : (!this.state.author ||
                  !this.state.tags.length ||
                  !this.state.status.length) &&
                "Clear Filters"}
          </div>
          <Dropdown size="sm" alignRight>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Authors
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {this.state.allAuthors.map((ele, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => this.handleAuthorChange(ele)}
                >
                  {this.state.author === ele && <CheckOutlinedIcon />}
                  {JSON.parse(ele).name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown size="sm" alignRight>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Status
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {allStatus.map((ele, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => this.handleStatusChange(ele.status)}
                >
                  {this.state.status.indexOf(ele.status) !== -1 && (
                    <CheckOutlinedIcon />
                  )}
                  {ele.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default Filter;
