import React,  { useState, useEffect } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { createEvent } from '../../../../actions/dashboardAction';

const AddEventModal = (props) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [eventTime, setEventTime] = useState("");

  const onEventName = (event) => {
    setEventName(event.target.value);
  };
  const onEventDate = (event) => {
    setEventDate(event.target.value);
  };
  const onEventLocation = (event) => {
    setLocation(event.target.value);
  };
  const onShortDesc = (event) => {
    setShortDescription(event.target.value);
  };
  const onLongDesc = (event) => {
    setLongDescription(event.target.value);
  };
  const onEventTime = (event) => {
    setEventTime(event.target.value)
  }
  const onCreateEventClick = () => {
    const obj = {
      location,
      eventName,
      eventDate,
      description: {
        shortDescription,
        longDescription
      }
    }
    props.createEvent(obj)
    props.handleClose()
  }

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      animation={true}
      className="modal"
      centered
    >
      <Modal.Header
        closeButton
        className="modal__header"
        style={props.borderStyle}
      >
        <Modal.Title className="modal__title" style={props.borderStyle}>
          <div className="modal__main-title">New Event</div>
          <div className="modal__mini-title">ABOUT THE EVENT</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body" style={props.borderStyle}>
        <Form className="modal__form" style={props.borderStyle}>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              className="modal__group"
            >
              <Form.Label className="modal__label">Event Name</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Type here.."
                onChange={onEventName}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="formGridPassword"
              className="modal__group"
            >
              <Form.Label className="modal__label">Location</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Event location"
                onChange={onEventLocation}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              className="modal__group"
            >
              <Form.Label className="modal__label">Date</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="DD/MM/YY"
                onChange={onEventDate}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="formGridPassword"
              className="modal__group"
            >
              <Form.Label className="modal__label">Time</Form.Label>
              <Form.Control 
                type="text"
                placeholder="10:00 AM"
                onChange={onEventTime}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              className="modal__group"
            >
              <Form.Label className="modal__label">Event Description</Form.Label>
              <Form.Control
                as="textarea"
                className="modal__post"
                placeholder="Short description"
                onChange={onShortDesc}
              /><br />
              <Form.Control
                as="textarea"
                className="modal__post"
                placeholder="Long description"
                onChange={onLongDesc}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <div className="modal__buttons">
        <Button Button onClick = {onCreateEventClick}
        className = "modal__save" >
          <span className="modal__buttontext">Save</span>
        </Button>
        <Button onClick={props.handleClose} className="modal__cancel">
          <span className="modal__buttontext">Cancel</span>
        </Button>
      </div>
    </Modal>
  );
};

AddEventModal.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.bool,
  style: PropTypes.object,
};

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  dashboard: state.dashboard
})

export default connect(mapStateToProps, { createEvent })(AddEventModal);
