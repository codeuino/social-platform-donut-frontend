import React, { Component } from "react";
import "./dashboard.scss";
import Navigation from "./navigation/navigation";
import UpcomingEvents from "./upcoming-events/upcoming-events";
import Notifications from "./notifications/notifications";
import Portfolio from "./portfolio/portfolio";
import NewsFeed from "./news-feed/news-feed";
import Updates from "./updates/updates";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: true
    };
  }

  render() {
    return (
      <div className="dashboard">
        <div className="navigation">
          <Navigation dashboard={this.state.dashboard}></Navigation>
        </div>
        <div className="main-content">
          <div className="news">
            <div className="notify-user">
              <UpcomingEvents></UpcomingEvents>
              <Notifications></Notifications>
            </div>
            <NewsFeed></NewsFeed>
          </div>
          <div className="promotions">
            <Portfolio></Portfolio>
            <Updates></Updates>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;