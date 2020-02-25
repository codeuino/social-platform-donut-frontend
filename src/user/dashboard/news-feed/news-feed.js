import React, { Component} from "react";
import { Button , Dropdown} from "react-bootstrap";
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
  state = { date: new Date() };
  render() {
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
            <input type="text" placeholder="write a post..." />
            <div className="cta">
              <Button variant="primary">Event</Button>
              <Button variant="primary">Project</Button>
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
