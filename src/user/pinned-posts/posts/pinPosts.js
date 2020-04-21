import React from 'react';
import {List, Card, Button, Paper, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, CardMedia} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EventIcon from '@material-ui/icons/Event';
import feed from '../../../jsonData/news-feed';
import "./posts.scss";

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

export default function PinPosts(props){
    const classes = styles();
    const [type, changeType] = React.useState('All');
    const [first, second] = React.useState('f');
    
    let handleClick = atrb => () => {
        changeType(atrb);
        second('s');
    };
    let posts = feed.map((newsItem) => {
            if(newsItem.type === "Project" && (type === 'All' || type === newsItem.type)){
                return(
                <div className="grid">
                    <Paper elevation={1} className={classes.paper}>
                        <Card className={classes.root}>
                            <CardMedia className="projimg"
                                image={newsItem.eventImage} title="Project Image">
                                <Paper className={classes.info}>
                                    <div className="project-details">
                                        <h3>{newsItem.projectName}</h3>
                                        <p>By {newsItem.projectOwner}</p>
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
                                            <img src={newsItem.imgSrc} alt="I"/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText className="main">
                                        <h2>{newsItem.createdBy}</h2>
                                        <small>{newsItem.created}</small>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
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
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <div className="post-details2">{newsItem.details}</div>
                                <ListItem>
                                    <IconButton className={classes.vote}>
                                        <ArrowDropUpIcon className="up-vote"/>
                                    </IconButton>
                                    <span className="up-vote"> {newsItem.upvotes}</span>
                                    <span className="space"></span>
                                    <IconButton className={classes.vote}>
                                        <ArrowDropDownIcon className="down-vote"/>
                                    </IconButton>
                                    <span className="down-vote">{newsItem.downVotes}</span>
                                    <span className="com-btn">
                                        <ChatBubbleIcon className={classes.chat}/>
                                        <Button>
                                            <span className="comment">Comment</span>
                                        </Button>
                                    </span>
                                </ListItem>
                            </List>
                        </Card>
                    </Paper>
                </div>  )
            }else if(newsItem.type === "Event" && (type === 'All' || type === newsItem.type)){
                return(
                <div className="grid">
                    <Paper elevation={1} className={classes.paper}>
                        <Card className={classes.root}>
                            <CardMedia className="eventimg"
                                image={newsItem.eventImage} title="Event Image">
                                <Paper className={classes.info2}>
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
                                </Paper>
                            </CardMedia>
                            <List className={classes.listStyle}>
                                <ListItem className={classes.listStyle2}>
                                    <ListItemAvatar>
                                        <Avatar variant="square">
                                            <img src={newsItem.imgSrc} alt="I"/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText className="main">
                                        <h2>{newsItem.createdBy}</h2>
                                        <small>{newsItem.created}</small>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
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
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <div className="post-details2">{newsItem.details}</div>
                                <ListItem>
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
                                        <Button>
                                            <span className="comment">Comment</span>
                                        </Button>
                                    </span>
                                </ListItem>
                            </List>
                        </Card>
                    </Paper>
                </div>)
            }else if(newsItem.type === "Donut" && (type === 'All' || type === newsItem.type)){
                return(
                <div className="grid">
                    <Paper elevation={1} className={classes.paper}>
                        <Card className={classes.root}>
                            <List className={classes.listStyle}>
                                <ListItem className={classes.listStyle2}>
                                    <ListItemAvatar>
                                        <Avatar variant="square">
                                            <img src={newsItem.imgSrc} alt="I"/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText className="main">
                                        <h2>{newsItem.createdBy}</h2>
                                        <small>{newsItem.created}</small>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
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
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <div className="post-details2">{newsItem.details}</div>
                                <ListItem>
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
                                        <Button>
                                            <span className="comment">Comment</span>
                                        </Button>
                                    </span>
                                </ListItem>
                            </List>
                        </Card>
                    </Paper>
                </div>)
            }
        }
    );

    return (
        <div>
        <div className="posts">
            <h1>Pinned Posts</h1>
            <div className="categories">
                { (first === 'f') ? 
                <Button autofocus variant="contained" className="btn active"
                onClick={handleClick('All')}>All</Button> :
                <Button autofocus variant="contained" className="btn"
                onClick={handleClick('All')}>All</Button> }
                <span className="space"></span>
                <Button variant="contained" className="btn"
                onClick={handleClick('Donut')}>Donuts</Button>
                <span className="space"></span>
                <Button variant="contained" className="btn"
                onClick={handleClick('Event')}>Events</Button>
                <span className="space"></span>
                <Button variant="contained" className="btn"
                onClick={handleClick('Project')}>Projects</Button>
            </div>
        </div>
        <div className="post">
            {posts}
        </div>
        </div>
    )
};
