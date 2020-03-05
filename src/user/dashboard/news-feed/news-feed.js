import React, { Component} from "react";
import { Button , Dropdown, Modal, Form, Col} from "react-bootstrap";
import "./news-feed.scss";
import upVoteImg from "../../../svgs/up.svg";
import downVoteImg from "../../../svgs/down.svg";
import commentIcon from "../../../svgs/comment.svg";
import feed from "../../../jsonData/news-feed";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {children}
        </ul>
      </div>
    );
  },
);


class NewsFeed extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       date : new Date(),
       show : false
    }
  }
  
  

  handleClose = () => {
    this.setState({
      show: false
    })
  };
  
  handleShow = () => {
    this.setState({
      show: true
    })
  }
  render() {
    const borderStyle = {
      borderBottom: "0 none"
    }
    var content; 
    let newsFeed = feed.map((newsItem, i)=>{
      if(newsItem.type === "Project"){
        content = (
          newsItem.eventImage ? 
          <div className="project-image-container">
            <img src = {newsItem.eventImage}/>
            <div className="project-jumbotron">
              <div className="project-details">
                <h3>{newsItem.projectName}</h3>
                <p>By {newsItem.projectOwner}</p>
                <div className="view-project-btn-container">
                  <Button className="view-project-btn text-center">View Project</Button>
                </div>
              </div>
            </div>
          </div>
          : 
          <div></div>
        )
      }else if(newsItem.type === "Event"){
        content = (
          newsItem.eventImage ? 
          <div className="event-image-container">
            <img src = {newsItem.eventImage}/>
            <div className="event-jumbotron">
              <div className="event-details">
                <h3>{newsItem.eventName}</h3>
                <div className="event-schedule">
                  <div className="event-date">
                    <div className="date-content">
                      <small>DATE</small>
                      <h4>25</h4>
                      <h5>Dec</h5>
                      <h6>2020</h6>
                    </div>
                  </div>

                  <div className="event-time">
                    <div className="time-content">
                      <small>TIME</small>
                      <h4>10</h4>
                      <h5>PM</h5>
                      <h6>Onwards</h6>
                    </div>
                  </div>
                </div>
                <div className="tag-container">
                  <Button className="tag-btn">+1 RSVP</Button>
                </div>
              </div>
            </div>
          </div>
          : 
          <div></div>
        )
      }else{
        content = (
          <div></div>
        )
      }

      return(
        <div className="individual-post">
          {content}
          <div className="user-info">
            <div className="image">
              <img src={newsItem.imgSrc} alt="icon" />
            </div>
            <div className="img-desc">
              <h2>{newsItem.createdBy}</h2>
              <small>{newsItem.created}</small>
            </div>
            <div className="dropdown-container">
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  ...
                </Dropdown.Toggle>

                <Dropdown.Menu as={CustomMenu}>
                  <Dropdown.Item eventKey="1">Item 1</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="post-details">
            <p>{newsItem.details}</p>
            <div className="post-activity">
              <div className="up-vote">
                <button className="vote-btn">
                  <img src={upVoteImg} alt="Up Vote"></img>
                </button>
                <small>{newsItem.upvotes}</small>
              </div>
              <div className="down-vote">
                <button className="vote-btn"> 
                  <img src={downVoteImg} alt="Down Vote"></img>
                </button>
                <small>{newsItem.downVotes}</small>
              </div>
              <div className="comments">
                <img src={commentIcon} alt="comment"></img>
                <small>Comment</small>
              </div>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="news-feed">
        <div className="post-article">
          <div className="article">
            <input type="text" className="post-input" placeholder="write a post..." />
            <div className="cta">
            <Button variant="primary" onClick={this.handleShow}>
                <svg width="38" height="38" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                  d="M16 2H15V0H13V2H5V0H3V2H2C1.73786 2.00013 1.47833 2.05202 1.2363 2.1527C0.994268 2.25338 0.7745 2.40086 0.589606 2.58668C0.404713 2.77251 0.258334 2.99301 0.15887 3.23554C0.0594061 3.47808 0.00881501 3.73787 0.00999999 4L0 18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H16C16.5299 19.9984 17.0377 19.7872 17.4125 19.4125C17.7872 19.0377 17.9984 18.5299 18 18V4C17.9984 3.47005 17.7872 2.96227 17.4125 2.58753C17.0377 2.2128 16.5299 2.00158 16 2ZM16 18H2V8H16V18ZM16 6H2V4H16V6ZM9 11H14V16H9V11Z" 
                  fill="white"/>
                </svg>
                Event
              </Button>
              <Modal show={this.state.show} onHide={this.handleClose} animation={false} className="modal-box">
                <Modal.Header closeButton className="modal-header" style={borderStyle}>
                  <Modal.Title className="modal-title" style={borderStyle}><div className="main">New Event</div><div className="mini">ABOUT THE EVENT</div></Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body" style={borderStyle}>
                  <Form className="modal-form" style={borderStyle}>
                  
                    <Form.Row className="modal-row">
                      <Form.Group as={Col} controlId="formGridEmail" className="modal-group">
                        <Form.Label className="form-label">Event Name</Form.Label>
                          <Form.Control type="email" placeholder="Type here.." />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword" className="modal-group">
                        <Form.Label  className="form-label">Location</Form.Label>
                          <Form.Control type="password" placeholder="Where do you live?" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className="modal-row"> 
                      <Form.Group as={Col} controlId="formGridEmail" className="modal-group">
                        <Form.Label className="form-label">Date</Form.Label>
                          <Form.Control type="email" placeholder="DD/MM/YY" />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword" className="modal-group">
                        <Form.Label  className="form-label">Time</Form.Label>
                          <Form.Control type="password" placeholder="10:00 AM" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className="modal-row">
                      <Form.Group as={Col} controlId="formGridEmail" className="modal-group">
                        <Form.Label  className="form-label">Post Description</Form.Label>
                          <Form.Control as="textarea" className="post" placeholder="What do you want to tell people about the event?" />
                      </Form.Group>
                    </Form.Row>
                  </Form>
                </Modal.Body>
                <div className="modal-buttons">
                  <Button variant="primary" onClick={this.handleClose} className="save">
                    Save
                  </Button>
                  <Button variant="secondry" onClick={this.handleClose} className="cancel">
                    Cancel
                  </Button>
                </div>
              </Modal>
              <Button variant="primary">
                <svg width="38" height="38" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 14.0002H11V16.0002H4V14.0002ZM4 10.0002H14V12.0002H4V10.0002ZM4 6.0002H14V8.0002H4V6.0002ZM16 2.0002H11.82C11.6152 1.41564 11.2339 0.909159 10.7287 0.550821C10.2235 0.192483 9.61939 0 9 0C8.38062 0 7.77654 0.192483 7.27133 0.550821C6.76612 0.909159 6.38476 1.41564 6.18 2.0002H2C1.86557 1.99814 1.73136 2.01157 1.6 2.0402C1.28194 2.10806 0.984951 2.25167 0.734257 2.45884C0.483562 2.66601 0.286567 2.93062 0.160001 3.2302C0.0542746 3.47313 -0.000194222 3.73526 5.20354e-07 4.0002V18.0002C0.0018943 18.2682 0.0562509 18.5331 0.160001 18.7802C0.262989 19.018 0.408734 19.235 0.59 19.4202C0.865843 19.6981 1.21691 19.8893 1.6 19.9702C1.73236 19.9905 1.86609 20.0005 2 20.0002H16C16.5299 19.9986 17.0377 19.7874 17.4125 19.4127C17.7872 19.0379 17.9984 18.5301 18 18.0002V4.0002C17.9984 3.47026 17.7872 2.96247 17.4125 2.58774C17.0377 2.21301 16.5299 2.00179 16 2.0002ZM9 1.7502C9.14834 1.7502 9.29334 1.79419 9.41668 1.8766C9.54002 1.95901 9.63614 2.07615 9.69291 2.21319C9.74968 2.35023 9.76453 2.50103 9.73559 2.64652C9.70665 2.79201 9.63522 2.92564 9.53033 3.03053C9.42544 3.13542 9.2918 3.20685 9.14632 3.23579C9.00083 3.26473 8.85003 3.24988 8.71299 3.19311C8.57594 3.13635 8.45881 3.04022 8.3764 2.91688C8.29399 2.79354 8.25 2.64854 8.25 2.5002C8.25131 2.30169 8.33075 2.11169 8.47112 1.97132C8.61149 1.83095 8.80149 1.75151 9 1.7502ZM16 18.0002H2V4.0002H16V18.0002Z" 
                  fill="white"/>
                </svg>
                Project
              </Button>
            </div>
          </div>
          <div className="categories">
            <div className="category-type active">All</div>
            <div className="category-type">Donuts</div>
            <div className="category-type">Events</div>
            <div className="category-type">Projects</div>
          </div>
          <div className="article-posts">
            {newsFeed}
          </div>
        </div>
      </div>
    );
  }
}

export default NewsFeed;
