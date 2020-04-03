import React, { Component } from 'react';
import './organization.scss';
import Navigation from '../dashboard/navigation/Navigation';
import OrgInfo from './org-info/OrgInfo';
import Portfolio from '../dashboard/portfolio/Portfolio';
import Posts from '../pinned-posts/posts/Posts';

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org: true
    };
  }

  render() {
    return (
      <div className='organization'>
        <div className='navigation'>
          <Navigation org={this.state.org}></Navigation>
        </div>
        <div className='news'>
          <div className='notify-user'>
            <OrgInfo></OrgInfo>
            <Portfolio></Portfolio>
          </div>
          <div className='posts-profile'>
            <Posts></Posts>
          </div>
        </div>
      </div>
    );
  }
}

export default Organization;
