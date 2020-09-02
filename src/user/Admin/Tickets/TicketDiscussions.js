import React, { Component } from "react";
import "./TicketDiscussion.scss";
import Navigation from "../../dashboard/navigation/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import userIcon2 from "../../../assets/images/userIcon2.jpg";
import { Image, Card, Badge } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";

class TicketDiscussions extends Component {
  constructor(props) {
    super(props);
    this.state = { ticket: props?.ticket };
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.scrollToBottom();
    }, 2000);
  }

  componentDidUpdate() {
    this.timeout = setTimeout(() => {
      this.scrollToBottom();
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: "smooth" });
  }
  render() {
    return (
      <>
        <div className="discussion">
          <div className="navigation">
            <Navigation />
          </div>
          <div className="ticket-discussion">
            <div className="discussion">
              <div className="discussion-title">
                <Link to="/tickets">
                  <div className="back-icon">
                    <FaArrowLeft className="fa-icon" />
                  </div>
                </Link>
                <div className="ticket-title">
                  <span className="title-text">Title of Ticket Here!</span>
                </div>
              </div>
              <div className="discussion-comments">
                <div className="discussions">
                  {[1, 2, 3, 4].map((ele, index) => <div key={index} className="single-discussion">
                    <div className="user-info">
                      <div className="image">
                        <Image src={userIcon2} alt="icon" rounded />
                      </div>
                      <div className="img-desc">
                        <h2>Devesh Verma</h2>
                        <p className="discussion-date">2020-08-24</p>
                      </div>
                    </div>
                    <div className="comment-content">
                      <div className="comment-details">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </div>
                    </div>
                  </div>)}
                </div>
                <div
                  ref={(el) => {
                    this.el = el;
                  }}
                />
              </div>
              <div className="discussion-editor">
                <Editor
                  apiKey="lvp9xf6bvvm3nkaupm67ffzf50ve8femuaztgg7rkgkmsws3"
                  value={this.state.markdownString}
                  initialValue="<p>This is the initial content of the editor</p>"
                  init={{
                    height: "100%",
                    width: "100%",
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                      "textpattern",
                    ]
                  }}
                />
              </div>
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
                <div className="data-element">
                  <span className="data-title">Ticket ID </span>
                  <span className="data-desc">001</span>
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
              <div className="info-title">Administrators</div>
              <div className="info-details">
                <div className="data-element">
                  <Image
                    src={userIcon2}
                    alt="icon"
                    rounded
                    className="profile-img"
                    roundedCircle
                  />
                  <span className="data-desc">Jaskirat Singh</span>
                </div>
                <div className="data-element">
                  <Image
                    src={userIcon2}
                    alt="icon"
                    rounded
                    className="profile-img"
                    roundedCircle
                  />
                  <span className="data-desc">Vaibhav Aren</span>
                </div>
              </div>
            </Card>
            <Card className="info-card">
              <div className="info-title">Requester's other tickets</div>
              <div className="info-details">
                <div className="data-element">
                  <span className="data-desc">
                    <Badge pill variant="primary">
                      Open
                    </Badge>
                  </span>
                  <span className="data-desc">
                    Requirement for a third party integration
                  </span>
                </div>
                <div className="data-element">
                  <span className="data-desc">
                    <Badge pill variant="primary">
                      Closed
                    </Badge>
                  </span>
                  <span className="data-desc">Google Calendar integration</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </>
    );
  }
}

export default TicketDiscussions;
