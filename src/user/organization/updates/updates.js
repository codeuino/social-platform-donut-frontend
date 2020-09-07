import React from "react";
import "./updates.scss";
import { makeStyles } from "@material-ui/core/styles";
import gsoc from "../../../assets/images/gsoc.png";
import { ListItemText, List, ListItem, Divider } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  root: {
    paddingTop: "0px",
  },
}));

function Updates(props) {
  const classes = styles();
  var i;
  let upd = [];
  for (i = 1; i < 20; i++) {
    upd.push(
      <List className={classes.root}>
        <ListItem>
          <img className="image" src={gsoc} alt="icon" />
          <ListItemText className="img-desc">
            <h2>We got into Gsoc</h2>
            <p>No errors to display with the current filters applied.</p>
          </ListItemText>
        </ListItem>
        <Divider />
      </List>
    );
  }

  return (
    <div className="updates">
      <h1>Organizations Updates</h1>
      <div className="org-updates">{upd}</div>
    </div>
  );
}

export default Updates;