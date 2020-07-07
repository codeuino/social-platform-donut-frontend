import React, { useState, useEffect } from "react";
import {
  List,
  Card,
  Paper,
  InputBase,
  ButtonGroup,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  // ListItemSecondaryAction,
  IconButton,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "react-bootstrap";
import Btn from "../../../common/Button";
import AddEventModal from "./popups/AddEventModal";
import AddProjectModal from "./popups/AddProjectModal";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
// import EventNoteIcon from "@material-ui/icons/EventNote";
// import EventIcon from "@material-ui/icons/Event";
// import ReplyIcon from '@material-ui/icons/Reply';
// import feed from "../../../jsonData/news-feed";
import "../../pinned-posts/posts/posts.scss";
import "./news-feed.scss";
import AddPostModal from "./popups/AddPostModal";
import Comment  from "./popups/comment";
import { connect } from 'react-redux'
import { getAllCommentsOfPost } from '../../../actions/commentAction'
import profileImg from '../../../svgs/evt-creator.svg';
import eventImg from "../../../svgs/event-img-1.svg";
import eventImg2 from "../../../svgs/event-img-2.svg";

const styles = makeStyles((theme) => ({
  root: {
    padding: 0,
    minWidth: "50%",
  },
  listStyle: {
    paddingBottom: 0,
  },
  listStyle2: {
    paddingTop: 0,
    marginTop: "-4px",
  },
  info: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    maxWidth: "150px",
  },
  info2: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    maxWidth: "180px",
  },
  horiz: {
    padding: "4px",
    color: "#1A73E8",
  },
  event: {
    padding: "1px",
    color: "#1A73E8",
  },
  icon: {
    padding: "0px",
    marginBottom: "15px",
    marginRight: "4px",
  },
  vote: {
    padding: "0px",
  },
  chat: {
    color: "rgba(0, 0, 0, 0.4)",
    padding: "0px",
    fontSize: "18px",
  },
  reply: {
    color: "rgba(0, 0, 0, 0.4)",
    fontSize: "36px",
    paddingLeft: "17px"
  },
  paper: {
    marginBottom: "15px",
  },
}));

