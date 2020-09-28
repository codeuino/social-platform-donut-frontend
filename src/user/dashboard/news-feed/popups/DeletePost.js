import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost } from "../../../../actions/postAction";

const DeletePostModal = (props) => {
  const handleDeletePostClick = () => {
    props.deletePost(props.postId);
    props.handleClose();
  };

  return (
    <Modal
      show={props.show}
      onHide={() => props.handleClose()}
      animation={true}
      className="modal"
      centered
      size="lg"
    >
      <Modal.Header closeButton className="modal__header">
        <Modal.Title className="modal__title" style={props.borderStyle}>
          <div className="modal__main-title">Delete Post?</div>
          <div className="modal__mini-title">
            Are you sure you want to delete this post?
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body">
        <Form className="modal__form">
          <div className="modal__buttons">
            <Button
              onClick={() => handleDeletePostClick()}
              className="modal__save"
            >
              <span className="modal__buttontext">Yes</span>
            </Button>
            <Button
              className="modal__cancel"
              onClick={() => props.handleClose()}
            >
              <span className="modal__buttontext">No</span>
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

DeletePostModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  style: PropTypes.object,
};

export default connect(null, { deletePost })(DeletePostModal);
