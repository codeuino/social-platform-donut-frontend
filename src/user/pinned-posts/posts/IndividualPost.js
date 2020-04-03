import React from 'react';
import PropTypes from 'prop-types';
import gsoc from '../../../images/gsoc.png';

const IndividualPost = props => (
  <div className='individual-post'>
    <div className='user-info'>
      <div className='image'>
        <img src={gsoc} alt='icon' />
      </div>
      <div className='img-desc'>
        <h2>Marjorie Alexander</h2>
        <p>{props.date.toTimeString()}</p>
      </div>
    </div>
    <div className='post-details'>
      ex sit ex laboris adipisicing enim eiusmod proident exercitation ea fugiat
      in mollit pariatur occaecat ut nostrud ullamco ex official
    </div>
  </div>
);

IndividualPost.propTypes = {
  date: PropTypes.object
};

export default IndividualPost;
