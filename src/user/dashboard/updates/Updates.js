import React from 'react';
import './updates.scss';
import gsoc from '../../../images/gsoc.png';

const Notification = () => (
  <div className='notification'>
    <div className='image'>
      <img src={gsoc} alt='icon' />
    </div>
    <div className='img-desc'>
      <h2>We got into Gsoc</h2>
      <p>No errors to display with the current filters applied.</p>
    </div>
  </div>
);

const Updates = props => {
  return (
    <div className='updates'>
      <div className='org-updates'>
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </div>
    </div>
  );
};

export default Updates;
