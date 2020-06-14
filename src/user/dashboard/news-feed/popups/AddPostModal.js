import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const AddPostModal = (props) => {
  const [content, setContent] = useState("");

  const onChange = (event) => {
    setContent(event.target.value);
  };

  const createPost = async (content) => {
    console.log("Creating the post ", content);
    props.onHide()
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
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
          <div className="modal__main-title">New Post</div>
          <div className="modal__mini-title">POST DETAILS</div>
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
              <Form.Label className="modal__label">Post Description</Form.Label>
              <Form.Control
                as="textarea"
                className="modal__post"
                placeholder="What do you want to tell people about?"
                rows={5}
                defaultValue={content}
                onChange={onChange}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <div className="modal__buttons">
        <Button onClick={createPost.bind(this, content)} className="modal__save">
          <span className="modal__buttontext">Post</span>
        </Button>
        <Button onClick={props.onHide} className="modal__cancel">
          <span className="modal__buttontext">Cancel</span>
        </Button>
      </div>
    </Modal>
  );
};
AddPostModal.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
  style: PropTypes.object,
};

export default AddPostModal;
