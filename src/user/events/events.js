import React, { Component } from "react";
import Navigation from "../dashboard/navigation/navigation";
import { Grid ,CardActions, Card} from "@material-ui/core";
import Event_list from "../../jsonData/events";
import { Row, Col } from "react-bootstrap";
import "./events.scss";
import Popups from './popups/popups';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: true,
    modalShow: false,
    optionValue: {}
    }
  }

  render() {
    const setOptionValue = (targetId) => {
        const event = Event_list.filter(
      (x) => x._id === targetId
    );         
          this.setState({optionValue: event[0]})
    }
    const handleToggle = (e) => {
      const targetId = e.target.id;
      console.log("-handletoggel",targetId)
      this.setState({
        modalShow: true
      });
      setOptionValue(targetId);
    }
    var RefinedDay = (d) => {
      const day = d.slice(0, 3);
      return day;
    };

    var RefinedYear = (d) => {
      const month = d.slice(4, 7);
      const year = d.slice(11, 15);
      return month + " " + year;
    };
    let Events = Event_list.map((Item) => (
      <Grid item xs={6} sm={4}>
        {Date.parse(Item.eventDate) >= Date.parse(new Date()) ? (
          <Card>
            <CardActions>
              <Grid container spacing={1}>
                <Row>
                  <Col xs={2}>
                    {Item.isCancelled ? (
                      <div className="cancelled">{""}</div>
                    ) : (
                      <div className="div1">{""}</div>
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
               <span><a href="javascript:void(0)" onClick={handleToggle} style={{float: "right"}} id={Item._id}>See More</a></span>
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
                    <div className="div4">{""}</div>
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
                   <span><a href="javascript:void(0)" onClick={handleToggle} style={{float: "right"}} id={Item._id}>See More</a></span>
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
