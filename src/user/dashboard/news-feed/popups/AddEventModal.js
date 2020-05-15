import React from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const AddEventModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      animation={false}
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
              <Form.Control type="email" placeholder="Type here.." />
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="formGridPassword"
              className="modal__group"
            >
              <Form.Label className="modal__label">Location</Form.Label>
              <Form.Control type="password" placeholder="Where do you live?" />
            </Form.Group>
          </Form.Row>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              className="modal__group"
            >
              <Form.Label className="modal__label">Date</Form.Label>
              <Form.Control type="email" placeholder="DD/MM/YY" />
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="formGridPassword"
              className="modal__group"
            >
              <Form.Label className="modal__label">Time</Form.Label>
              <Form.Control type="password" placeholder="10:00 AM" />
            </Form.Group>
          </Form.Row>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              className="modal__group"
            >
              <Form.Label className="modal__label">Post Description</Form.Label>
              <Form.Control
                as="textarea"
                className="modal__post"
                placeholder="What do you want to tell people about the event?"
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <div className="modal__buttons">
        <Button onClick={props.handleClose} className="modal__save">
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

export default AddEventModal;
