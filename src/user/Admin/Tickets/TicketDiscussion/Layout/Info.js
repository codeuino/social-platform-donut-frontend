import React, { Component } from "react";
import Moment from "react-moment";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import EditButton from "@material-ui/icons/EditOutlined";
import SaveButton from "@material-ui/icons/SaveOutlined";
import DropdownButton from "react-bootstrap/DropdownButton";
import CancelButton from "@material-ui/icons/ClearOutlined";
import BadgeElement from "../../TicketContent/BadgeElement";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.ticket.status,
    };
  }

  setSelected = (selected) => {
    this.setState({ selected });
  };

  resetSelection = () => {
    this.setState({
      selected: this.props.ticket.status,
    });
  };

  save = async () => {
    const { selected } = this.state;
    await this.props.updateTicket({
      type: "status",
      status: selected,
    });
    this.props.singleUpdate(this.props.ticket._id, {
      status: selected,
    });
  };

  render() {
    const { selected } = this.state;
    return (
      <Card className="info-card">
        <div className="info-title">
          <span>Ticket Info</span>
          {selected !== this.props.ticket.status && (
            <div className="buttons">
              <CancelButton
                style={{ marginRight: "10px" }}
                onClick={this.resetSelection}
              />
              <SaveButton onClick={this.save} />
            </div>
          )}
        </div>
        <div className="info-details">
          <div className="data-element">
            <span className="data-title">Ticket ID: </span>
            <span className="data-desc">{this.props.ticket.number}</span>
          </div>
          <div className="data-element">
            <span className="data-title">Created: </span>
            <span className="data-desc">
              <Moment format="DD MMM YYYY, h:mm a">
                {this.props.ticket.createdAt}
              </Moment>
            </span>
          </div>
          <div className="data-element">
            <span className="data-title">Last Updated:</span>
            <span className="data-desc">
              <Moment format="DD MMM YYYY, h:mm a">
                {this.props.ticket.updatedAt}
              </Moment>
            </span>
          </div>
          <div className="data-element" style={{ display: "flex" }}>
            <span className="data-title">Status:</span>
            <span className="data-desc">
              {this.props.editsAllowed ? (
                <DropdownButton
                  variant="light"
                  title={<BadgeElement ticketState={selected} />}
                  size="sm"
                >
                  {["OPEN", "CLOSED", "PENDING", "SOLVED", "ON_HOLD"].map(
                    (ele, index) => (
                      <Dropdown.Item
                        key={index}
                        style={{ display: "flex" }}
                        onClick={() => this.setSelected(ele)}
                      >
                        {
                          <CheckOutlinedIcon
                            style={{
                              color:
                                ele === selected
                                  ? "rgba(0, 0, 0, 0.5)"
                                  : "#ffffff",
                            }}
                          />
                        }
                        <BadgeElement ticketState={ele} />
                      </Dropdown.Item>
                    )
                  )}
                </DropdownButton>
              ) : (
                <BadgeElement ticketState={this.props.ticket.status} />
              )}
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default Info;
