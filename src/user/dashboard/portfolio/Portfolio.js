import React from 'react';
import './portfolio.scss';

const data1 = {
  title1: 'Donuts',
  count1: 401,
  title2: 'Events Organized',
  count2: 59
};

const data2 = {
  title1: 'Followers',
  count1: 123,
  title2: 'Events Attended',
  count2: 87
};

const data3 = {
  title1: 'Projects',
  count1: 12,
  title2: 'Events Organized',
  count2: 59
};

const ItemList = props => {
  return (
    <div className='items-list'>
      <div className='item'>
        <h1>
          <b>{props.data.count1}</b>
        </h1>
        <h3>{props.data.title1}</h3>
      </div>
      <div className='item'>
        <h1>
          <b>{props.data.count2}</b>
        </h1>
        <h3>{props.data.title2}</h3>
      </div>
    </div>
  );
};

const Portfolio = props => {
  return (
    <div className='portfolio'>
      <ItemList data={data1} />
      <ItemList data={data2} />
      <ItemList data={data3} />
    </div>
  );
};
export default Portfolio;
