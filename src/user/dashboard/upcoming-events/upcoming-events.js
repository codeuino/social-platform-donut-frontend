import React, { Component } from "react";
import "./upcoming-events.scss";
// import events from '../../../jsonData/upcoming-events';
import donutIcon from '../../../assets/svgs/donut-icon.svg'
import { connect } from "react-redux";
import { upcomingEvents } from '../../../actions/dashboardAction'

class UpcomingEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comingEvents: []
    }
  }

  // fetch upcoming events from the db
  componentDidMount() {
    this.props.upcomingEvents()
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps)
    this.setState({ comingEvents: nextProps.dashboard.upcomingEvents }, () => {
      console.log('upcoming events ', this.state)
    })
  }

  render() {
    let events = this.state.comingEvents;
    let upcomingEvents = events.map((event, i) => {
      return (
        <div key={i}>
          <div className="event-container"> 
            <div className="img-container">
              <img alt="event-icon" src={donutIcon}></img>
            </div>
            <div className="event-description">
              <h6>{event.eventName}</h6>
              {event.isOnline ? <button type="button" className="tag">{"Online"}</button> : <div></div>}
              <p>{event.description.shortDescription}</p>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="upcoming-events">
        <div className="text-center heading-container">
          <h5>Upcoming Events</h5>
        </div>
        <div className="all-events">
          {upcomingEvents}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  dashboard: state.dashboard
})

export default connect(mapStateToProps, { upcomingEvents })(UpcomingEvents);
