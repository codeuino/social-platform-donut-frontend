import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import './AddEventModal.scss';

class AddEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.token,
      title: '',
      date: '',
      start: '',
      end: ''
    };
  }

  onTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  onStartChange = event => {
    this.setState({ start: event.target.value });
  };

  onEndChange = event => {
    console.log('end changed');
    this.setState({ end: event.target.value });
  };

  handleSubmit = () => {
    console.log(this.state.title);
    let title = this.state.title;

    let startDate = new Date(this.state.start);
    startDate = startDate.toISOString();

    let endDate = new Date(this.state.end);
    endDate = endDate.toISOString();

    fetch('http://localhost:8000/calendar/newevent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        id: this.props.calendarId,
        token: this.props.token,
        startDate: startDate,
        endDate: endDate
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
                onChange={this.onTitleChange}
              />
            </Row>
            <Row className='form-content'>
              <Col className='p-0' sm={5}>
                <Form.Label className='label'>
                  Event Starting Date/Time
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='05:15AM'
                  size='sm'
                  onChange={this.onStartChange}
                />
              </Col>
              <Col className='p-0' sm={5}>
                <Form.Label className='label'>
                  Event Ending Date/Time
                </Form.Label>
                <Form.Control
                  type='text'
                  placeholder='06:45AM'
                  size='sm'
                  onChange={this.onEndChange}
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