function NewsFeed(props) {
  const classes = styles();
  const [type, changeType] = useState("All");
  const [first, second] = useState("f");
  const [showProject, setShowProject] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [writePost, showPostModal] = useState(false);
  const [showComment, toggle] = useState(false);
  const [commentId, setCommentId] = useState('');
  // const [all, setAll] = useState([]);
  const [events, setEvents] = useState([]);
  const [projects, setAllProjects] = useState([]);
  const [posts, setAllPosts] = useState([]);
  // const [allCommentsOfPost, setAllCommentsOfPost] = useState({})

  useEffect(() => {
    console.log("useEffect from news-feed ", props);
    setEvents(props?.allEvents);
    setAllProjects(props?.allProjects);
    setAllPosts(props?.allPosts);
    // setAll(props?.allMix);
    // setAllCommentsOfPost(props?.comment?.allComments)
  }, [props]);

  let handleClick = (atrb) => () => {
    changeType(atrb);
    second("s");
  };

  let handleShow = (modalName) => {
    if (modalName === "project") {
      setShowProject(true);
    } else if (modalName === "event") {
      setShowEvent(true);
    }
  };
  
  let handleClose = (modalName) => {
    if (modalName === "project") {
      setShowProject(false);
    } else if (modalName === "event") {
      setShowEvent(false);
    }
  };

  let openPostModal = () => {
    showPostModal(true)
  }

  let closePostModal = () => {
    showPostModal(false)
  }

  let commentToggle = (postId) => {
    console.log("Comment toggle clicked!", postId);
    props.getAllCommentsOfPost(postId)
    setCommentId(postId);
    toggle(!showComment);
  }
  
  let postContent = posts?.map((post) => {
    return (
        <div className="grid" key={post._id}>
        <Paper elevation={1} className={classes.paper}>
          <Card className={classes.root}>
              {/* <CardMedia className="projimg"
                image={post?.image || eventImg } title="Post Image">
            </CardMedia> */}
            <List className={classes.listStyle}>
              <ListItem className={classes.listStyle2}>
                <ListItemAvatar>
                  <Avatar variant="square">
                    <img src={post?.img || profileImg} alt="I" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText className="main">
                  <h2>{post?.userId?.name?.firstName + " " + post?.userId?.name?.lastName}</h2>
                  <small>{post?.createdAt}</small>
                </ListItemText>
                {/* <ListItemSecondaryAction>
                  {post.note === true ? (
                    <IconButton edge="end" className={classes.icon}>
                      <EventNoteIcon className={classes.event} />
                    </IconButton>
                  ) : post.schedule === true ? (
                    <IconButton edge="end" className={classes.icon}>
                      <EventIcon className={classes.event} />
                    </IconButton>
                  ) : null}
                  <IconButton edge="end" className={classes.icon}>
                    <MoreHorizIcon className={classes.horiz} />
                  </IconButton>
                </ListItemSecondaryAction> */}
              </ListItem>
              <div className="post-details2">{post?.content}</div>
              <ListItem>
                <IconButton className={classes.vote}>
                  <ArrowDropUpIcon className="up-vote" />
                </IconButton>
                <span className="up-vote">{post?.votes?.upVotes?.user.length}</span>
                <span className="space"></span>
                <span className="com-btn">
                  <ChatBubbleIcon className={classes.chat} />
                  <Button
                    className="comment-btn"
                    onClick={commentToggle.bind(this, post?._id)}
                  >
                    <span className="comment">Comment</span>
                  </Button>
                </span>
              </ListItem>
            </List>
          </Card>
        </Paper>
      </div>
    )
  })

  let projectsContent = projects?.map((project) => {
    return (
      <div className="grid" key={project?._id}>
            <Paper elevation={1} className={classes.paper}>
                <Card className={classes.root}>
                    <CardMedia className="projimg"
                        image={project?.eventImage || eventImg } title="Project Image">
                        <Paper className={classes.info}>
                            <div className="project-details">
                                <h3>{project?.projectName}</h3>
                                <p>By {project?.projectOwner || "CODEUINO"}</p>
                                <div className="view-project">
                                    <Btn className="view-project-btn">View Project</Btn>
                                </div>
                            </div>
                        </Paper>
                    </CardMedia>
                    <List className={classes.listStyle}>
                        <ListItem className={classes.listStyle2}>
                            <ListItemAvatar>
                                <Avatar variant="square">
                                    <img src={project?.img || profileImg} alt="I"/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="main">
                                <h2>{project?.createdBy?.name?.firstName + " " + project?.createdBy?.name?.lastName}</h2>
                                <small>{project?.createdAt}</small>
                            </ListItemText>
                            {/* <ListItemSecondaryAction>
                                { (project?.note === true) ?
                                <IconButton edge="end" className={classes.icon}>
                                    <EventNoteIcon className={classes.event}/>
                                </IconButton> : (project.schedule === true) ?
                                <IconButton edge="end" className={classes.icon}>
                                    <EventIcon className={classes.event}/>
                                </IconButton> : null }
                                <IconButton edge="end" className={classes.icon}>
                                    <MoreHorizIcon className={classes.horiz}/>
                                </IconButton>
                            </ListItemSecondaryAction> */}
                        </ListItem>
                        <div className="post-details2">{project?.description?.short}</div>
                        <ListItem>
                            {/* <IconButton className={classes.vote}>
                                <ArrowDropUpIcon className="up-vote"/>
                            </IconButton>
                            <span className="up-vote"> {project.upvotes}</span>
                            <span className="space"></span>
                            <IconButton className={classes.vote}>
                                <ArrowDropDownIcon className="down-vote"/>
                            </IconButton>
                            <span className="down-vote">{project.downVotes}</span> */}
                            <span className="com-btn">
                                <ChatBubbleIcon className={classes.chat}/>
                                <Button 
                                onClick = {
                                    commentToggle.bind(this, project._id)
                                } >
                                    <span className="comment">Comment</span>
                                </Button>
                            </span>
                        </ListItem>
                    </List>
                </Card>
            </Paper>
        </div>  
    )
  })

  let eventsContent = events?.map((event) => {
    return (
       <div div className = "grid" key={event._id}>
            <Paper elevation={1} className={classes.paper}>
                <Card className={classes.root}>
                    <CardMedia className="eventimg"
                        image={event?.eventImage || eventImg2 } title="Event Image">
                        <Paper className={classes.info2}>
                            <div className="event-details">
                                <h3>{event?.eventName}</h3>
                                <div className="event-schedule">
                                    <div className="event-date">
                                        <div className="date-content">
                                            <small>DATE</small>
                                            <h4>{event?.eventDate}</h4>
                                        </div>
                                    </div>
                                    <div className="event-time">
                                        <div className="time-content">
                                            <small>Location</small>
                                            <h4>{event?.location}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="tag-container">
                                    <Btn className="tag-btn">+1 RSVP</Btn>
                                </div>
                            </div>
                        </Paper>
                    </CardMedia>
                    <List className={classes.listStyle}>
                        <ListItem className={classes.listStyle2}>
                            <ListItemAvatar>
                                <Avatar variant="square">
                                    <img src={event?.imgSrc || profileImg} alt="I"/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="main">
                                <h2>{event?.createdBy?.name?.firstName + " " + event?.createdBy?.name?.lastName}</h2>
                                <small>{event?.createdAt}</small>
                            </ListItemText>
                            {/* <ListItemSecondaryAction>
                                { (event.note === true) ?
                                <IconButton edge="end" className={classes.icon}>
                                    <EventNoteIcon className={classes.event}/>
                                </IconButton> : (event.schedule === true) ?
                                <IconButton edge="end" className={classes.icon}>
                                    <EventIcon className={classes.event}/>
                                </IconButton> : null }
                                <IconButton edge="end" className={classes.icon}>
                                    <MoreHorizIcon className={classes.horiz}/>
                                </IconButton>
                            </ListItemSecondaryAction> */}
                        </ListItem>
                        <div className="post-details2">{event?.description?.shortDescription}</div>
                        {/* <ListItem>
                            <IconButton className={classes.vote}>
                                <ArrowDropUpIcon className="up-vote"/>
                            </IconButton>
                            <span className="up-vote">{event.upvotes}</span>
                            <span className="space"></span>
                            <IconButton className={classes.vote}>
                                <ArrowDropDownIcon className="down-vote"/>
                            </IconButton>
                            <span className="down-vote">{event.downVotes}</span>
                            <span className="com-btn">
                                <ChatBubbleIcon className={classes.chat}/>
                                <Button 
                                onClick = {
                                    commentToggle.bind(this, event._id)
                                } >
                                    <span className="comment">Comment</span>
                                </Button>
                            </span>
                        </ListItem> */}
                    </List>
                </Card>
            </Paper>
            <Comment
                show={showComment}
                onHide={toggle}
                postId={commentId}
              />
        </div>
    )
  })

 let content;
 if (type === "Project") {
  content = projectsContent
 }
 if (type === "Post") {
  content = postContent
 }
 if (type === "Event") {
  content = eventsContent
 }

  return (
    <div className="news__feed__container">
      <div className="news-feed">
        <div className="post-article">
          <div className="article">
            <Paper
              component="form"
              className="post-input"
              onClick={openPostModal}
            >
              <InputBase placeholder="Write a Post.." readOnly={true} />
            </Paper>
            <AddPostModal show={writePost} onHide={closePostModal} />
            <div className="cta">
              <ButtonGroup
                variant="outlined"
                color="primary"
                aria-label="contained primary button group"
              >
                <Btn
                  style={{backgroundColor: "purple"}}
                  variant="primary"
                  onClick={() => {
                    handleShow("event");
                  }}
                  className="optionbtn"
                >
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 2H15V0H13V2H5V0H3V2H2C1.73786 2.00013 1.47833 2.05202 1.2363 2.1527C0.994268 2.25338 0.7745 2.40086 0.589606 2.58668C0.404713 2.77251 0.258334 2.99301 0.15887 3.23554C0.0594061 3.47808 0.00881501 3.73787 0.00999999 4L0 18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H16C16.5299 19.9984 17.0377 19.7872 17.4125 19.4125C17.7872 19.0377 17.9984 18.5299 18 18V4C17.9984 3.47005 17.7872 2.96227 17.4125 2.58753C17.0377 2.2128 16.5299 2.00158 16 2ZM16 18H2V8H16V18ZM16 6H2V4H16V6ZM9 11H14V16H9V11Z"
                      fill="white"
                    />
                  </svg>
                  <span className="optionbtn-text">Event</span>
                </Btn>
                <Btn
                  variant="primary"
                  className="optionbtn"
                  onClick={() => {
                    handleShow("project");
                  }}
                >
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 14.0002H11V16.0002H4V14.0002ZM4 10.0002H14V12.0002H4V10.0002ZM4 6.0002H14V8.0002H4V6.0002ZM16 2.0002H11.82C11.6152 1.41564 11.2339 0.909159 10.7287 0.550821C10.2235 0.192483 9.61939 0 9 0C8.38062 0 7.77654 0.192483 7.27133 0.550821C6.76612 0.909159 6.38476 1.41564 6.18 2.0002H2C1.86557 1.99814 1.73136 2.01157 1.6 2.0402C1.28194 2.10806 0.984951 2.25167 0.734257 2.45884C0.483562 2.66601 0.286567 2.93062 0.160001 3.2302C0.0542746 3.47313 -0.000194222 3.73526 5.20354e-07 4.0002V18.0002C0.0018943 18.2682 0.0562509 18.5331 0.160001 18.7802C0.262989 19.018 0.408734 19.235 0.59 19.4202C0.865843 19.6981 1.21691 19.8893 1.6 19.9702C1.73236 19.9905 1.86609 20.0005 2 20.0002H16C16.5299 19.9986 17.0377 19.7874 17.4125 19.4127C17.7872 19.0379 17.9984 18.5301 18 18.0002V4.0002C17.9984 3.47026 17.7872 2.96247 17.4125 2.58774C17.0377 2.21301 16.5299 2.00179 16 2.0002ZM9 1.7502C9.14834 1.7502 9.29334 1.79419 9.41668 1.8766C9.54002 1.95901 9.63614 2.07615 9.69291 2.21319C9.74968 2.35023 9.76453 2.50103 9.73559 2.64652C9.70665 2.79201 9.63522 2.92564 9.53033 3.03053C9.42544 3.13542 9.2918 3.20685 9.14632 3.23579C9.00083 3.26473 8.85003 3.24988 8.71299 3.19311C8.57594 3.13635 8.45881 3.04022 8.3764 2.91688C8.29399 2.79354 8.25 2.64854 8.25 2.5002C8.25131 2.30169 8.33075 2.11169 8.47112 1.97132C8.61149 1.83095 8.80149 1.75151 9 1.7502ZM16 18.0002H2V4.0002H16V18.0002Z"
                      fill="white"
                    />
                  </svg>
                  <span className="optionbtn-text">Project</span>
                </Btn>
              </ButtonGroup>
            </div>
          </div>
          <AddEventModal
            show={showEvent}
            handleClose={() => {
              handleClose("event");
            }}
          />
          <AddProjectModal
            show={showProject}
            handleClose={() => {
              handleClose("project");
            }}
          />
        </div>
      </div>
      <div className="posts">
        <div className="category">
          <span className="to-centre">
            {first === "f" ? (
              <Button
                active
                variant="primary"
                className="category-btn"
                onClick={handleClick("All")}
              >
                <span className="btn-content">All</span>
              </Button>
            ) : (
              <Button
                autoFocus
                variant="primary"
                className="category-btn"
                onClick={handleClick("All")}
              >
                All
              </Button>
            )}
            <span className="space"></span>
            <Button
              variant="primary"
              className="category-btn"
              onClick={handleClick("Post")}
            >
              <span className="btn-content">Posts</span>
            </Button>
            <span className="space"></span>
            <Button
              variant="primary"
              className="category-btn"
              onClick={handleClick("Event")}
            >
              <span className="btn-content">Events</span>
            </Button>
            <span className="space"></span>
            <Button
              variant="primary"
              className="category-btn"
              onClick={handleClick("Project")}
            >
              <span className="btn-content">Projects</span>
            </Button>
          </span>
        </div>
      </div>
      <div className="post">
        {Boolean(type !== 'All') ?
         content 
         :
         <>
          {postContent}
          {eventsContent}
          {projectsContent}
         </>
       }
      </div>
    </div>
  );
}

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  event: state.event,
  post: state.post,
  status: state.status,
  comment: state.comment
})

export default connect(mapStateToProps, { getAllCommentsOfPost })(NewsFeed)
