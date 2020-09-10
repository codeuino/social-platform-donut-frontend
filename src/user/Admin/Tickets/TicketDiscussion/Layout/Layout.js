import React, { Component } from "react";
import Tags from "./Tags";
import Title from "./Title";
import TicketInfo from "./Info";
import Members from "./Members";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import EditableCard from "./EditableCard";
import Tooltip from "@material-ui/core/Tooltip";
import LoadingOverlay from "react-loading-overlay";
import ClockLoader from "react-spinners/ClockLoader";
import { withStyles } from "@material-ui/core/styles";
import userIcon2 from "../../../../../assets/images/userIcon2.jpg";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsEditor: false,
      titleEditor: false,
      summaryEditor: false,
      tags: props.ticket?.tags,
      title: props.ticket?.title,
      summary: props.ticket?.shortDescription,
    };
  }

  render() {
    const HtmlTooltip = withStyles((theme) => ({
      tooltip: {
        backgroundColor: "#ffffff",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
      },
    }))(Tooltip);
    return (
      <LoadingOverlay
        className="discussion"
        active={!!this.props.spinner}
        text={this.props.spinner}
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
        {this.props.ticket && (
          <React.Fragment>
            <div className="ticket-discussion">
              <div className="discussion">
                <Title
                  ticket={this.props.ticket}
                  handleBack={this.props.handleBack}
                  editsAllowed={this.props.editsAllowed}
                  singleUpdate={this.props.singleUpdate}
                  updateTicket={this.props.updateTicket}
                  deleteTicket={this.props.deleteTicket}
                  deleteAllowed={this.props.deleteAllowed}
                />
                <div className="ticket-tabs">
                  <span className="nav__tab container">
                    <ul className="nav__list__container">
                      {[
                        { view: "discussions", opt: "Discussions" },
                        { view: "history", opt: "History" },
                      ].map((ele, index) => (
                        <li
                          key={index}
                          className={
                            this.props.view === ele.view
                              ? "nav__single__tab selected"
                              : "nav__single__tab"
                          }
                          onClick={() => this.props.handleViewChange(ele.view)}
                        >
                          {ele.opt}
                        </li>
                      ))}
                    </ul>
                  </span>
                </div>
                {this.props.children}
              </div>
            </div>
            <div className="ticket-info">
              <TicketInfo
                ticket={this.props.ticket}
                editsAllowed={this.props.editsAllowed}
                singleUpdate={this.props.singleUpdate}
                updateTicket={this.props.updateTicket}
              />
              <EditableCard
                Type="Summary"
                heading="Ticket Summary"
                ticketId={this.props.ticket._id}
                editsAllowed={this.props.editsAllowed}
                singleUpdate={this.props.singleUpdate}
                updateTicket={this.props.updateTicket}
                data={this.props.ticket.shortDescription}
              />
              <Card className="info-card">
                <div className="info-title">Requester</div>
                <div className="info-details">
                  <div className="data-element">
                    <HtmlTooltip
                      placement="top-end"
                      title={
                        <React.Fragment>
                          <div style={{ display: "flex" }}>
                            <Image
                              style={{ margin: "10px" }}
                              src={userIcon2}
                              alt="icon"
                              rounded
                              className="profile-img"
                              roundedCircle
                            />
                            <div
                              style={{
                                fontSize: "13px",
                                fontFamily: "Inter",
                              }}
                            >
                              <strong>
                                {this.props.ticket.createdBy.name}
                              </strong>
                              <div>
                                {this.props.ticket.createdBy.designation}
                              </div>
                              <div>
                                {this.props.ticket.createdBy.location && (
                                  <LocationOnOutlinedIcon />
                                )}
                                {this.props.ticket.createdBy.location}
                              </div>
                              <div>{this.props.ticket.createdBy.email}</div>
                              <div>
                                {this.props.ticket.createdBy.shortDescription}
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      }
                    >
                      <Image
                        src={userIcon2}
                        alt="icon"
                        rounded
                        className="profile-img"
                        roundedCircle
                      />
                    </HtmlTooltip>
                    <span className="data-desc">
                      {this.props.ticket.createdBy.name}
                    </span>
                  </div>
                </div>
              </Card>
              <Tags
                addTag={this.props.addTag}
                data={this.props.ticket.tags}
                removeTag={this.props.removeTag}
                editsAllowed={this.props.editsAllowed}
              />
              <Members ticket={this.props.ticket} />
            </div>
          </React.Fragment>
        )}
      </LoadingOverlay>
    );
  }
}

export default Layout;
