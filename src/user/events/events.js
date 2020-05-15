import React, { Component } from "react";
import Navigation from "../dashboard/navigation/navigation";
import { Grid ,CardActions, Card} from "@material-ui/core";
import Event_list from "../../jsonData/events";
import { Row, Col } from "react-bootstrap";
import "./events.scss";
import Popups from './popups/popups';
import DeleteEvent from "./popups/DeleteEvent";
import EditEvent from "./popups/EditEvent";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: true,
      modalShow: false,
      optionValue: {},
      delete: false,
      edit: false
    }
  }

  render() {
    const setOptionValue = (targetId) => {
        const event = Event_list.filter((x) => x._id === targetId);         
        this.setState({optionValue: event[0]})
    }

    const handleToggle = (e) => {
      const targetId = e.target.id;
      console.log("-handletoggel",targetId)
      this.setState({ modalShow: true });
      setOptionValue(targetId);
    }
    
    var RefinedDay = (d) => {
      const day = d.slice(0, 3);
      return day;
    };

    const editEvent = (e) => {
      e.preventDefault();
      this.setState({ modalShow: false, edit: true })
    }

    const handleDelete = (e) => {
      this.setState({ modalShow: false, delete: true })
    }

    const cancel = () => {
      this.setState({ delete: false, edit: false })
    }

    const RefinedYear = (d) => {
      const month = d.slice(4, 7);
      const year = d.slice(11, 15);
      return month + " " + year;
    };

  const FooterOfEvents = ({ Item }) => {
    return (
      <div className="row">
        <DeleteEvent 
          show={this.state.delete} 
          onHide={cancel}
          eventId={Item._id}
        />
        <EditEvent 
          show={this.state.edit}
          onHide={cancel}
          eventId={Item._id}
        />
        <div className="col-md-6 col-sm-12 col-lg-6">
          <span>
            <a 
              className="mr-3"
              href="javascript: void(0)" 
              onClick={editEvent}
              >Edit</a>
            <a 
              href="javascript: void(0)"
              onClick={handleDelete}
              >Delete</a>
            </span>
        </div>
        <div className="col-md-6">
          <a 
            href="javascript:void(0)" 
            onClick={handleToggle} 
            style={{float: "right"}} 
            id={Item._id}
            >See More
          </a>
        </div>
    </div>
    )
  }

    let Events = Event_list.map((Item, index) => (
      <Grid item xs={6} sm={4} key={index}>
        {Date.parse(Item.eventDate) >= Date.parse(new Date()) ? (
          <Card>
            <CardActions>
              <Grid container spacing={1}>
                <Row>
                  <Col xs={2}>
                    {Item.isCancelled ? (
                      <div className="cancelled">{""}</div>
                    ) : (
                      <div className="div-upcoming">{""}</div>
                    )}
                  </Col>
                  <Col sm={5} xs={12}>
                    <div className="div2">
                      {new Date(Date.parse(Item.eventDate)).getDate()}
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
                          {new Date(Date.parse(Item.eventDate)).toTimeString()}
                        </span>
                      ) : (
                        <span className="timing1">
                          {new Date(Date.parse(Item.eventDate)).toTimeString()}
                        </span>
                      )}
                    </p>
                  </Grid>
                  <Grid item sm={12}>
                    {!Item.isCancelled ? (
                      Item.isOnline ? (
                        <p className="event-location1">
                          <span className="timing1">Online</span>
                        </p>
                      ) : (
                        <p className="event-location1">
                          <span className="timing1">{Item.location}</span>
                        </p>
                      )
                    ) : (
                      <p className="timing3">CANCELLED</p>
                    )}
                  </Grid>
                  <Grid item sm={12}>
                    <FooterOfEvents 
                      Item={Item} 
                    />
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
                  <Col xs={2}>
                  {Item.isCancelled ? (
                    <div className="cancelled">{""}</div>
                  ) : (
                    <div className="div-past">{""}</div>
                  )}
                  </Col>
                  <Col sm={5} xs={12}>
                    <div className="div2">
                      {new Date(Date.parse(Item.eventDate)).getDate()}
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
                          {new Date(Date.parse(Item.eventDate)).toTimeString()}
                        </span>
                      ) : (
                        <span className="timing2">
                          {new Date(Date.parse(Item.eventDate)).toTimeString()}
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
            <h1>All Events</h1>
            <Grid container spacing={3}>
              {Events}
            </Grid>
          </div>
        </div>
        <Popups 
          option={this.state.option}
          optionValue={this.state.optionValue}
          modalShow={this.state.modalShow}
        />
      </div>
    );
  }
}

export default Events;
