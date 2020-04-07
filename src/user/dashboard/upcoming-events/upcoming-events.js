import React, { Component } from "react";
import "./upcoming-events.scss";
import events from '../../../jsonData/upcoming-events';

class UpcomingEvents extends Component {
  render() {
    let upcomingEvents = events.map((event,i)=>{
      return (
        <div key={i}>
          <div className="event-container"> 
            <div className="img-container">
              <img alt="event-icon" src={event.imgSrc}></img>
            </div>
            <div className="event-description">
              <h6>{event.createdBy}</h6>
              {event.tag ? <button type="button" className="tag">{event.tag}</button> : <div></div>}
              <p>{event.description}</p>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="upcoming-events">
        <div className="text-center heading-container">
          <h5>Upcoming Events</h5>
        </div>
        <div className="all-events">
          {upcomingEvents}
        </div>
      </div>
    );
  }
}

export default UpcomingEvents;
