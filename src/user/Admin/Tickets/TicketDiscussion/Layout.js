import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import { FaArrowLeft } from "react-icons/fa";
import EditButton from "@material-ui/icons/EditOutlined";
import userIcon2 from "../../../../assets/images/userIcon2.jpg";

class Layout extends Component {
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
          <Card className="info-card">
            <div className="info-title">
              <span>Ticket Summary</span>
              <EditButton />
            </div>
            <div className="info-details">
              <div className="data-element">
                <span className="data-desc">
                  {this.props.ticket.shortDescription}
                </span>
              </div>
            </div>
          </Card>
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
          <Card className="info-card">
            <div className="info-title">
              <span>Tags</span>
              <EditButton />
            </div>
            <div className="info-details">
              <div className="data-element">
                <span className="data-desc">
                  {this.props.ticket.shortDescription}
                </span>
              </div>
            </div>
          </Card>
          <Card className="info-card">
            <div className="info-title">Members</div>
            <div className="info-details">
              <div className="data-element">
                <span className="data-desc">
                  {this.props.ticket.shortDescription}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default Layout;
