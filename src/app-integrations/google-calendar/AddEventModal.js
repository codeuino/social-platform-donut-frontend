import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import './AddEventModal.scss';
import validator from 'validator';

class AddEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleId: this.props.googleId,
      title: '',
      date: '',
      start: '',
      end: '',
      errors: [
        {
          eventTitle: [
            {
              lengthError: 'Event must have a valid title.',
              display: true
            }
          ]
        },
        {
          eventDate: [
            {
              lengthError: 'Event must have a valid date.',
              display: true
            },
            {
              invalidDateError:
                'The entered dates must be in YYYY-MM-DD format.',
              display: false
            }
          ]
        },
        {
          eventTime: [
            {
              lengthError:
                'The event must have a valid starting and ending time',
              display: true
            },
            {
              invalidTimeError: 'The entered time must be in HH:MM format',
              display: false
            }
          ]
        }
      ]
    };
  }

  componentDidMount() {}

  handleChanges = event => {
    let value = event.target.value;
    let errors = this.state.errors;
    switch (event.target.name) {
      case 'title':
        if (value.length > 0) {
          errors[0].eventTitle[0].display = false;
        } else {
          errors[0].eventTitle[0].display = true;
        }
        break;
      case 'start':
        if (value.length > 0) {
          errors[1].eventDate[0].display = false;
        } else if (!value.length > 0) {
          errors[1].eventDate[0].display = true;
        }
        if (value.length !== 10 && value.length > 0) {
          errors[1].eventDate[1].display = true;
        } else {
          errors[1].eventDate[1].display = false;
        }
        break;
      case 'startTime':
        if (value.length > 0) {
          errors[2].eventTime[0].display = false;
        } else {
          errors[2].eventTime[0].display = true;
        }
        if (
          value.length === 5 &&
          value.split(':')[0] <= 24 &&
          value.split(':')[1] <= 59
        ) {
          errors[2].eventTime[1].display = false;
        } else {
          errors[2].eventTime[1].display = true;
        }
        break;
      default:
        break;
    }
    this.setState({ [event.target.name]: event.target.value, errors: errors });
  };

  handleSubmit = () => {
    let title = this.state.title;

    let timezoneUnedited = new Date().toString().match(/([-\+][0-9]+)\s/)[1];
    let timeZone =
      timezoneUnedited.substring(0, 3) + ':' + timezoneUnedited.substring(3);

    let startDTString =
      this.state.start + 'T' + this.state.startTime + ':00' + timeZone;

    let endDTString =
      this.state.end + 'T' + this.state.endTime + ':00' + timeZone;

    fetch('http://localhost:8000/calendar/newevent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        id: this.props.calendarId,
        googleId: this.props.googleId,
        startDate: startDTString,
        endDate: endDTString
      })
    })
      .then(data => {
        return data.json().then(resData => {
          console.log(resData);
          this.props.onHide();
        });
      })
      .catch();
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        size='md'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <div className='container'>
          <Modal.Header className='heading border border-0 p-0'>
            <Modal.Title id='contained-modal-title-vcenter'>
              <div className='title'>Add Event</div>
              <div className='about'>Event Details</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className='form-content'>
              <Form.Label className='label'>Event Title</Form.Label>
              <Form.Control
                as='textarea'
                rows='1'
                type='text'
                placeholder='Enter the event title'
                size='sm'
                onChange={this.handleChanges}
                name='title'
              />
              <Form.Label
                className='errortext'
                style={{
                  display: this.state.errors[0].eventTitle[0].display
                    ? 'inline'
                    : 'none'
                }}
              >
                {this.state.errors[0].eventTitle[0].lengthError}
              </Form.Label>
            </Row>
            <Row className='form-content'>
              <Col className='p-0' sm={5}>
                <Form.Label className='label'>Event Starting Date</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='2020-01-01'
                  size='sm'
                  onChange={this.handleChanges}
                  name='start'
                />
                <Form.Label
                  className='errortext'
                  style={{
                    display: this.state.errors[1].eventDate[0].display
                      ? 'inline'
                      : 'none'
                  }}
                >
                  {this.state.errors[1].eventDate[0].lengthError}
                </Form.Label>
                <Form.Label
                  className='errortext'
                  style={{
                    display: this.state.errors[1].eventDate[1].display
                      ? 'inline'
                      : 'none'
                  }}
                >
                  {this.state.errors[1].eventDate[1].invalidDateError}
                </Form.Label>
              </Col>
              <Col className='p-0' sm={5}>
                <Form.Label className='label'>Event Ending Date</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='2020-01-02'
                  size='sm'
                  onChange={this.handleChanges}
                  name='end'
                />
              </Col>
            </Row>
            <Row className='form-content'>
              <Col className='p-0' sm={5}>
                <Form.Label className='label'>Event Starting Time</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='22:00'
                  size='sm'
                  onChange={this.handleChanges}
                  name='startTime'
                />
                <Form.Label
                  className='errortext'
                  style={{
                    display: this.state.errors[2].eventTime[0].display
                      ? 'inline'
                      : 'none'
                  }}
                >
                  {this.state.errors[2].eventTime[0].lengthError}
                </Form.Label>
                <Form.Label
                  className='errortext'
                  style={{
                    display: this.state.errors[2].eventTime[1].display
                      ? 'inline'
                      : 'none'
                  }}
                >
                  {this.state.errors[2].eventTime[1].invalidTimeError}
                </Form.Label>
              </Col>
              <Col className='p-0' sm={5}>
                <Form.Label className='label'>Event Ending Time</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='23:00'
                  size='sm'
                  onChange={this.handleChanges}
                  name='endTime'
                />
              </Col>
            </Row>
          </Modal.Body>
          <div className='form-footer'>
            <Button onClick={this.handleSubmit} className='savebtn'>
              Save
            </Button>
            <Button variant='outline-primary' onClick={this.props.onHide}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddEventModal;
