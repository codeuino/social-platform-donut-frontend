import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const EventItem = props => (
  <div className='event-image-container'>
    <img src={props.newsItem.eventImage} />
    <div className='event-jumbotron'>
      <div className='event-details'>
        <h3>{props.newsItem.eventName}</h3>
        <div className='event-schedule'>
          <div className='event-date'>
            <div className='date-content'>
              <small>DATE</small>
              <h4>25</h4>
              <h5>Dec</h5>
              <h6>2020</h6>
            </div>
          </div>

          <div className='event-time'>
            <div className='time-content'>
              <small>TIME</small>
              <h4>10</h4>
              <h5>PM</h5>
              <h6>Onwards</h6>
            </div>
          </div>
        </div>
        <div className='tag-container'>
          <Button className='tag-btn'>+1 RSVP</Button>
        </div>
      </div>
    </div>
  </div>
);

EventItem.propTypes = {
  newsItem: PropTypes.object
};

export default EventItem;
