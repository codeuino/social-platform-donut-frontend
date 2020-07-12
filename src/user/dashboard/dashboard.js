import React, { Component } from "react";
import "./dashboard.scss";
import Navigation from "./navigation/navigation";
import UpcomingEvents from "./upcoming-events/upcoming-events";
import Notifications from "./notifications/notifications";
import Portfolio from "./portfolio/portfolio";
import NewsFeed from "./news-feed/news-feed";
import notifyUsersLoading from "../../placeholderLoading/notifyUsersLoading/notifyUsersLoading";
import portfolioLoading from "../../placeholderLoading/portfolioLoading/portfolioLoading";
import newsFeedLoading from "../../placeholderLoading/newsFeedLoading/newsFeedLoading";
import { connect } from 'react-redux'
import { getAllEvents } from "../../actions/eventAction";
import { getAllPosts } from "../../actions/postAction";
import { getAllProjects } from "../../actions/projectAction";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: true,
      isLoading: true,
      allPosts: [],
      allProjects: [],
      allEvents: [],
      allMix: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.getAllEvents();
    })
    setTimeout(() => {
      this.props.getAllPosts()
    })
    setTimeout(() => {
      this.props.getAllProjects()
    })
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    console.log('dashboard ', nextProps)
    const { event, project, post } = nextProps
    let all = [...event?.allEvents, ...post?.allPosts, ...project?.allProjects]
    this.setState({
      allEvents: event?.allEvents,
      allPosts: post?.allPosts,
      allProjects: project?.allProjects,
      allMix: all
    }, () => {
      console.log('updated dashboard ', this.state)
    })
  }

  render() {
    const { allMix, allEvents, allProjects, allPosts } = this.state
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
          {this.state.isLoading ? newsFeedLoading() : <NewsFeed allMix={allMix} allProjects={allProjects} allPosts={allPosts} allEvents={allEvents}/>}
        </div>
        <div className="promotions">
          {this.state.isLoading ? portfolioLoading() : <Portfolio />}
        </div>
      </div>
    );
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  event: state.event,
  post: state.post,
  project: state.project
})

export default connect(mapStateToProps, { getAllEvents, getAllPosts, getAllProjects })(Dashboard);
