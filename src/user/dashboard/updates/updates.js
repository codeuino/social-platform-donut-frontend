import React, { Component } from "react";
import "./updates.scss";
import organizationUpdates from '../../../jsonData/organization-updates'
import { makeStyles,List,ListItem,ListItemText,ListItemAvatar,Avatar,Divider } from '@material-ui/core';
class Updates extends Component {


  render() {

    const useStyles = makeStyles((theme) => ({
      root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      }
    }));

    let updates = organizationUpdates.map((item)=>(
    <ListItem alignItems="flex-start">
    <ListItemAvatar>
    <Avatar alt="" src={item.imgSrc} />
  </ListItemAvatar>
    <ListItemText
      primary={item.title}
      secondary={
        <React.Fragment>
          {item.description}
          <Divider component="li" />
        </React.Fragment>
      }
    />
  </ListItem>
    ))
    return (
      <div className="updates">
        <div className="org-updates">
        <List className={useStyles.root}>
        {updates}
        </List>
        </div>
      </div>
    );
  }
}

export default Updates;
