import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const NewsItem = props => (
  <div className='project-image-container'>
    <img src={props.newsItem.eventImage} />
    <div className='project-jumbotron'>
      <div className='project-details'>
        <h3>{props.newsItem.projectName}</h3>
        <p>By {props.newsItem.projectOwner}</p>
        <div className='view-project-btn-container'>
          <Button className='view-project-btn text-center'>View Project</Button>
        </div>
      </div>
    </div>
  </div>
);

NewsItem.propTypes = {
  newsItem: PropTypes.object
};

export default NewsItem;
