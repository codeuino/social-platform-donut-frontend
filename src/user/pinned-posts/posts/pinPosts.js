import React , { useState, useEffect } from 'react';
import {
    List, 
    Card,
    Paper, 
    ListItem, 
    ListItemAvatar, 
    Avatar, 
    ListItemText, 
    // ListItemSecondaryAction, 
    IconButton, 
    CardMedia
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "react-bootstrap";
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
// import EventNoteIcon from '@material-ui/icons/EventNote';
// import EventIcon from '@material-ui/icons/Event';
// import feed from '../../../jsonData/news-feed';
// import ReplyIcon from '@material-ui/icons/Reply';
import { connect } from 'react-redux'
import { getEventsCreatedByUser, getProjectCreatedByUser } from '../../../actions/usersAction'
import "./posts.scss";
import Comment from '../../dashboard/news-feed/popups/comment';
import { withRouter } from 'react-router-dom';
import profileImg from '../../../svgs/evt-creator.svg';
import eventImg from "../../../svgs/event-img-1.svg";
import eventImg2 from "../../../svgs/event-img-2.svg";
import { getAllPinnedPosts } from '../../../actions/postAction'

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
        if(props.match?.path === '/pinned-posts') {
            console.log('fetch all the pinned posts!', props)
            props.getAllPinnedPosts()
            setTimeout(() => {
                setPosts(props.posts?.pinnedPosts);
            })
        }
        // debugger;
        if(props.match?.path === '/profile'){
            setEvents(props.userEvents)
            setAllProjects(props.userProjects || [])
            setPosts(props.userPosts)
            // let all = [...userEvents, ...userProjects, ...userPosts]
            // setAll(all)
        }
    }, [props])
    
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

    let userProjectsContent = userProjects?.map((newsItem) => {
        return (
            <div className="grid" key={newsItem?._id}>
            <Paper elevation={1} className={classes.paper}>
                <Card className={classes.root}>
                    <CardMedia className="projimg"
                        image={newsItem?.eventImage || eventImg } title="Project Image">
                        <Paper className={classes.info}>
                            <div className="project-details">
                                <h3>{newsItem?.projectName}</h3>
                                <p>By {newsItem?.projectOwner || "CODEUINO"}</p>
                                <div className="view-project">
                                    <Button className="view-project-btn">View Project</Button>
                                </div>
                            </div>
                        </Paper>
                    </CardMedia>
                    <List className={classes.listStyle}>
                        <ListItem className={classes.listStyle2}>
                            <ListItemAvatar>
                                <Avatar variant="square">
                                    <img src={newsItem?.img || profileImg} alt="I"/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="main">
                                <h2>{newsItem?.createdBy?.name?.firstName + " " + newsItem?.createdBy?.name?.lastName || "No Name"}</h2>
                                <small>{newsItem?.createdAt}</small>
                            </ListItemText>
                            {/* <ListItemSecondaryAction>
                                { (newsItem?.note === true) ?
                                <IconButton edge="end" className={classes.icon}>
                                    <EventNoteIcon className={classes.event}/>
                                </IconButton> : (newsItem.schedule === true) ?
                                <IconButton edge="end" className={classes.icon}>
                                    <EventIcon className={classes.event}/>
                                </IconButton> : null }
                                <IconButton edge="end" className={classes.icon}>
                                    <MoreHorizIcon className={classes.horiz}/>
                                </IconButton>
                            </ListItemSecondaryAction> */}
                        </ListItem>
                        <div className="post-details2">{newsItem?.description?.short}</div>
                        <ListItem>
                            {/* <IconButton className={classes.vote}>
                                <ArrowDropUpIcon className="up-vote"/>
                            </IconButton>
                            <span className="up-vote"> {newsItem.upvotes}</span>
                            <span className="space"></span>
                            <IconButton className={classes.vote}>
                                <ArrowDropDownIcon className="down-vote"/>
                            </IconButton>
                            <span className="down-vote">{newsItem.downVotes}</span> */}
                            <span className="com-btn">
                                <ChatBubbleIcon className={classes.chat}/>
                                <Button 
                                onClick = {
                                    commentToggle.bind(this, newsItem._id)
                                } >
                                    <span className="comment">Comment</span>
                                </Button>
                            </span>
                        </ListItem>
                            <Comment show={showComment && newsItem._id === commentId} onHide={toggle}/>
                    </List>
                </Card>
            </Paper>
        </div>  
        )
    })

    let userEventsContent = userEvents?.map((newsItem, index) => {
        return (
            <div div className = "grid" key={index}>
            <Paper elevation={1} className={classes.paper}>
                <Card className={classes.root}>
                    <CardMedia className="eventimg"
                        image={newsItem?.eventImage || eventImg2 } title="Event Image">
                        <Paper className={classes.info2}>
                            <div className="event-details">
                                <h3>{newsItem?.eventName}</h3>
                                <div className="event-schedule">
                                    <div className="event-date">
                                        <div className="date-content">
                                            <small>DATE</small>
                                            <h4>{newsItem?.eventDate}</h4>
                                        </div>
                                    </div>
                                    <div className="event-time">
                                        <div className="time-content">
                                            <small>Location</small>
                                            <h4>{newsItem?.location}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="tag-container">
                                    <Button className="tag-btn">+1 RSVP</Button>
                                </div>
                            </div>
                        </Paper>
                    </CardMedia>
                    <List className={classes.listStyle}>
                        <ListItem className={classes.listStyle2}>
                            <ListItemAvatar>
                                <Avatar variant="square">
                                    <img src={newsItem?.imgSrc || profileImg} alt="I"/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText className="main">
                                 <h2>{newsItem?.createdBy?.name?.firstName + " " + newsItem?.createdBy?.name?.lastName}</h2>
                                <small>{newsItem?.createdAt}</small>
                            </ListItemText>
                            {/* <ListItemSecondaryAction>
                                { (newsItem.note === true) ?
                                <IconButton edge="end" className={classes.icon}>
                                    <EventNoteIcon className={classes.event}/>
                                </IconButton> : (newsItem.schedule === true) ?
                                <IconButton edge="end" className={classes.icon}>
                                    <EventIcon className={classes.event}/>
                                </IconButton> : null }
                                <IconButton edge="end" className={classes.icon}>
                                    <MoreHorizIcon className={classes.horiz}/>
                                </IconButton>
                            </ListItemSecondaryAction> */}
                        </ListItem>
                        <div className="post-details2">{newsItem?.description?.shortDescription}</div>
                        {/* <ListItem>
                            <IconButton className={classes.vote}>
                                <ArrowDropUpIcon className="up-vote"/>
                            </IconButton>
                            <span className="up-vote">{newsItem.upvotes}</span>
                            <span className="space"></span>
                            <IconButton className={classes.vote}>
                                <ArrowDropDownIcon className="down-vote"/>
                            </IconButton>
                            <span className="down-vote">{newsItem.downVotes}</span>
                            <span className="com-btn">
                                <ChatBubbleIcon className={classes.chat}/>
                                <Button 
                                onClick = {
                                    commentToggle.bind(this, newsItem._id)
                                } >
                                    <span className="comment">Comment</span>
                                </Button>
                            </span>
                        </ListItem> */}
                        <Comment show={showComment && newsItem._id === commentId} onHide={toggle}/>
                    </List>
                </Card>
            </Paper>
        </div>
        )
    });

    let userPostsContent = userPosts?.map((newsItem, index) => {
        return (
          <div className="grid" key={index}>
            <Paper elevation={1} className={classes.paper}>
              <Card className={classes.root}>
                  {/* <CardMedia className="projimg"
                    image={newsItem?.image || eventImg } title="Post Image">
                </CardMedia> */}
                <List className={classes.listStyle}>
                  <ListItem className={classes.listStyle2}>
                    <ListItemAvatar>
                      <Avatar variant="square">
                        <img src={newsItem?.img || profileImg} alt="I" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText className="main">
                      <h2>{newsItem?.userId?.name?.firstName + " " + newsItem?.userId?.name?.lastName}</h2>
                      <small>{newsItem?.createdAt}</small>
                    </ListItemText>
                    {/* <ListItemSecondaryAction>
                      {newsItem.note === true ? (
                        <IconButton edge="end" className={classes.icon}>
                          <EventNoteIcon className={classes.event} />
                        </IconButton>
                      ) : newsItem.schedule === true ? (
                        <IconButton edge="end" className={classes.icon}>
                          <EventIcon className={classes.event} />
                        </IconButton>
                      ) : null}
                      <IconButton edge="end" className={classes.icon}>
                        <MoreHorizIcon className={classes.horiz} />
                      </IconButton>
                    </ListItemSecondaryAction> */}
                  </ListItem>
                  <div className="post-details2">{newsItem?.content}</div>
                  <ListItem>
                    <IconButton className={classes.vote}>
                      <ArrowDropUpIcon className="up-vote" />
                    </IconButton>
                    <span className="up-vote">{newsItem?.votes?.upVotes?.user.length}</span>
                    <span className="space"></span>
                    <span className="com-btn">
                      <ChatBubbleIcon className={classes.chat} />
                      <Button
                        className="comment-btn"
                        onClick={commentToggle.bind(this, newsItem?._id)}
                      >
                        <span className="comment">Comment</span>
                      </Button>
                    </span>
                  </ListItem>
                  <Comment
                    show={showComment && newsItem._id === commentId}
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
    }else if(type === "Donut"){
        posts = userPostsContent
    } 

    return (
        <div>
        <div className="posts">
            <h1>Pinned Posts</h1>
            <div className="categories">
                { (first === 'f') ? 
                <Button 
                    active
                    variant = "primary"
                    className = "btn"
                    onClick={handleClick('All')}
                >
                    <span className="btn-content">All</span>
                </Button> :
                <Button 
                    variant = "primary"
                    className = "btn"
                    onClick={handleClick('All')}
                    >
                    <span className="btn-content">All</span>
                </Button> }
                    <span className="space"></span>
                <Button 
                    variant="primary" 
                    className="btn"
                    onClick={handleClick('Donut')}
                >
                    <span className="btn-content">Posts</span>
                </Button>
                    <span className="space"></span>
                <Button 
                    variant="primary" 
                    className="btn"
                    onClick={handleClick('Event')}
                >
                    <span className="btn-content">Events</span>
                </Button>
                    <span className="space"></span>
                <Button 
                    variant = "primary"
                    className="btn"
                    onClick={handleClick('Project')}
                >
                    <span className="btn-content">Projects</span>
                </Button>
            </div>
        </div>
        <div className="post">
            {
                Boolean(type !== 'All') ? posts 
                :
                <>
                {userEventsContent}
                {userProjectsContent}
                {userPostsContent}
                </>
            }
        </div>
        </div>
    )
};
// map state to props 
const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error,
    user: state.user,
    status: state.status,
    posts: state.post
})

export default connect(mapStateToProps , { getEventsCreatedByUser, getProjectCreatedByUser, getAllPinnedPosts })(withRouter(PinPosts));