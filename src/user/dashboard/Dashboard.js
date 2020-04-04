import React, { Component } from 'react';
import './dashboard.scss';
import Navigation from './navigation/Navigation';
import UpcomingEvents from './upcoming-events/UpcomingEvents';
import Notifications from './notifications/Notifications';
import Portfolio from './portfolio/Portfolio';
import NewsFeed from './news-feed/NewsFeed';
import Updates from './updates/Updates';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: true
    };
  }

  render() {
    return (
      <div className='dashboard'>
        <div className='navigation'>
          <Navigation dashboard={this.state.dashboard}></Navigation>
        </div>
        <div className='news'>
          <div className='notify-user'>
            <UpcomingEvents></UpcomingEvents>
            <Notifications></Notifications>
          </div>
          <NewsFeed></NewsFeed>
        </div>
        <div className='promotions'>
          <Portfolio></Portfolio>
          <Updates></Updates>
        </div>
      </div>
    );
  }
}

export default Dashboard;
