import React, { Component } from "react";
import Tags from "./Tags";
import Members from "./Members";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import EditableCard from "./EditableCard";
import Button from "react-bootstrap/Button";
import { FaArrowLeft } from "react-icons/fa";
import Typography from "@material-ui/core/Typography";
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
            <div className="discussion-title">
              <div className="back-icon" onClick={this.props.handleBack}>
                <FaArrowLeft className="fa-icon" />
              </div>
              <div className="ticket-title">
                <span className="title-text">{this.props.ticket.title}</span>
              </div>
            </div>
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
          <Card className="info-card">
            <div className="info-title">Ticket Info</div>
            <div className="info-details">
              <div className="data-element">
                <span className="data-title">Ticket ID </span>
                <span className="data-desc">9SUQb28020N</span>
              </div>
              <div className="data-element">
                <span className="data-title">Created </span>
                <span className="data-desc">23 Aug 2020</span>
              </div>
              <div className="data-element">
                <span className="data-title">Last Message</span>
                <span className="data-desc">24 Aug 2020</span>
              </div>
              <div className="data-element">
                <span className="data-title">Status</span>
                <span className="data-desc">
                  <Badge pill variant="primary">
                    Open
                  </Badge>
                </span>
              </div>
            </div>
          </Card>
          <EditableCard
            Type="Summary"
            heading="Ticket Summary"
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
