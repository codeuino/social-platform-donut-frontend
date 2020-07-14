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
    const { show, onHide, borderStyle } = this.props;
    const { eventName, shortDesc, longDesc, location } =this.state
    return (
      <Modal
        show={show}
        onHide={onHide}
        className="modal"
        animation={true}
        centered
      >
        <Modal.Header closeButton className ="modal__header" style = {borderStyle} >
          <Modal.Title className = "modal__title" style = {borderStyle} >
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
                  <Form.Label className="modal__label">Short description</Form.Label>
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
                  <Form.Label className="modal__label">Long description</Form.Label>
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
                  <Form.Label className="modal__label">Event Date</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Event date.."
                      name="date"
                      // defaultValue={this.refineDate(date)}
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
            <Button
              className="modal__cancel"
              onClick={this.props.onHide}
            >
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
