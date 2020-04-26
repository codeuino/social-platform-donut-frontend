import React, { Component } from "react";
import Navigation from "../../dashboard/navigation/navigation";
import { Card, Col, Button, Row } from "react-bootstrap";
import Event_list from "../../../jsonData/events";
import {makeStyles, Grid, Fab, CardActionArea, CardContent} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./event-info.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import { DeleteEvent } from "../popups/delete-event";
import EditIcon from '@material-ui/icons/Edit';
import { EditEvent } from "../popups/edit-event";

class EventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editEvent: false,
      deleteEvent:false,
      event_info: {},
    };
  }
  render() {
    let cancel = () =>
    this.setState({
      editEvent: false,
      profile_info:{}
    });
    let cancel_del = () =>
    this.setState({
      deleteEvent: false,
    });

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

    const data_send={
      eventName:eventName,
      shortDescription:description.shortDescription,
      longDescription:description.longDescription,
      eventDate:eventDate,
      location:location,
      slots:slots,
      isOnline:isOnline

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
              <div className="event-config">
            <Button
            variant="light"
            onClick={() => this.setState({ editEvent: true,event_info:data_send })}
          >
            <EditIcon></EditIcon>
          </Button>{" "}
          <EditEvent
            show={this.state.editEvent}
            data={this.state.event_info}
            onHide={cancel}
          />
          <Button
          variant="light"
          onClick={() => this.setState({ deleteEvent: true })}
        >
          <DeleteIcon></DeleteIcon>
        </Button>
        <DeleteEvent
          show={this.state.deleteEvent}
          onHide={cancel_del}
        />
            </div>
              <div className="title">
                <h1>{eventName}</h1>
              </div>
            </Col>
            
          </Row>
          <Row>
            <Col xs={12}>
              <p className="createdAt">Event Date: {eventDate}</p>
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
              <div className="long-description">
              <h1>About</h1>
                <hr></hr>
                <p className="long-desc">{description.longDescription}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
             
            </Col>
          </Row>
          <div className={useStyles.root}>
          <div className="rsvp">
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
                        Hey! We are attending
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
                      We might attend :|
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
                       Sorry! We cannot attend :(
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
      </div>
    );
  }
}

export default EventInfo;
