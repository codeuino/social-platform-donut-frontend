import React, { Component } from "react";
import "./upcoming-events.scss";
import events from '../../../jsonData/upcoming-events';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Typography } from '@material-ui/core';


class UpcomingEvents extends Component {
  render() {
    let upcomingEvents = events.map((event,i)=>{
      return (
      <>
        <ListItem key={i} alignItems="flex-start" className="list-item">
          <ListItemAvatar className="profile-pic">
            <Avatar alt="Profile" src={event.imgSrc} className="icon"/>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography style={{"fontWeight": "600", "fontSize": "15px"}}>{event.createdBy}</Typography>}
            secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
              </Typography>
              <p style={{"fontSize": "13px"}}>{event.description}</p>
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

export default UpcomingEvents;
