import React, { Component } from 'react';
import './profile.scss';
import Navigation from '../dashboard/navigation/Navigation';
import UserInfo from './user-info/UserInfo';
import Portfolio from '../dashboard/portfolio/Portfolio';
import Posts from '../pinned-posts/posts/Posts';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: true
    };
  }

  render() {
    return (
      <div className='profile'>
        <div className='navigation'>
          <Navigation profile={this.state.profile}></Navigation>
        </div>
        <div className='news'>
          <div className='notify-user'>
            <UserInfo></UserInfo>
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

export default Profile;
