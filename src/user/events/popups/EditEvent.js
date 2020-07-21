import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import "./popup.scss";
import { connect } from 'react-redux';
import { updateEvent, deleteEvent, getEventById } from '../../../actions/eventAction';
import PropTypes from 'prop-types'
import moment from 'moment'


class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      shortDesc: "",
      longDesc: "",
      location: "",
      date: "",
      eventTime: '',
      trigger: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('edit ', nextProps)
    const { eventInfo } = nextProps
    const { eventName , description, eventDate, location, eventTime } = eventInfo
    this.setState({ 
      eventName: eventName || "", 
      shortDesc: description?.shortDescription || "", 
      longDesc: description?.longDescription || "",
      location: location || "",
      date: eventDate || "",
      eventTime: eventTime || ""
    }, () => {
      console.log('edit state ', this.state)
    })
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  updateEvent = (e) => {
    e.preventDefault();
    console.log("Updating the event!!");
    // DISPATCH THE ACTION TO UPDATE EVENT (INTEGRATION)
    const { eventName, shortDesc, longDesc, date, location, eventTime } = this.state;
    const { eventId } = this.props;
    const updatedInfo = {
      eventName,
      description: {
        shortDescription: shortDesc,
        longDescription: longDesc,
      },
      location,
      eventDate: date,
      eventTime
    };
    console.log('submitted data ', updatedInfo);
    this.props.updateEvent(eventId, updatedInfo);
  };

  render() {
    const { show, onHide, borderStyle } = this.props;
    const { eventName, shortDesc, longDesc, location, date, eventTime } =this.state
    return (
      <Modal
        show={show}
        onHide={onHide}
        className="modal"
        animation={true}
        centered
      >
        <Modal.Header closeButton className="modal__header" style={borderStyle}>
          <Modal.Title className="modal__title" style={borderStyle}>
            <div className="modal__main-title">Edit Event</div>
            <div className="modal__mini-title">Event Information</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <Form className="modal__form">
            <Form.Row className="modal__row">
              <Form.Group className="modal__group" as={Col}>
                <Form.Label className="modal__label">Event Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Event name.."
                  name="eventName"
                  defaultValue={eventName}
                  onChange={this.onChange}
                  required={true}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="modal__row">
              <Form.Group className="modal__group" as={Col}>
                <Form.Label className="modal__label">
                  Short description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Write a few lines about event.."
                  name="shortDesc"
                  defaultValue={shortDesc}
                  onChange={this.onChange}
                  required={true}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="modal__row">
              <Form.Group className="modal__group" as={Col}>
                <Form.Label className="modal__label">
                  Long description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Write a details of event.."
                  name="longDesc"
                  defaultValue={longDesc}
                  onChange={this.onChange}
                  required={true}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="modal__row">
              <Form.Group className="modal__group" as={Col}>
                <Form.Label className="modal__label">Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Event location.."
                  name="location"
                  defaultValue={location}
                  onChange={this.onChange}
                  required={true}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="modal__row">
              <Form.Group className="modal__group" as={Col}>
                <Form.Label className="modal__label">Event Time</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="HH:MM"
                  name="eventTime"
                  value={eventTime}
                  onChange={this.onChange}
                  required={true}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="modal__row">
              <Form.Group className="modal__group" as={Col}>
                <Form.Label className="modal__label">Event Date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="YYYY/MM/DD"
                  name="date"
                  value={moment(date).format("YYYY/MM/DD")}
                  onChange={this.onChange}
                  required={true}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <div className="modal__buttons">
          <Button onClick={this.updateEvent} className="modal__save">
            <span className="modal__buttontext">Save</span>
          </Button>
          <Button className="modal__cancel" onClick={this.props.onHide}>
            <span className="modal__buttontext">Cancel</span>
          </Button>
        </div>
      </Modal>
    );
  }
}

EditEvent.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  eventId: PropTypes.string,
  eventInfo: PropTypes.object
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  status: state.status,
  error: state.error,
  event: state.event
})

export default connect(mapStateToProps, { updateEvent, deleteEvent, getEventById })((EditEvent))
