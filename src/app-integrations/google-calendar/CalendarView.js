import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddEventModal from './AddEventModal';
import './CalendarView.scss';

class CalendarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      eventModalStatus: false,
      eventDetails: { title: '', start: '', end: '' }
    };
  }

  handleDateClick = () => {
    this.setState({
      showAddModal: true
    });
  };

  closeAddModal = () => {
    this.setState({
      showAddModal: false
    });
    this.props.fetchEvents();
  };

  handleDateClick = arg => {
    this.setState({
      showAddModal: true
    });
  };

  handleEventClick = arg => {
    console.log(arg);
    let eventDetails = {
      title: arg.event.title,
      start: arg.event.start,
      end: JSON.stringify(arg.event.end)
    };
    this.setState({
      eventModalStatus: true,
      eventDetails: eventDetails
    });
  };

  closeEventModal = () => {
    this.setState({
      eventModalStatus: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className='calendar-container'>
          <FullCalendar
            defaultView='dayGridMonth'
            plugins={[dayGridPlugin, interactionPlugin]}
            events={this.props.events}
            dateClick={this.handleDateClick}
            eventClick={this.handleEventClick}
          ></FullCalendar>
        </div>
        <AddEventModal
          show={this.state.showAddModal}
          onHide={this.closeAddModal}
          eventDetails={this.state.eventDetails}
          token={this.props.token}
          calendarId={this.props.selectedCalendar}
        />
      </React.Fragment>
    );
  }
}

export default CalendarView;
