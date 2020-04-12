import React, { Component } from "react";
import "./notifications.scss";
import customNotifications from '../../../jsonData/notifications'
import PropTypes from 'prop-types';
import { Typography, List, ListItem, ListItemAvatar, Divider, ListItemText, Avatar, withStyles }  from '@material-ui/core';

const styles = theme => ({
  pri: {
    fontWeight: "600",
    fontSize: "15px"
  },
  content: {
    fontSize: "13px"
  }
})


class Notifications extends Component {
  render() {
    const { classes } = this.props
    let notifications = customNotifications.map((notification,i) => {
      return (
        <>
          <ListItem key={i} alignItems="flex-start" className="list-item">
            <ListItemAvatar className="icon">
              <Avatar alt="Remy Sharp" src={notification.imgSrc} className="image" />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography className={classes.pri}>{notification.heading}</Typography>}
              secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                </Typography>
                <p className={classes.content}>{notification.content}</p>
              </React.Fragment>
            }
          />
          {notification.tag ? <button variant="contained" color="primary" component="span" className="tag">
            {notification.tag}
          </button> : <div></div>}
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      )
    })

    return (
      <div className="notifications">
        <div className="text-center heading-container">
          <h5>Notifications</h5>
        </div>
        <div className="all-notifications">
          <List className="list">
            {notifications}
          </List>
        </div>
      </div>
    );
  }
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notifications);


