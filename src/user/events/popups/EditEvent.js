import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import "./popup.scss";
import { connect } from 'react-redux';
import { updateEvent, deleteEvent, getEventById } from '../../../actions/eventAction';
import PropTypes from 'prop-types'


class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      shortDesc: "",
      longDesc: "",
      location: "",
      date: "",
    };
  }


  componentWillReceiveProps(nextProps) {
    console.log('edit ', nextProps)
    const { eventInfo } = nextProps
    const { eventName, description, eventDate, location } = eventInfo
    this.setState({ 
      eventName: eventName, 
      shortDesc: description?.shortDescription, 
      longDesc: description?.longDescription,
      location: location,
      date: eventDate
    }, () => {
      console.log('edit state ', this.state)
    })
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  refineDate = (d) => {
    const date = d.split("T")
    const eventDate = date[0].slice(-2)
    return eventDate;
  }

  refineTime = (d) => {
    const time = d.split("T");
    const eventTime = time[1].slice(0, 5)
    return eventTime;
  }

  refineDay = (d) => {
    const day = d.slice(0, 3);
    return day;
  };

  refineYear = (d) => {
    const month = d.slice(4, 7);
    const year = d.slice(11, 15);
    return month + " " + year;
  };

  updateEvent = (e) => {
    e.preventDefault();
    console.log("Updating the event!!");
    // DISPATCH THE ACTION TO UPDATE EVENT (INTEGRATION)
    const { eventName, shortDesc, longDesc, date, location } = this.state;
    const { eventId } = this.props;
    const updatedInfo = {
      eventName,
      description: {
        shortDescription: shortDesc,
        longDescription: longDesc,
      },
      location,
      eventDate: date,
    };
    console.log('submitted data ', updatedInfo);
    this.props.updateEvent(eventId, updatedInfo);
  };

  render() {
    const { show, onHide } = this.props;
    const { eventName, shortDesc, longDesc, location } =this.state
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="container">
          <Modal.Header closeButton className="heading border border-0 p-0">
            <Modal.Title id="contained-modal-title-vcenter">
              <div className="title">Edit Event</div>
              <div className="about">Event Information</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="form-content">
              <Col className="p-0" sm={12}>
                <Form.Label className="label">Event Name</Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  placeholder="Event name.."
                  size="sm"
                  name="eventName"
                  defaultValue={eventName}
                  onChange={this.onChange}
                  required={true}
                />
              </Col>
            </Row>
            <Row className="form-content">
              <Form.Label className="label">Short description</Form.Label>
              <Form.Control
                className="form-input"
                as="textarea"
                placeholder="Write a few lines about event.."
                size="sm"
                name="shortDesc"
                defaultValue={shortDesc}
                onChange={this.onChange}
                required={true}
              />
            </Row>
            <Row className="form-content">
              <Form.Label className="label">Long description</Form.Label>
              <Form.Control
                className="form-input"
                as="textarea"
                placeholder="Write a details of event.."
                size="sm"
                name="longDesc"
                defaultValue={longDesc}
                onChange={this.onChange}
                required={true}
              />
            </Row>
            <Row>
              <Form.Label className="label">Location</Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                placeholder="Event location.."
                size="sm"
                name="location"
                defaultValue={location}
                onChange={this.onChange}
                required={true}
              />
            </Row>
            <Row>
              <Form.Label className="label">Event Date</Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                placeholder="Event date.."
                size="sm"
                name="date"
                // defaultValue={this.refineDate(date)}
                onChange={this.onChange}
                required={true}
              />
            </Row>
          </Modal.Body>
          <div className="form-footer">
            <Button onClick={this.updateEvent} className="savebtn">
              Save
            </Button>
            <Button variant="outline-primary" className="cancelbtn" onClick={this.props.onHide}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

EditEvent.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  eventId: PropTypes.string.isRequired,
  eventInfo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  status: state.status,
  error: state.error,
  event: state.event
})

export default connect(mapStateToProps, { updateEvent, deleteEvent, getEventById })((EditEvent))
