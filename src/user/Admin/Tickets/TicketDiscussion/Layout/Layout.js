import React, { Component } from "react";
import Tags from "./Tags";
import Title from "./Title";
import TicketInfo from "./Info";
import Members from "./Members";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import EditableCard from "./EditableCard";
import Button from "react-bootstrap/Button";
import EditButton from "@material-ui/icons/EditOutlined";
import userIcon2 from "../../../../../assets/images/userIcon2.jpg";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsEditor: false,
      titleEditor: false,
      summaryEditor: false,
      tags: props.ticket.tags,
      title: props.ticket.title,
      summary: props.ticket.shortDescription,
    };
  }

  render() {
    return (
      <div className="discussion">
        <div className="ticket-discussion">
          <div className="discussion">
            <Title
              ticket={this.props.ticket}
              handleBack={this.props.handleBack}
              singleUpdate={this.props.singleUpdate}
              updateTicket={this.props.updateTicket}
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
            singleUpdate={this.props.singleUpdate}
            updateTicket={this.props.updateTicket}
          />
          <EditableCard
            Type="Summary"
            heading="Ticket Summary"
            ticketId={this.props.ticket._id}
            singleUpdate={this.props.singleUpdate}
            updateTicket={this.props.updateTicket}
            data={this.props.ticket.shortDescription}
          />
          <Card className="info-card">
            <div className="info-title">Requester</div>
            <div className="info-details">
              <div className="data-element">
                <Image
                  src={userIcon2}
                  alt="icon"
                  rounded
                  className="profile-img"
                  roundedCircle
                />
                <span className="data-desc">Devesh Verma</span>
              </div>
            </div>
          </Card>
          <Tags
            addTag={this.props.addTag}
            data={this.props.ticket.tags}
            removeTag={this.props.removeTag}
          />
          <Members ticket={this.props.ticket} />
        </div>
      </div>
    );
  }
}

export default Layout;
