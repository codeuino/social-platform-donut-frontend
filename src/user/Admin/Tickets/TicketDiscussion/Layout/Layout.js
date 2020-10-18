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
      tags: [],
      title: '',
      summary: '',
      tagsEditor: false,
      titleEditor: false,
      summaryEditor: false,
    };
  }

  componentDidMount() {
    const { ticket } = this.props;
    this.setState({
      tags: ticket?.tags,
      title: ticket?.title,
      summary: ticket?.shortDescription,
    })
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
    const {
      view,
      addTag,
      ticket,
      spinner,
      removeTag,
      handleBack,
      editsAllowed,
      singleUpdate,
      updateTicket,
      deleteTicket,
      deleteAllowed,
      handleViewChange,
    } = this.props;
    return (
      <LoadingOverlay
        className="discussion"
        active={!!spinner}
        text={spinner}
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
        {ticket && (
          <React.Fragment>
            <div className="ticket-discussion">
              <div className="discussion">
                <Title
                  ticket={ticket}
                  handleBack={handleBack}
                  editsAllowed={editsAllowed}
                  singleUpdate={singleUpdate}
                  updateTicket={updateTicket}
                  deleteTicket={deleteTicket}
                  deleteAllowed={deleteAllowed}
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
                            view === ele.view
                              ? "nav__single__tab selected"
                              : "nav__single__tab"
                          }
                          onClick={() => handleViewChange(ele.view)}
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
                ticket={ticket}
                editsAllowed={editsAllowed}
                singleUpdate={singleUpdate}
                updateTicket={updateTicket}
              />
              <EditableCard
                Type="Summary"
                heading="Ticket Summary"
                ticketId={ticket._id}
                editsAllowed={editsAllowed}
                singleUpdate={singleUpdate}
                updateTicket={updateTicket}
                data={ticket.shortDescription}
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
                              <strong>{ticket.createdBy.name}</strong>
                              <div>{ticket.createdBy.designation}</div>
                              <div>
                                {ticket.createdBy.location && (
                                  <LocationOnOutlinedIcon />
                                )}
                                {ticket.createdBy.location}
                              </div>
                              <div>{ticket.createdBy.email}</div>
                              <div>{ticket.createdBy.shortDescription}</div>
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
                    <span className="data-desc">{ticket.createdBy.name}</span>
                  </div>
                </div>
              </Card>
              <Tags
                addTag={addTag}
                data={ticket.tags}
                removeTag={removeTag}
                editsAllowed={editsAllowed}
              />
              <Members ticket={ticket} />
            </div>
          </React.Fragment>
        )}
      </LoadingOverlay>
    );
  }
}

export default Layout;
