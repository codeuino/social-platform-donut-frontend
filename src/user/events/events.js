import React, { Component } from "react";
import Navigation from "../dashboard/navigation/navigation";
import {makeStyles, Grid,CardActions, Button, Card, CardContent, Typography} from "@material-ui/core";
import Event_list from "../../jsonData/events";
import { Badge } from "react-bootstrap";
import "./events.scss";
class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: true,
    };
  }

  render() {
    const sectionStyle = {
      width: "100%",
      height: "100%",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };

    const useStyles = makeStyles(() => ({
      root: {
        minWidth: 275,
      },
      title: {
        fontSize: 14,
      },
    }));

    const useStyles2 = makeStyles({
      root: {
        background: "#FE6B8B",
        maxWidth: 345,
        marginTop: "20px",
      },
    });

    let Events = Event_list.map((Item) => (
      <Grid item xs={6} sm={4}>
      <div className="event-card">
      <Card className="event-card">
      <CardContent>
        <Typography
          className={useStyles.title}
          color="textSecondary"
          gutterBottom
        >
          {Item.isOnline ? (
            <Badge pill variant="success">
              Online
            </Badge>
          ) : (
            <Badge pill variant="warning">
              {Item.location}
            </Badge>
          )}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className="eventName"
        >
          {Item.eventName}
        </Typography>

        <p className="createdAt">Created At: {Item.createdAt}</p>

        <p className="short-des" color="textSecondary">
          {Item.description.shortDescription}
        </p>
      </CardContent>
      <CardActions>
        <Button size="small" href={`/${Item._id}/event-info`}>
          <strong>See More</strong>
        </Button>
      </CardActions>
    </Card>
      </div>
      
      </Grid>
    ));

    return (
      <div className="organization">
        <div className="navigation">
          <Navigation event={this.state.event}></Navigation>
        </div>
        <div className="news events">
          <div className={useStyles.root}>
            <Grid container spacing={2}>
              {Events}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
