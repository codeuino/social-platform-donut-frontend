import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./portfolio.scss";
import { data_1, data_2, data_3 } from '../../../jsonData/portfolio-feed'
import { Typography, ListItemText, ListItem, List, withStyles } from '@material-ui/core';


const styles = theme => ({
  pri: {
    fontWeight: "bold",
    fontSize: "46px"
  },
  sec: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#4457A5"
  }
});

class Portfolio extends Component {
  render() {
    const { classes } = this.props
    let portfolio_1 = data_1.map((item, i) => {
      return (
        <ListItem className="item" key={i}>
          <ListItemText className="list-text"
          primary={<Typography className={classes.pri} >{item.contentValue}</Typography>}
          secondary={<Typography className={classes.sec} >{item.contentType}</Typography>}
           />
        </ListItem>
      )
    })

    let portfolio_2 = data_2.map((item, i) => {
      return (
        <ListItem className="item" key={i}>
          <ListItemText className="list-text"
          primary={<Typography className={classes.pri} >{item.contentValue}</Typography>}
          secondary={<Typography className={classes.sec} >{item.contentType}</Typography>}
           />
        </ListItem>
      )
    })

    let portfolio_3 = data_3.map((item, i) => {
      return (
        <ListItem className="item" key={i}>
          <ListItemText className="list-text"
          primary={<Typography className={classes.pri} >{item.contentValue}</Typography>}
          secondary={<Typography className={classes.sec} >{item.contentType}</Typography>}
           />
        </ListItem>
      )
    })
    return (
      <div className="portfolio">
        <List className="items-list">
          {portfolio_1}
        </List>
        <List className="items-list">
          {portfolio_2}
        </List>
        <List className="items-list">
          {portfolio_3}
        </List>
      </div>
    );
  }
}

Portfolio.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Portfolio);