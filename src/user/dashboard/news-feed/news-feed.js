import React, { Component} from "react";
import { Button , Dropdown} from "react-bootstrap";
import "./news-feed.scss";
import profileImg from "../../../svgs/evt-creator.svg";
import upVoteImg from "../../../svgs/up.svg";
import downVoteImg from "../../../svgs/down.svg";
import commentIcon from "../../../svgs/comment.svg";
import  eventImg  from "../../../svgs/event-img-1.svg";


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

const feed = [
  {
    _id: 1,
    imgSrc: profileImg,
    createdBy: 'Marjorie Alexander',
    details: 'ex sit ex laboris adipisicing enim eiusmod proident exercitation ea fugiat in mollit pariatur occaecat ut nostrud ullamco ex official',
    upvotes: 810,
    downVotes: 185,
    eventImage: null
  },
  {
    _id: 2,
    imgSrc: profileImg,
    createdBy: 'Marjorie Alexander',
    details: 'ex sit ex laboris adipisicing enim eiusmod proident exercitation ea fugiat in mollit pariatur occaecat ut nostrud ullamco ex official',
    upvotes: 80,
    downVotes: 15,
    eventImage: eventImg
  },
  {
    _id: 3,
    imgSrc: profileImg,
    createdBy: 'Marjorie Alexander',
    details: 'ex sit ex laboris adipisicing enim eiusmod proident exercitation ea fugiat in mollit pariatur occaecat ut nostrud ullamco ex official',
    upvotes: 104,
    downVotes: 25,
    eventImage: null
  },
  {
    _id: 4,
    imgSrc: profileImg,
    createdBy: 'Marjorie Alexander',
    details: 'ex sit ex laboris adipisicing enim eiusmod proident exercitation ea fugiat in mollit pariatur occaecat ut nostrud ullamco ex official',
    upvotes: 810,
    downVotes: 185,
    eventImage: null
  },
  {
    _id: 5,
    imgSrc: profileImg,
    createdBy: 'Marjorie Alexander',
    details: 'ex sit ex laboris adipisicing enim eiusmod proident exercitation ea fugiat in mollit pariatur occaecat ut nostrud ullamco ex official',
    upvotes: 80,
    downVotes: 15,
    eventImage: eventImg
  },
  {
    _id: 6,
    imgSrc: profileImg,
    createdBy: 'Marjorie Alexander',
    details: 'ex sit ex laboris adipisicing enim eiusmod proident exercitation ea fugiat in mollit pariatur occaecat ut nostrud ullamco ex official',
    upvotes: 80,
    downVotes: 15,
    eventImage: null
  },
  {
    _id: 7,
    imgSrc: profileImg,
    createdBy: 'Marjorie Alexander',
    details: 'ex sit ex laboris adipisicing enim eiusmod proident exercitation ea fugiat in mollit pariatur occaecat ut nostrud ullamco ex official',
    upvotes: 810,
    downVotes: 185,
    eventImage: null
  },
]

class NewsFeed extends Component {
  state = { date: new Date() };
  render() {
    let newsFeed = feed.map((newsItem, i)=>{
      return(
        <div  className="individual-post">
          {newsItem.eventImage ? <div className="event-image-container">
            <img src = {newsItem.eventImage}/>
          </div>
          :
          <div></div>}
          <div className="user-info">
            <div className="image">
              <img src={newsItem.imgSrc} alt="icon" />
            </div>
            <div className="img-desc">
              <h2>{newsItem.createdBy}</h2>
              <small>{this.state.date.toTimeString()}</small>
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
