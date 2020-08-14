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
  // IconButton,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Dropdown } from "react-bootstrap";
import AddEventModal from "./popups/AddEventModal";
import AddProjectModal from "./popups/AddProjectModal";
import PostReactionModal from "./popups/PostReactionsModal";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import "../../pinned-posts/posts/posts.scss";
import "./news-feed.scss";
import AddPostModal from "./popups/AddPostModal";
import Comment from "./popups/comment";
import { connect } from "react-redux";
import { getAllCommentsOfPost } from "../../../actions/commentAction";
import { upVotePost } from "../../../actions/postAction";
import profileImg from "../../../assets/svgs/evt-creator.svg";
import eventImg from "../../../assets/svgs/event-img-1.svg";
import eventImg2 from "../../../assets/svgs/event-img-2.svg";
import parse from "html-react-parser";
import { withRouter } from "react-router-dom";
import { rsvpYes } from "../../../actions/eventAction";
import { FaEllipsisH, FaThumbtack } from "react-icons/fa";
import ReactionsElement from "./ReactionsElement";
import { pinPost } from "../../../actions/postAction";
import Moment from "react-moment";
import EditPostModal from "./popups/EditPost";
import DeletePostModal from "./popups/DeletePost";
import SharePostModal from "./popups/SharePost";

// const reactionVariant = {
//   hover: {
//     scale: 1.3,
//     opacity: 0.9,
//     rotate: [0, 10, 0, -10, 0],
//   },
// };

const navStyles = {
  position: "fixed",
  width: "83%",
  top: "0",
  zIndex: 1,
  background: "#fff",
  marginTop: "0px",
  marginBottom: "0px",
};

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const styles = makeStyles((theme) => ({
  root: {
    padding: 0,
    minWidth: "50%",
  },
  listStyle: {
    background: "#ffffff",
    borderRadius: "5px",
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
    paddingLeft: "17px",
  },
  paper: {
    marginBottom: "15px",
  },
}));

