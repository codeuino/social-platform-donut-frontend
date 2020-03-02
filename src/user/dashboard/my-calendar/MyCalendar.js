import React from 'react';
import queryString from 'query-string';
import GoogleButton from 'react-google-button';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Navigation from '../navigation/navigation';
import { Modal, Row } from 'react-bootstrap';
import AddEventModal from './AddEventModal';

import './main.scss';

export default class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      dashboard: true,
      calendars: [],
      eventObj: [],
      showAddModal: false
    };
  }

  componentWillMount() {
    let query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem('jwt', query.token);
      // this.props.history.push('/');
    }
  }

  componentDidMount() {
    if (window.localStorage.getItem('jwt')) {
      fetch('http://localhost:8000/calendar/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: window.localStorage.getItem('jwt') })
      })
        .then(res => {
          return res.json();
        })
        .then(resData => {
          this.setState({
            token: window.localStorage.getItem('jwt'),
            calendars: resData.items
          });
        })
        .catch(err => {
          console.log(err);
        });

      this.fetchCalendarEvents();
    }
  }

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

  fetchCalendarEvents = () => {
    let id = '';
    this.state.calendars.forEach(calendarItem => {
      if (this.state.selectedCalendar === calendarItem.summary) {
        id = calendarItem.id;
      }
    });

    fetch('http://localhost:8000/calendar/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        token: window.localStorage.getItem('jwt')
      })
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        const events = resData.items;
        const eventsArr = [];
        events.forEach(eventItem => {
          let date = '';
          console.log(eventItem);
          if (eventItem.start !== undefined) {
            date = eventItem.start.dateTime || eventItem.start.date || '';
            let startDate = date.substring(0, 10);

            let eventObj = {
              title: eventItem.summary,
              date: startDate
            };
            eventsArr.push(eventObj);
          }
        });

        this.setState({
          eventObj: eventsArr
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleDateClick = arg => {
    this.setState({
      showAddModal: true
    });
  };

  handleEventClick = calEvent => {
    alert(calEvent.title);
  };

  closeAddModal = () => {
    this.setState({
      showAddModal: false
    });
    this.fetchCalendarEvents();
  };

  handleAddEvent = () => {
    // TO DO
  };

  render() {
    return (
      <div className='myCalendar'>
        <div className='navigation'>
          <Navigation dashboard={this.state.dashboard}></Navigation>
        </div>
        <div className='calendar'>
          {!this.state.token ? (
            <div>
              <div style={{ height: '900px', width: '800px', margin: '20px' }}>
                <FullCalendar
                  defaultView='dayGridMonth'
                  plugins={[dayGridPlugin, interactionPlugin]}
                />
              </div>
              <Modal
                show={true}
                size='md'
                aria-labelledby='contained-modal-title-vcenter'
                centered
              >
                <div className='container'>
                  <Modal.Header className='heading border border-0 p-0'>
                    <Modal.Title id='contained-modal-title-vcenter'>
                      <div className='title'>Authentication Required</div>
                    </Modal.Title>
                  </Modal.Header>
                  {/* 
                <ModalBody>
                  <div style={{ marginLeft: '100px' }}>
                    <a href='http://localhost:8000/oauth/google'>
                      <GoogleButton
                        onClick={() => {
                          console.log('moveButtonw');
                        }}
                      />
                    </a>
                  </div>
                </ModalBody> */}
                  <Modal.Body>
                    <Row className='form-content'>
                      <a
                        href='http://localhost:8000/oauth/google'
                        style={{ textDecoration: 'none' }}
                      >
                        <div>
                          <GoogleButton style={{ marginLeft: '100px' }} />
                        </div>
                      </a>
                    </Row>
                  </Modal.Body>
                </div>
              </Modal>
            </div>
          ) : (
            <div style={{ height: '900px', width: '95%', margin: '20px' }}>
              <FullCalendar
                defaultView='dayGridMonth'
                plugins={[dayGridPlugin, interactionPlugin]}
                events={this.state.eventObj}
                dateClick={this.handleDateClick}
                eventClick={function(calEvent, jsEvent, view, resourceObj) {
                  console.log(calEvent);
                }}
              />
              <AddEventModal
                show={this.state.showAddModal}
                onClick={this.handleAddEvent}
                onHide={this.closeAddModal}
                token={this.state.token}
                calendarId={this.state.selectedCalendar}
              />
            </div>
          )}
        </div>
        <div className='side-bar'>
          <h4 id='control-panel' className='title'>
            Control Panel
          </h4>

          <div>
            <h6 className='text-content'>Choose a calendar to display</h6>
            <select className='custom-select' onChange={this.handleChange}>
              {this.state.calendars.map((current, index) => {
                return <option key={index}>{current.summary}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}
