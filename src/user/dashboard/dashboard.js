import React, { Component } from "react";
import "./dashboard.scss";
import Navigation from "./navigation/navigation";
import UpcomingEvents from "./upcoming-events/upcoming-events";
import Notifications from "./notifications/notifications";
import Portfolio from "./portfolio/portfolio";
import NewsFeed from "./news-feed/news-feed";
import Updates from "./updates/updates";
import orgUpdatesLoading from "../../placeholderLoading/orgUpdatesLoading/orgUpdatesLoading";
import notifyUsersLoading from "../../placeholderLoading/notifyUsersLoading/notifyUsersLoading";
import portfolioLoading from "../../placeholderLoading/portfolioLoading/portfolioLoading";
import newsFeedLoading from "../../placeholderLoading/newsFeedLoading/newsFeedLoading";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: true,
      isLoading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }

  render() {
    return (
      <div className="dashboard">
        <div className="navigation">
          <Navigation dashboard={this.state.dashboard}></Navigation>
        </div>
        <div className="news">
          {this.state.isLoading ? (
            notifyUsersLoading()
          ) : (
            <div className="notify-user">
              <UpcomingEvents></UpcomingEvents>
              <Notifications></Notifications>
            </div>
          )}
          {this.state.isLoading ? newsFeedLoading() : <NewsFeed></NewsFeed>}
        </div>
        <div className="promotions">
          {this.state.isLoading ? portfolioLoading() : <Portfolio></Portfolio>}
          {this.state.isLoading ? orgUpdatesLoading() : <Updates></Updates>}
        </div>
      </div>
    );
  }
}

export default Dashboard;
