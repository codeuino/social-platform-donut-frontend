import React, { Component } from 'react';
import './posts.scss';
import IndividualPost from './IndividualPost';

class Posts extends Component {
  state = { date: new Date() };
  render() {
    return (
      <div className='posts'>
        <div className='pinned-posts'>
          <div className='categories'>
            <div className='category-type active'>All</div>
            <div className='category-type'>Donuts</div>
            <div className='category-type'>Events</div>
            <div className='category-type'>Projects</div>
          </div>
          <div className='article-posts'>
            <IndividualPost date={this.state.date} />
            <IndividualPost date={this.state.date} />
          </div>
        </div>
      </div>
    );
  }
}

export default Posts;
