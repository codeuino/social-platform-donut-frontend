import React, { Component } from "react";
import "./Filter.scss";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import LoadingOverlay from "react-loading-overlay";
import ClockLoader from "react-spinners/ClockLoader";
import { BASE_URL } from "../../../../actions/baseApi";
import { ToastContainer, toast } from "react-toastify";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import userIcon2 from "../../../../assets/images/userIcon2.jpg";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

// Author, tags and status are the three filters that we want
// only one author can be selected at a time, clicking on a different authoir will unclick the first author
// implement search bar in author filter
// implement

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: null,
      modal: null,
      status: [],
      spinner: "",
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
    console.log(this.state.tags);
    if (this.state.tags.length) {
      filtered = filtered.filter((ele) =>
        this.state.tags.some((tag) => ele.tags.indexOf(tag) !== -1)
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
      this.setState(
        {
          tags: [...this.state.tags, tag],
        },
        this.filter
      );
    } else {
      this.setState(
        {
          tags: [...this.state.tags.filter((ele) => ele !== tag)],
        },
        this.filter
      );
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
        status: [],
        tags: [],
      },
      this.props.clear
    );
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  getUsers = async () => {
    try {
      const users = (await Axios.get(`${BASE_URL}/ticket/users/all`)).data
        .users;
      this.setState({ users });
    } catch (err) {
      console.log(err);
    }
  };

  handleViewChange = (view) => {
    this.setState({ modal: { view } });
  };

  componentDidMount() {
    if (localStorage.getItem("admin") === "true") {
      this.getUsers();
    }
  }

  addModerator = (userId) => {
    this.setState(
      {
        spinner: "Adding user as Moderator...",
      },
      async () => {
        try {
          this.setState({
            users: (await Axios.post(`${BASE_URL}/ticket/moderator/${userId}`))
              .data.users,
            spinner: "",
          });
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong! Could not add user as Moderator")
          this.setState({spinner: ""})
        }
      }
    );
  };

  removeModerator = (userId) => {
    this.setState(
      {
        spinner: "Adding user as Moderator...",
      },
      async () => {
        try {
          this.setState({
            users: (
              await Axios.delete(`${BASE_URL}/ticket/moderator/${userId}`)
            ).data.users,
            spinner: "",
          });
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong! Could not remove user as Moderator")
          this.setState({spinner: ""})
        }
      }
    );
  };

  render() {
    const userInfo = (ele) => (
      <div className="user-info">
        <div style={{ display: "flex" }}>
          <Image
            style={{ margin: "10px" }}
            src={userIcon2}
            alt="icon"
            rounded
            className="profile-img"
            roundedCircle
          />
          <div style={{ fontSize: "13px", fontFamily: "Inter" }}>
            <strong>{`${ele.name.firstName} ${ele.name.lastName}`}</strong>
            <div>{ele.info.about.designation}</div>
            <div>
              {ele.info.about.location && <LocationOnOutlinedIcon />}
              {ele.info.about.location}
            </div>
            <div>{ele.email}</div>
            <div>{ele.info.about.shortDescription}</div>
          </div>
        </div>
      </div>
    );
    // console.log(this.state.allAuthors);
    const allStatus = [
      { label: "Open", status: "OPEN" },
      { label: "Closed", status: "CLOSED" },
      { label: "Pending", status: "PENDING" },
      { label: "Solved", status: "SOLVED" },
      { label: "On Hold", status: "ON_HOLD" },
    ];
    const isAdmin = localStorage.getItem("admin") === "true";
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
          <Button onClick={() => this.props.toggleNewTicketEditor(true)}>
            New Ticket
          </Button>
          {isAdmin && (
            <Button
              style={{ marginLeft: "1rem" }}
              onClick={() => this.setState({ modal: { view: "add" } })}
            >
              <PeopleAltIcon />
            </Button>
          )}
        </div>
        <div className="filters">
          <div onClick={this.clearFilters} className="clear-filters">
            {this.state.search
              ? "Clear Search and Filters"
              : this.state.author ||
                this.state.tags.length ||
                this.state.status.length ||
                this.state.tags.length
              ? "Clear Filters"
              : ""}
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
          <Dropdown size="sm" alignRight>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              Tags
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {this.state.allTags.map((ele, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => this.handleTagsChange(ele)}
                >
                  {this.state.tags.indexOf(ele) !== -1 && <CheckOutlinedIcon />}
                  {ele}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {this.state.modal && (
          <Modal
            centered
            className="modal"
            show={!!this.state.modal}
            onHide={this.toggleModal}
          >
            <LoadingOverlay
              className="discussion"
              active={!!this.state.spinner}
              text={this.state.spinner}
              spinner={<ClockLoader color={"#1A73E8"} />}
              styles={{
                spinner: (base) => ({
                  ...base,
                  width: "100px",
                  "& svg circle": {
                    stroke: "rgba(26, 115, 232, 0.5)",
                  },
                }),
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Manage Moderators</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ height: "500px", overflowY: "scroll" }}>
                <div className="ticket-tabs">
                  <span className="nav__tab container">
                    <ul className="nav__list__container">
                      {[
                        { view: "add", opt: "Add" },
                        { view: "remove", opt: "Remove" },
                      ].map((ele, index) => (
                        <li
                          key={index}
                          className={
                            this.state.modal.view === ele.view
                              ? "nav__single__tab selected"
                              : "nav__single__tab"
                          }
                          onClick={() => this.handleViewChange(ele.view)}
                        >
                          {ele.opt}
                        </li>
                      ))}
                    </ul>
                  </span>
                </div>
                {this.state.modal.view === "add" &&
                  this.state.users
                    ?.filter((ele) => !ele.isTicketsModerator)
                    .map((ele, index) => (
                      <div key={index}>
                        <div className="moderator-modal-user">
                          {userInfo(ele)}
                          <Button
                            style={{ marginLeft: "16px" }}
                            onClick={() =>
                              this.addModerator(ele._id.toString())
                            }
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    ))}
                {this.state.modal.view === "remove" &&
                  this.state.users?.map((ele, index) => (
                    <div key={index}>
                      {ele.isTicketsModerator && (
                        <div className="moderator-modal-user">
                          {userInfo(ele)}
                          <Button
                            style={{ marginLeft: "16px" }}
                            onClick={() =>
                              this.removeModerator(ele._id.toString())
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
              </Modal.Body>
            </LoadingOverlay>
          </Modal>
        )}
        <ToastContainer
          draggable
          rtl={false}
          pauseOnHover
          closeOnClick
          autoClose={5000}
          pauseOnFocusLoss
          newestOnTop={false}
          position="top-right"
          hideProgressBar={false}
        />
      </div>
    );
  }
}

export default Filter;
