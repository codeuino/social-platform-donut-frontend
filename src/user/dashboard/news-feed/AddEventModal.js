import React from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddEventModal = props => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      animation={false}
      className='modal-box'
    >
      <Modal.Header
        closeButton
        className='modal-header'
        style={props.borderStyle}
      >
        <Modal.Title className='modal-title' style={props.borderStyle}>
          <div className='main'>New Event</div>
          <div className='mini'>ABOUT THE EVENT</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-body' style={props.borderStyle}>
        <Form className='modal-form' style={props.borderStyle}>
          <Form.Row className='modal-row'>
            <Form.Group
              as={Col}
              controlId='formGridEmail'
              className='modal-group'
            >
              <Form.Label className='form-label'>Event Name</Form.Label>
              <Form.Control type='email' placeholder='Type here..' />
            </Form.Group>

            <Form.Group
              as={Col}
              controlId='formGridPassword'
              className='modal-group'
            >
              <Form.Label className='form-label'>Location</Form.Label>
              <Form.Control type='password' placeholder='Where do you live?' />
            </Form.Group>
          </Form.Row>
          <Form.Row className='modal-row'>
            <Form.Group
              as={Col}
              controlId='formGridEmail'
              className='modal-group'
            >
              <Form.Label className='form-label'>Date</Form.Label>
              <Form.Control type='email' placeholder='DD/MM/YY' />
            </Form.Group>

            <Form.Group
              as={Col}
              controlId='formGridPassword'
              className='modal-group'
            >
              <Form.Label className='form-label'>Time</Form.Label>
              <Form.Control type='password' placeholder='10:00 AM' />
            </Form.Group>
          </Form.Row>
          <Form.Row className='modal-row'>
            <Form.Group
              as={Col}
              controlId='formGridEmail'
              className='modal-group'
            >
              <Form.Label className='form-label'>Post Description</Form.Label>
              <Form.Control
                as='textarea'
                className='post'
                placeholder='What do you want to tell people about the event?'
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <div className='modal-buttons'>
        <Button variant='primary' onClick={props.handleClose} className='save'>
          Save
        </Button>
        <Button
          variant='secondry'
          onClick={props.handleClose}
          className='cancel'
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};
AddEventModal.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.bool,
  style: PropTypes.object
};

export default AddEventModal;
