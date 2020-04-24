import React, { Component } from "react";
import Navigation from "../../dashboard/navigation/navigation";
import { Card, Col, Row } from "react-bootstrap";
import Event_list from "../../../jsonData/events";
import {makeStyles, Grid, Fab, CardActionArea, CardContent} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./event-info.scss";
class EventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: true,
      event_info: {},
    };
  }
  render() {
    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
      },
    }));
    const useStyles2 = makeStyles({
      root: {
        maxWidth: 345,
        marginTop: "20px",
      },
    });

    let event_info = Event_list.filter(
      (x) => x._id === this.props.match.params.id
    );
    const { eventName, description, slots, eventDate, rsvpYes, rsvpNo, rsvpMaybe, isOnline, location} = event_info[0];
    const yes = rsvpYes.length;
    const no = rsvpNo.length;
    const maybe = rsvpMaybe.length;
    var event_location;
    if (isOnline) {
      event_location = "Online";
    } else {
      event_location = location;
    }
    return (
      <div className="organization">
        <div className="navigation">
          <Navigation event={this.state.event}></Navigation>
        </div>
        <div className="news">
          <Row>
            <Col xs={12}>
              <Fab
                className="back"
                href="/events"
                color="primary"
                aria-label="add"
              >
                <ArrowBackIcon />
              </Fab>
              <div className="title">
                <h1>{eventName}</h1>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p className="createAt">Event Date: {eventDate}</p>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <p className="location">Location: {event_location}</p>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <p className="slots">Total Slots: {slots}</p>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <div className="description">
                <hr></hr>
                <p className="desc">{description.longDescription}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="rsvp">
                <h1>RSVP</h1>
              </div>
            </Col>
          </Row>
          <div className={useStyles.root}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={4}>
                <Card className={useStyles2.root}>
                  <CardActionArea>
                    <CardContent>
                      <p
                        className="rsvp-title"
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        YES
                      </p>
                      <p
                        className="rsvp-number"
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        {yes}
                      </p>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Card className={useStyles2.root}>
                  <CardActionArea>
                    <CardContent>
                      <p
                        className="rsvp-title"
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        MAYBE
                      </p>
                      <p
                        className="rsvp-number"
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        {maybe}
                      </p>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Card className={useStyles2.root}>
                  <CardActionArea>
                    <CardContent>
                      <p
                        className="rsvp-title"
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        NO
                      </p>
                      <p
                        className="rsvp-number"
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        {no}
                      </p>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default EventInfo;
