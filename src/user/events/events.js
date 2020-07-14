import React, { Component } from "react";
import Navigation from "../dashboard/navigation/navigation";
import { Grid ,CardActions, Card} from "@material-ui/core";
// import Event_list from "../../jsonData/events";
import { Row, Col, Button } from "react-bootstrap";
import "./events.scss";
import Popups from './popups/popups';
import DeleteEvent from "./popups/DeleteEvent";
import EditEvent from "./popups/EditEvent";
import { connect } from 'react-redux'
import { getAllEvents } from '../../actions/eventAction'
import { checkDeleteRights } from '../dashboard/utils/checkDeleteRights'

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: true,
      modalShow: false,
      optionValue: {},
      delete: false,
      edit: false, 
      allEvents: [],
      eventId: '',
      singleEvent: {}
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.getAllEvents()
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('events nextProps', nextProps)
    const { allEvents } = nextProps.event
    this.setState({ allEvents: allEvents, isAdmin: nextProps.auth?.isAdmin }, () => {
      console.log('updating all events ', this.state)
    })
  }

  
  render() {
    const { allEvents } = this.state

    const handleToggle = (eventId, event) => {
      console.log("-handletoggel",eventId)
      this.setState({ modalShow: true, eventId: eventId, singleEvent: event });
    }

    const RefineDate = (d) => {
      const date = d.split("T")
      const eventDate = date[0].slice(-2)
      return eventDate; 
    }

    const RefineTime = (d) => {
      const time = d.split("T");
      const eventTime = time[1].slice(0, 5)
      return eventTime;
    }
    
    const RefinedDay = (d) => {
      const day = d.slice(0, 3);
      return day;
    };

    const RefinedYear = (d) => {
       const month = d.slice(4, 7);
       const year = d.slice(11, 15);
       return month + " " + year;
     };

    const editEvent = (eventId, eventInfo) => {
      console.log('eventId ', eventId)
      this.setState({ modalShow: false, edit: true, eventId:  eventId, singleEvent: eventInfo })
    }

    const handleDelete = (eventId) => {
      console.log('eventId ', eventId)
      this.setState({ modalShow: false, delete: true, eventId: eventId })
    }

    const cancel = () => {
      this.setState({ delete: false, edit: false })
    }

  const FooterOfEvents = ({ Item }) => {
    return (
      <div className="row">
        <div className="col-md-6 col-sm-12 col-lg-6">
          <span>
            {checkDeleteRights(Item.createdBy._id) ? (
            <>
              <a 
                className="mr-3"
                href="javascript: void(0)" 
                onClick={editEvent.bind(this, Item._id, Item)}
                >Edit</a>
              <a 
                href="javascript: void(0)"
                onClick={handleDelete.bind(this, Item._id)}
                >Delete</a>
            </>
            ) : null }
            </span>
        </div>
        <div className="col-md-6">
          <Button
            size="sm"
            variant="light"
            onClick={handleToggle.bind(this, Item._id, Item)} 
            style={{float: "right"}} 
            id={Item._id}
            >
              <span style={{color: "#007bff"}}>See More</span>
          </Button>
        </div>
    </div>
    )
  }

    let Events = allEvents?.map((Item, index) => (
      <Grid item xs = {6} sm = {4} key = {index} className = "card__container" >
        {Date.parse(Item.eventDate) >= Date.parse(new Date()) ? (
          <Card>
            <CardActions>
              <Grid container spacing={1}>
                <Row>
                  <Col xs={1}>
                    {Item.isCancelled ? (
                      <div className="cancelled">{""}</div>
                    ) : (
                      <div className="div-upcoming">{""}</div>
                    )}
                  </Col>
                  <Col sm={3} xs={12}>
                    <div className="div2">{RefineDate(Item?.eventDate)}</div>
                  </Col>
                  <Col sm={5} xs={12}>
                    <div className="div3">
                      {RefinedDay(
                        new Date(Date.parse(Item?.eventDate)).toString()
                      )}
                      ,
                      {RefinedYear(
                        new Date(Date.parse(Item?.eventDate)).toString()
                      )}
                    </div>
                  </Col>
                </Row>
                <div className="inside">
                  <Grid item xs={12}>
                    <p className="eventName">{Item?.eventName}</p>
                    <p className="short-des">
                      {Item?.description?.shortDescription}
                    </p>
                  </Grid>
                  <Grid item sm={12}>
                    <p className="short-des">
                      Time :
                      {Item.isCancelled ? (
                        <span className="timing3">
                          {RefineTime(Item?.eventDate)}
                        </span>
                      ) : (
                        <span className="timing1">
                          {RefineTime(Item?.eventDate)}
                        </span>
                      )}
                    </p>
                  </Grid>
                  <Grid item sm={12}>
                    {!Item?.isCancelled ? (
                      Item?.isOnline ? (
                        <p className="event-location1">
                          <span className="timing1">Online</span>
                        </p>
                      ) : (
                        <p className="event-location1">
                          <span className="timing1">{Item?.location}</span>
                        </p>
                      )
                    ) : (
                      <p className="timing3">CANCELLED</p>
                    )}
                  </Grid>
                  <Grid item sm={12}>
                    <FooterOfEvents Item={Item} />
                  </Grid>
                </div>
              </Grid>
            </CardActions>
          </Card>
        ) : (
          <Card>
            <CardActions>
              <Grid container spacing={1}>
                <Row>
                  <Col xs={1}>
                    {Item.isCancelled ? (
                      <div className="cancelled">{""}</div>
                    ) : (
                      <div className="div-past">{""}</div>
                    )}
                  </Col>
                  <Col sm={3} xs={12}>
                    <div className="div2">
                      {RefineDate(Item?.eventDate)}
                    </div>
                  </Col>
                  <Col sm={5} xs={12}>
                    <div className="div3">
                      {RefinedDay(
                        new Date(Date.parse(Item.eventDate)).toString()
                      )}
                      ,
                      {RefinedYear(
                        new Date(Date.parse(Item.eventDate)).toString()
                      )}
                    </div>
                  </Col>
                </Row>
                <div className="inside">
                  <Grid item xs={12}>
                    <p className="eventName">{Item.eventName}</p>
                    <p className="short-des">
                      {Item.description.shortDescription}
                    </p>
                  </Grid>
                  <Grid item sm={12}>
                    <p className="short-des">
                      Time :
                      {Item.isCancelled ? (
                        <span className="timing3">
                          {RefineTime(Item?.eventDate)}
                        </span>
                      ) : (
                        <span className="timing1">
                          {RefineTime(Item?.eventDate)}
                        </span>
                      )}
                    </p>
                  </Grid>
                  <Grid item sm={12}>
                    {!Item.isCancelled ? (
                      Item.isOnline ? (
                        <p className="event-location1">
                          <span className="timing2">Online</span>
                        </p>
                      ) : (
                        <p className="event-location1">
                          <span className="timing2">{Item.location}</span>
                        </p>
                      )
                    ) : (
                      <p className="timing3">CANCELLED</p>
                    )}
                  </Grid>
                  <Grid item sm={12}>
                    <FooterOfEvents Item={Item} />
                  </Grid>
                </div>
              </Grid>
            </CardActions>
          </Card>
        )}
      </Grid>
    ));

    return (
      <div className="organization">
        <div className="navigation">
          <Navigation event={this.state.event}></Navigation>
        </div>
        <div className="news events">
          <div className="container">
            <h1 className="event_header">All Events</h1>
            <Grid container spacing={3} >
              {Events}
            </Grid>
          </div>
        </div>
        <Popups
          option={this.state.option}
          optionValue={this.state.optionValue}
          modalShow={this.state.modalShow}
          eventInfo={this.state.singleEvent}
        />
        <DeleteEvent
          show={this.state.delete}
          onHide={cancel}
          eventId={this.state.eventId}
        />
        <EditEvent
          show={this.state.edit}
          onHide={cancel}
          eventId={this.state.eventId}
          eventInfo={this.state.singleEvent}
        />
      </div>
    );
  }
}
// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  event: state.event
})

export default connect(mapStateToProps, { getAllEvents })(Events);
