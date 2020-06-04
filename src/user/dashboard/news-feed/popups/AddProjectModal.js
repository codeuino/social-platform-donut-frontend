import React from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const AddProjectModal = (props) => {
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
          <div className="modal__main-title">New Project</div>
          <div className="modal__mini-title">ABOUT THE PROJECT</div>
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
              <Form.Label className="modal__label">Project Name</Form.Label>
              <Form.Control type="text" placeholder="Type here.." />
            </Form.Group>
          </Form.Row>
          <Form.Row className="modal__row">
            <Form.Group as={Col} className="modal__group">
              <Form.Label className="modal__label">
                Project Contributers
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Who all contributed to the project?"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              className="modal__group"
            >
              <Form.Label className="modal__label">
                Project Description
              </Form.Label>
              <Form.Control
                as="textarea"
                className="modal__post"
                placeholder="What do you want to tell people about the project?"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              className="modal__group"
            >
              <Form.Label className="modal__label">Github Link</Form.Label>
              <Form.Control type="text" placeholder="Enter Github Link" />
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="formGridPassword"
              className="modal__group"
            >
              <Form.Label className="modal__label">Other Link</Form.Label>
              <Form.Control type="text" placeholder="Enter Other Links" />
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
AddProjectModal.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.bool,
  style: PropTypes.object,
};

export default AddProjectModal;
