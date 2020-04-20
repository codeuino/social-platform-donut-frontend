import React, { Component } from "react";
import "./upcoming-events.scss";
import PropTypes from 'prop-types';
import events from '../../../jsonData/upcoming-events';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  pri: {
    fontWeight: "600",
    fontSize: "16px"
  },
  content: {
    fontSize: "13px"
  }
})



class UpcomingEvents extends Component {
  render() {
    const { classes } = this.props
    let upcomingEvents = events.map((event,i)=>{
      return (
      <>
        <ListItem key={i} alignItems="flex-start" className="list-item"
        disableGutters>
          <ListItemAvatar className="profile-pic">
            <Avatar alt="Profile" src={event.imgSrc} className="icon"/>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography className={classes.pri}>{event.createdBy}</Typography>}
            secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
              </Typography>
              <p className={classes.content}>{event.description}</p>
            </React.Fragment>
          }
          />
          {event.tag ? <button variant="contained" color="primary" component="span" className="tag">
            {event.tag}
          </button> : <div></div>}
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
      )
    })
    return (
      <div className="upcoming-events">
        <div className="text-center heading-container">
          <h5>Upcoming Events</h5>
        </div>
        <div className="all-events">
          <List className="list">
            {upcomingEvents}
          </List>
        </div>
    </div>
    );
  }
}

UpcomingEvents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpcomingEvents);