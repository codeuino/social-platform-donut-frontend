import React, { Component } from 'react';
import Navigation from '../../user/dashboard/navigation/navigation';
import queryString from 'query-string';
import './CalendarDashboard.scss';
import { Tabs, Tab, Button, Badge } from 'react-bootstrap';
import AuthenticationModal from './AuthenticationModal';
import CalendarView from './CalendarView';

class CalendarDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'home',
      calendars: [],
      eventObj: [],
      tomorrowEventObj: [],
      alleventsObj: [],
      visibleEventsArr: [],
      selectedDate: 'today',
      initialLoad: true,
      selectedCalendarId: ''
    };
  }

  setKey = k => {
    this.setState({
      key: k
    });
  };

  componentWillMount() {
    let query = queryString.parse(this.props.location.search);
    if (query.googleId) {
      window.localStorage.setItem('googleId', query.googleId);
    }
  }

  componentDidMount() {
    if (window.localStorage.getItem('googleId')) {
      fetch('http://localhost:8000/calendar/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          googleId: window.localStorage.getItem('googleId')
        })
      })
        .then(res => {
          return res.json();
        })
        .then(resData => {
          this.setState(
            {
              googleId: window.localStorage.getItem('googleId'),
              calendars: resData.items
            },
            () => {
              this.fetchCalendarEvents();
            }
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  // componentWillUnmount() {
  //   window.localStorage.removeItem('jwt');
  // }

  fetchCalendarEvents = () => {
    let id = '';

    if (this.state.initialLoad) {
      id = this.state.calendars[0].id;
    } else {
      this.state.calendars.forEach(calendarItem => {
        if (this.state.selectedCalendar === calendarItem.summary) {
          id = calendarItem.id;
        }
      });
    }

    fetch('http://localhost:8000/calendar/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        googleId: window.localStorage.getItem('googleId')
      })
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        const events = resData.items;
        const eventsArr = [];
        const tomorrowEventsArr = [];
        const allEventsArr = [];

        let tomorrowDate = new Date();
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);

        events.forEach(eventItem => {
          let hangoutLink;
          let responseStatus;
          let date = '';

          if (eventItem.start !== undefined) {
            date = eventItem.start.dateTime || eventItem.start.date || '';
            let startDate = date.substring(0, 10);
            if (eventItem.hangoutLink) {
              hangoutLink = eventItem.hangoutLink;
            }

            if (eventItem.creator.self === true) {
              responseStatus = 'accepted';
            } else if (eventItem.attendees) {
              responseStatus = eventItem.attendees[0].responseStatus;
            }

            if (new Date().toISOString().substring(0, 10) === startDate) {
              let eventObj = {
                title: eventItem.summary,
                date: startDate,
                status: responseStatus,
                start: eventItem.start.dateTime.substring(11),
                end: eventItem.end.dateTime.substring(11),
                hangoutLink: hangoutLink
              };
              eventsArr.push(eventObj);
            } else if (
              tomorrowDate.toISOString().substring(0, 10) === startDate
            ) {
              let eventObj = {
                title: eventItem.summary,
                date: startDate,
                status: responseStatus,
                start: eventItem.start.dateTime.substring(11),
                end: eventItem.end.dateTime.substring(11),
                hangoutLink: hangoutLink
              };
              tomorrowEventsArr.push(eventObj);
            }
            console.log(eventItem);
            let eventObj = {
              title: eventItem.summary,
              date: startDate,
              start: eventItem.start.dateTime || eventItem.start.date || '',
              end: eventItem.end.dateTime || eventItem.end.date || ''
            };

            allEventsArr.push(eventObj);
          }
        });

        this.setState(
          {
            eventObj: eventsArr,
            tomorrowEventObj: tomorrowEventsArr,
            alleventsObj: allEventsArr,
            visibleEventsArr: eventsArr,
            selectedDate: 'today',
            initialLoad: false,
            selectedCalendarId: id
          },
          () => {
            console.log(this.state.alleventsObj);
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    this.setState(
      {
        selectedCalendar: event.target.value
      },
      () => {
        this.fetchCalendarEvents();
      }
    );
  };

  closeAddModal = () => {
    this.setState({
      showAddModal: false
    });
    this.fetchCalendarEvents();
  };

  handleTodayClick = () => {
    this.setState({
      selectedDate: 'today',
      visibleEventsArr: this.state.eventObj
    });
  };

  handleTomorrowClick = () => {
    this.setState({
      selectedDate: 'tomorrow',
      visibleEventsArr: this.state.tomorrowEventObj
    });
  };

  render() {
    return (
      <div className='dashboard'>
        <div className='navigation'>
          <Navigation dashboard={this.state.dashboard}></Navigation>
        </div>
        <div className='calendar-content'>
          <div className='content'>
            <div className='title'>
              <h2 className='text'>
                <img src='./google-calendar.jpeg' style={{ height: '50px' }} />
                Google Calendar
              </h2>
            </div>
            <div className='tab'>
              <Tabs
                id='tabs'
                activeKey={this.key}
                onSelect={k => this.setKey(k)}
              >
                <Tab eventKey='home' title='Home'>
                  <div id='top-panel'>
                    <div id='button-container'>
                      <Button
                        variant='outline-dark'
                        className={
                          this.state.selectedDate === 'today'
                            ? 'set-btn active'
                            : 'set-btn'
                        }
                        onClick={this.handleTodayClick}
                      >
                        Today
                      </Button>
                      <Button
                        variant='outline-dark'
                        className={
                          this.state.selectedDate === 'tomorrow'
                            ? 'set-btn active'
                            : 'set-btn'
                        }
                        onClick={this.handleTomorrowClick}
                      >
                        Tomorrow
                      </Button>
                    </div>
                    <div id='select-container'>
                      <select
                        className='custom-select'
                        onChange={this.handleChange}
                      >
                        {this.state.calendars.map((current, index) => {
                          return <option key={index}>{current.summary}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className='tab-content'>
                    <div id='bottom-panel'>
                      {this.state.visibleEventsArr.length !== 0 ? (
                        this.state.visibleEventsArr.map(
                          (eventElement, index) => {
                            return (
                              <div className='event' key={index}>
                                <h5 id='event-title'>
                                  {eventElement.title}{' '}
                                  {eventElement.status === 'accepted' ? (
                                    <Badge variant='success'>Accepted</Badge>
                                  ) : (
                                    <Badge variant='danger'>Declined</Badge>
                                  )}
                                </h5>
                                <p>
                                  From {eventElement.start} GMT to{' '}
                                  {eventElement.end} GMT
                                </p>
                                {eventElement.hangoutLink ? (
                                  <a href={eventElement.hangoutLink}>
                                    <Button variant='outline-success'>
                                      Join Hangout Meeting
                                    </Button>
                                  </a>
                                ) : (
                                  <React.Fragment></React.Fragment>
                                )}
                              </div>
                            );
                          }
                        )
                      ) : (
                        <div className='event'>
                          <h5 id='event-title'>No events planned</h5>
                          <p>
                            Choose another calendar or add an event in the
                            calendar view!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Tab>
                <Tab eventKey='contact' title='Calendar View'>
                  <CalendarView
                    events={this.state.alleventsObj}
                    googleId={this.state.googleId}
                    fetchEvents={this.fetchCalendarEvents}
                    selectedCalendar={this.state.selectedCalendarId}
                    onHide={this.closeAddModal}
                  />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        {!this.state.googleId ? (
          <AuthenticationModal />
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    );
  }
}

export default CalendarDashboard;