function NewsFeed(props) {
  const classes = styles();
  const [type, changeType] = useState("All");
  // const [first, second] = useState("f");
  const [showProject, setShowProject] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [writePost, showPostModal] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [showComment, toggle] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [events, setEvents] = useState([]);
  const [projects, setAllProjects] = useState([]);
  const [posts, setAllPosts] = useState([]);
  const [votes, setVotes] = useState({});
  const [isTop, setisTop] = useState(false);
  const [displayReactionContainer, setDisplayReactioContainer] = useState(
    false
  );
  const [editPost, setShowEditPost] = useState(false);
  const [sharePost, setShowSharePost] = useState(false);
  const [deletePost, setShowDeletePost] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [postInfo, setPostInfo] = useState({});
  const [deletePostId, setDeletePostId] = useState("");
  const [shareableContent, setSharableContent] = useState("");

  const FILTER_TAGS_REGEX = new RegExp(/(<([^>]+)>)/gi);

  useEffect(() => {
    const { allEvents, allProjects, allPosts } = props;

    setEvents(allEvents);
    setAllProjects(allProjects);
    setAllPosts(allPosts);
  }, [
    props.allEvents,
    props.allPosts,
    props.allProjects,
    props.singlePost,
    props,
  ]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollAmount = window.scrollY;
      scrollAmount > 369 ? setisTop(true) : setisTop(false);
    });
  }, [window]);

  let navigateToProfile = (userId) => {
    console.log(`Navigating to user profile ${userId}`);
    props.history.push(`/profile/${userId}`);
  };

  let handleClick = (atrb) => () => {
    console.log("attr ", atrb);
    changeType(atrb);
    // second("s");
  };

  let handleShow = (modalName, post) => {
    if (modalName === "project") {
      setShowProject(true);
    } else if (modalName === "event") {
      setShowEvent(true);
    } else if (modalName === "edit") {
      setPostInfo(post);
      setShowEditPost(true);
    }
  };

  let handleClose = (modalName) => {
    if (modalName === "project") {
      setShowProject(false);
    } else if (modalName === "event") {
      setShowEvent(false);
    } else if (modalName === "edit") {
      setPostInfo({});
      setShowEditPost(false);
    } else if (modalName === "delete") {
      setPostInfo({});
      setShowDeletePost(false);
    }
  };

  let openPostModal = () => {
    showPostModal(true);
  };

  let closePostModal = () => {
    showPostModal(false);
  };

  let commentToggle = (postId) => {
    console.log("Comment toggle clicked!", postId);
    props.getAllCommentsOfPost(postId);
    setCommentId(postId);
    toggle(!showComment);
  };

  // let onUpvote = (postId) => {
  //   console.log("upvote clicked!", postId);
  //   props.upVotePost(postId);
  // };

  let onRsvpYes = (eventId) => {
    console.log("On rsvp yes ", eventId);
    const info = {
      yes: localStorage.getItem("userId"),
    };
    props.rsvpYes(eventId, info);
  };

  let onViewProject = (projectId) => {
    console.log("Redirecting to project ", projectId);
    props.history.push(`/${projectId}/proj-info`);
  };

  let openReactionsModal = (votes) => {
    console.log(localStorage.getItem("userId"));
    setVotes(votes);
  };

  let closeReactionsModal = () => {
    setVotes({});
    setShowReactions(false);
  };

  let showDeletePostModal = (postId) => {
    setDeletePostId(postId);
    setShowDeletePost(true);
  };

  let hideDeletePostModal = () => {
    setDeletePostId("");
    setShowDeletePost(false);
  };

  let showSharePostModal = (content) => {
    setSharableContent(content);
    setShowSharePost(true);
  };

  let hideSharePostModal = () => {
    setSharableContent("");
    setShowSharePost(false);
  };

  let onPinPost = (postId) => {
    console.log("Pinning post ", postId);
    props.pinPost(postId);
  };

  useEffect(() => {
    if (Object.keys(votes).length !== 0) {
      setShowReactions(true);
    }
    console.log("use effect from votes");
    console.log(votes);
  }, [votes]);

  let postContent = posts?.map((post, index) => {
    const votes = post?.votes;
    let reacted = "";
    let reactionType = "";

    if (post?.votes?.upVotes?.user.includes(localStorage.getItem("userId"))) {
      reacted = true;
      reactionType = "like";
    } else if (
      post?.votes?.heart?.user.includes(localStorage.getItem("userId"))
    ) {
      reacted = true;
      reactionType = "heart";
    } else if (
      post?.votes?.happy?.user.includes(localStorage.getItem("userId"))
    ) {
      reacted = true;
      reactionType = "happy";
    } else if (
      post?.votes?.donut?.user.includes(localStorage.getItem("userId"))
    ) {
      reacted = true;
      reactionType = "donut";
    }

    const count =
      votes.upVotes?.user.length +
      votes.happy?.user.length +
      votes.heart?.user.length +
      votes.donut?.user.length;

    return (
      <div className="grid" key={post?._id}>
        <Paper elevation={1} className={classes.paper}>
          <Card className={classes.root} variant="outlined">
            <List className={classes.listStyle}>
              <ListItem className={classes.listStyle2}>
                <ListItemAvatar>
                  <Avatar variant="square">
                    <img src={post?.img || profileImg} alt="I" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText className="main">
                  <h2 onClick={() => navigateToProfile(post.userId?._id)}>
                    {post?.userId?.name?.firstName +
                      " " +
                      post?.userId?.name?.lastName}
                  </h2>
                  <Moment format="DD MMM YYYY">{post?.createdAt}</Moment>
                </ListItemText>
                <FaThumbtack
                  style={{ margin: "10px", width: "10px", cursor: "pointer" }}
                  onClick={() => onPinPost(post._id)}
                />
                <Dropdown>
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                  >
                    <FaEllipsisH />
                  </Dropdown.Toggle>
                  {post?.userId?._id === userId ? (
                    <Dropdown.Menu>
                      <Dropdown.Item
                        eventKey="1"
                        onClick={() => handleShow("edit", post)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="2"
                        onClick={() =>
                          showSharePostModal(
                            post?.content.replace(FILTER_TAGS_REGEX, "")
                          )
                        }
                      >
                        Share
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="3"
                        onClick={() => showDeletePostModal(post._id)}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  ) : (
                    <Dropdown.Menu>
                      <Dropdown.Item
                        eventKey="2"
                        onClick={() =>
                          showSharePostModal(
                            post?.content.replace(/(<([^>]+)>)/gi, "")
                          )
                        }
                      >
                        Share
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </ListItem>
              <div className="post-details2">{parse(post?.content)}</div>
              <ListItem>
                {/* <IconButton 
                  className={classes.vote}
                  onClick={() => onUpvote(post._id)}
                  >
                  <ArrowDropUpIcon className="up-vote" />
                </IconButton>
                <span className="up-vote">{post?.votes?.upVotes?.user.length}</span>
                <span className="space"></span> */}
                <ReactionsElement
                  reacted={reacted}
                  count={count}
                  votes={post.votes}
                  openModal={openReactionsModal}
                  postId={post._id}
                  reactionType={reactionType}
                />
                {/* <span
                  className="up-vote"
                  onClick={() => openReactionsModal(post.votes)}
                >
                  {post?.votes?.upVotes?.user.length}
                </span> */}
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
    );
  });

  let projectsContent = projects?.map((project) => {
    return (
      <div className="grid" key={project?._id}>
        <Paper elevation={1} className={classes.paper}>
          <Card className={classes.root}>
            <CardMedia
              className="projimg"
              image={project?.eventImage || eventImg}
              title="Project Image"
            >
              <Paper className={classes.info}>
                <div className="project-details">
                  <h3>{project?.projectName}</h3>
                  <p>By {project?.projectOwner || "CODEUINO"}</p>
                  <div className="view-project">
                    <Button
                      className="view-project-btn"
                      onClick={() => onViewProject(project._id)}
                    >
                      View Project
                    </Button>
                  </div>
                </div>
              </Paper>
            </CardMedia>
            <List className={classes.listStyle}>
              <ListItem className={classes.listStyle2}>
                <ListItemAvatar>
                  <Avatar variant="square">
                    <img src={project?.img || profileImg} alt="I" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText className="main">
                  <h2 onClick={() => navigateToProfile(project.createdBy?._id)}>
                    {project?.createdBy?.name?.firstName +
                      " " +
                      project?.createdBy?.name?.lastName}
                  </h2>
                  <Moment format="DD MMM YYYY">{project?.createdAt}</Moment>
                </ListItemText>
              </ListItem>
              <div className="post-details2">{project?.description?.short}</div>
              <ListItem>
                <span className="com-btn">
                  <ChatBubbleIcon className={classes.chat} />
                  <Button
                    className="comment-btn"
                    onClick={commentToggle.bind(this, project._id)}
                  >
                    <span className="comment">Comment</span>
                  </Button>
                </span>
              </ListItem>
            </List>
          </Card>
        </Paper>
      </div>
    );
  });

  let eventsContent = events?.map((event) => {
    return (
      <div className="grid" key={event._id}>
        <Paper elevation={1} className={classes.paper}>
          <Card className={classes.root}>
            <CardMedia
              className="eventimg"
              image={event?.eventImage || eventImg2}
              title="Event Image"
            >
              <Paper className={classes.info2}>
                <div className="event-details">
                  <h3>{event?.eventName}</h3>
                  <div className="event-schedule">
                    <div className="event-date">
                      <div className="date-content">
                        <small>DATE</small>
                        <br />
                        <Moment format="DD MMM YYYY">{event?.eventDate}</Moment>
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
                    <Button
                      className="tag-btn"
                      onClick={() => onRsvpYes(event._id)}
                    >
                      +1 RSVP
                    </Button>
                  </div>
                </div>
              </Paper>
            </CardMedia>
            <List className={classes.listStyle}>
              <ListItem className={classes.listStyle2}>
                <ListItemAvatar>
                  <Avatar variant="square">
                    <img src={event?.imgSrc || profileImg} alt="I" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText className="main">
                  <h2 onClick={() => navigateToProfile(event?.createdBy?._id)}>
                    {event?.createdBy?.name?.firstName +
                      " " +
                      event?.createdBy?.name?.lastName}
                  </h2>
                  <Moment format="DD MMM YYYY">{event?.createdAt}</Moment>
                </ListItemText>
              </ListItem>
              <div className="post-details2">
                {event?.description?.shortDescription}
              </div>
            </List>
          </Card>
        </Paper>
        <Comment show={showComment} onHide={toggle} postId={commentId} />
      </div>
    );
  });

  let content;
  if (type === "Project") {
    content = projectsContent;
  }
  if (type === "Post") {
    content = postContent;
  }
  if (type === "Event") {
    content = eventsContent;
  }

  return (
    <>
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
                <Button
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
                </Button>
                <Button
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
                </Button>
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
          <EditPostModal
            show={editPost}
            handleClose={() => {
              handleClose("edit");
            }}
            postInfo={postInfo}
          />
          <DeletePostModal
            show={deletePost}
            handleClose={() => {
              hideDeletePostModal();
            }}
            postId={deletePostId}
          />
          <SharePostModal
            show={sharePost}
            handleClose={() => {
              hideSharePostModal();
            }}
            sharableContent={shareableContent}
          />
        </div>
      </div>
      <div className="news__feed__container">
        <div className="tabs__container" style={isTop ? navStyles : {}}>
          <span className="nav__tab container">
            <ul
              className="nav__list__container"
              style={isTop ? { marginBottom: "0px" } : {}}
            >
              <li
                className={
                  type === "All"
                    ? "nav__single__tab selected"
                    : "nav__single__tab"
                }
                onClick={handleClick("All")}
              >
                All
              </li>
              <li
                className={
                  type === "Post"
                    ? "nav__single__tab selected"
                    : "nav__single__tab"
                }
                onClick={handleClick("Post")}
              >
                Posts
              </li>
              <li
                className={
                  type === "Event"
                    ? "nav__single__tab selected"
                    : "nav__single__tab"
                }
                onClick={handleClick("Event")}
              >
                Events
              </li>
              <li
                className={
                  type === "Project"
                    ? "nav__single__tab selected"
                    : "nav__single__tab"
                }
                onClick={handleClick("Project")}
              >
                Projects
              </li>
            </ul>
          </span>
        </div>
        <div className="post">
          {Boolean(type !== "All") ? (
            content
          ) : (
            <>
              {postContent}
              {eventsContent}
              {projectsContent}
              <PostReactionModal
                show={showReactions}
                onHide={closeReactionsModal}
                votes={votes}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

// map state to props
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  event: state.event,
  post: state.post,
  status: state.status,
  comment: state.comment,
});

export default connect(mapStateToProps, {
  getAllCommentsOfPost,
  upVotePost,
  pinPost,
  rsvpYes,
})(withRouter(NewsFeed));
