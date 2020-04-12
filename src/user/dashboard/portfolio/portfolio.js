import React, { Component } from "react";
import "./portfolio.scss";
import { data_1, data_2, data_3 } from '../../../jsonData/portfolio-feed'
import { Typography, ListItemText, ListItem, List } from '@material-ui/core';



class Portfolio extends Component {
  render() {
    let portfolio_1 = data_1.map((item, i) => {
      return (
        <ListItem className="item" key={i}>
          <ListItemText className="list-text"
          primary={<Typography style={{"fontWeight": "bold", "fontSize": "36px"}}>{item.contentValue}</Typography>}
          secondary={<Typography style={{"fontWeight": "600", "fontSize": "14px", "color": "#4457A5"}}>{item.contentType}</Typography>}
           />
        </ListItem>
      )
    })

    let portfolio_2 = data_2.map((item, i) => {
      return (
        <ListItem className="item" key={i}>
          <ListItemText className="list-text"
          primary={<Typography style={{"fontWeight": "bold", "fontSize": "36px"}}>{item.contentValue}</Typography>}
          secondary={<Typography style={{"fontWeight": "600", "fontSize": "14px", "color": "#4457A5"}}>{item.contentType}</Typography>}
           />
        </ListItem>
      )
    })

    let portfolio_3 = data_3.map((item, i) => {
      return (
        <ListItem className="item" key={i}>
          <ListItemText className="list-text"
          primary={<Typography style={{"fontWeight": "bold", "fontSize": "36px"}}>{item.contentValue}</Typography>}
          secondary={<Typography style={{"fontWeight": "600", "fontSize": "14px", "color": "#4457A5"}}>{item.contentType}</Typography>}
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

export default Portfolio;
