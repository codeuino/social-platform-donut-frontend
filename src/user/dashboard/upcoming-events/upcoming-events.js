import React, { Component } from "react";
import "./upcoming-events.scss";
import profileImg from '../../../svgs/profile-icon.svg';

const events = [
  {
    _id: 1,
    imgSrc: profileImg,
    createdBy: 'Julian Richards',
    description: 'Lorem ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.',
    tag: '+1 RSVP'
  },
  {
    _id: 2,
    imgSrc: profileImg,
    createdBy: 'Julian Richards',
    description: 'Lorem ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.',
    tag: ''
  },
  {
    _id: 3,
    imgSrc: profileImg,
    createdBy: 'Julian Richards',
    description: 'Lorem ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.',
    tag: '+1 RSVP'
  },
  {
    _id: 4,
    imgSrc: profileImg,
    createdBy: 'Julian Richards',
    description: 'Lorem ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.',
    tag: ''
  },
  {
    _id: 5,
    imgSrc: profileImg,
    createdBy: 'Julian Richards',
    description: 'Lorem ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.',
    tag: ''
  },
  {
    _id: 6,
    imgSrc: profileImg,
    createdBy: 'Julian Richards',
    description: 'Lorem ipsum dolor sit amet, duo esse augue torgatos te, ius an nisi deterruisset.',
    tag: ''
  }
]

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
