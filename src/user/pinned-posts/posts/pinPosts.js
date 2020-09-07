import React , { useState, useEffect } from 'react';
import {
    List, 
    Card,
    Paper, 
    ListItem, 
    ListItemAvatar, 
    Avatar, 
    ListItemText, 
    IconButton, 
    CardMedia
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "react-bootstrap";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { connect } from 'react-redux'
import "./posts.scss";
import Comment from '../../dashboard/news-feed/popups/comment';
import { withRouter } from 'react-router-dom';
import profileImg from '../../../assets/svgs/evt-creator.svg';
import eventImg from "../../../assets/svgs/event-img-1.svg";
import eventImg2 from "../../../assets/svgs/event-img-2.svg";
import { getAllPinnedPosts, upVotePost } from '../../../actions/postAction'
import { getEventsCreatedByUser, getProjectCreatedByUser } from '../../../actions/usersAction'
import { rsvpYes } from '../../../actions/eventAction'
import Moment from 'react-moment'

const styles = makeStyles((theme) => ({
    root: {
        padding: 0,
        minWidth: '320px'
    },
    listStyle: {
        paddingBottom: 0
    },
    listStyle2: {
        paddingTop: 0,
        marginTop: '-4px'
    },
    info: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        maxWidth: '150px'
    },
    info2: {
        position: 'absolute',
        top: theme.spacing(1),
        right: theme.spacing(1),
        maxWidth: '180px'
    },
    horiz: {
        padding: '4px',
        color: '#1A73E8'
    },
    event: {
        padding: '1px',
        color: '#1A73E8'
    },
    icon: {
        padding: '0px',
        marginBottom: '15px',
        marginRight: '4px'
    },
    vote: {
        padding: '0px'
    },
    chat: {
        color: 'rgba(0, 0, 0, 0.4)',
        padding: '0px',
        fontSize: '18px'
    },
    paper: {
        marginBottom: '15px'
    }
})
);

function PinPosts(props){
    const classes = styles();
    const [type, changeType] = useState('All');
    const [first, second] = useState('f');
    const [showComment, toggle] = useState(false);
    const [commentId, setCommentId] = useState('');
    // const [all, setAll] = useState([])
    const [userEvents, setEvents] = useState([])
    const [userPosts, setPosts] = useState([])
    const [userProjects, setAllProjects] = useState([])

    useEffect(() => {
        console.log('props from PinPosts ', props)
        let path = props.match?.path;
        if(path === '/pinned-posts') {
            props.getAllPinnedPosts()
            setPosts(props.posts?.pinnedPosts);
        }
        if(path === '/profile' || path === '/profile/:id'){
            setEvents(props.userEvents)
            setAllProjects(props.userProjects || [])
            setPosts(props.userPosts)
            // let all = [...userEvents, ...userProjects, ...userPosts]
            // setAll(all)
        }
    }, [props.userEvents, props.userProjects, props.userPosts])
    
    let handleClick = atrb => () => {
        changeType(atrb);
        second('s');
        console.log('second ', first)
        console.log('attr ', atrb)
    };

    let commentToggle = (postId) => {
        console.log("Comment toggle clicked!", postId);
        setCommentId(postId);
        toggle(!showComment);
    }

    let onUpVoteClick = (postId) => {
        console.log("On upvote clicked ", postId);
        props.upVotePost(postId)
    }

    let onRsvpYes = (eventId) => {
        console.log('On rsvp yes ', eventId);
        const info = {
            yes: localStorage.getItem('userId')
        }
        props.rsvpYes(eventId, info);
    }

    let onViewProject = (projectId) => {
        console.log('Redirecting to project ', projectId);
        props.history.push(`/${projectId}/proj-info`);
    }

    let userProjectsContent = userProjects?.map((project) => {
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
                                    <img src={project?.img || profileImg} alt="I"/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="main">
                                <h2>{project?.createdBy?.name?.firstName + " " + project?.createdBy?.name?.lastName || "No Name"}</h2>
                                <small>
                                  <Moment format="DD MMM YYYY">
                                    {project?.createdAt}
                                  </Moment>
                                </small>
                            </ListItemText>
                        </ListItem>
                        <div className="post-details2">{project?.description?.short}</div>
                        <ListItem>
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
                            <Comment show={showComment && project._id === commentId} onHide={toggle}/>
                    </List>
                </Card>
            </Paper>
        </div>  
        )
    })

    let userEventsContent = userEvents?.map((event, index) => {
        return (
            <div div className = "grid" key={index}>
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
                                            <h4>
                                              <Moment format="DD MMM YYYY">
                                                {event?.eventDate}
                                              </Moment>
                                            </h4>
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
                                     >+1 RSVP</Button>
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
                                <small>
                                  <Moment format="DD MMM YYYY">
                                    {event?.createdAt}
                                  </Moment>
                                </small>
                            </ListItemText>
                        </ListItem>
                        <div className="post-details2">{event?.description?.shortDescription}</div>
                        <Comment show={showComment && event._id === commentId} onHide={toggle}/>
                    </List>
                </Card>
            </Paper>
        </div>
        )
    });

    let userPostsContent = userPosts?.map((post, index) => {
        return (
          <div className="grid" key={index}>
            <Paper elevation={1} className={classes.paper}>
              <Card className={classes.root}>
                <List className={classes.listStyle}>
                  <ListItem className={classes.listStyle2}>
                    <ListItemAvatar>
                      <Avatar variant="square">
                        <img src={post?.img || profileImg} alt="I" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText className="main">
                      <h2>{post?.userId?.name?.firstName + " " + post?.userId?.name?.lastName}</h2>
                      <small>
                        <Moment format="DD MMM YYYY">
                          {post?.createdAt}
                        </Moment>
                      </small>
                    </ListItemText>
                  </ListItem>
                  <div className="post-details2">{post?.content}</div>
                  <ListItem>
                    <IconButton 
                      className={classes.vote}
                      onClick={() => onUpVoteClick(post._id)}
                      >
                      <ArrowDropUpIcon className="up-vote" />
                    </IconButton>
                    <span className="up-vote">
                     {post?.votes?.upVotes?.user.length}
                    </span>
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
                  <Comment
                    show={showComment && post._id === commentId}
                    onHide={toggle}
                  />
                </List>
              </Card>
            </Paper>
          </div>
        );
    })

    let posts;
    if(type === "Project"){
        posts = userProjectsContent
    }else if(type === "Event"){
        posts = userEventsContent
    }else if(type === "Post"){
        posts = userPostsContent
    } 

    return (
      <div>
        <div className="posts">
          <h1>Pinned Posts</h1>
          <div className="categories">
            <div className="tab__container">
              <span className="nav__tab container">
                <ul className="nav__list__container">
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
          </div>
        </div>
        <div className="post">
          {Boolean(type !== "All") ? (
            posts
          ) : (
            <>
              {userEventsContent}
              {userProjectsContent}
              {userPostsContent}
            </>
          )}
        </div>
      </div>
    );
};
// map state to props 
const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error,
    user: state.user,
    status: state.status,
    posts: state.post
})

export default connect(mapStateToProps , { getEventsCreatedByUser, getProjectCreatedByUser, getAllPinnedPosts, upVotePost, rsvpYes })(withRouter(PinPosts));