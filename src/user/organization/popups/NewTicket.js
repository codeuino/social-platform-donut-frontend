import React from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import UploadImg from "../../../assets/images/upload.jpg";

const NewTicket = (props) => {
  return (
    <Modal {...props} className="modal">
      <Modal.Header
        closeButton
        className="modal__header"
        style={props.borderStyle}
        centered
      >
        <Modal.Title className="modal__title">
          <div className="modal__main-title">New Ticket</div>
          <div className="modal__mini-title">Creating a new ticket</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body">
        <Form className="modal__form">
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridFirstName"
              className="modal__group"
            >
              <Form.Label className="modal__label">LOGO</Form.Label>
              <br></br>
              <img
                src={UploadImg}
                alt="Upload"
                className="upload_community_logo img-fluid"
              />
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="formGridLastName"
              className="modal__group"
            >
              <Form.Label className="modal__label">Community Name</Form.Label>
              <Form.Control type="text" placeholder="Type here.." />
            </Form.Group>
          </Form.Row>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridAbout"
              className="modal__group"
            >
              <Form.Label className="modal__label">About</Form.Label>
              <Form.Control
                as="textarea"
                className="modal__post"
                placeholder="Write a few lines about yourself.."
              />
            </Form.Group>
          </Form.Row>
          <div className="modal__secondary-title">PROFILES</div>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridGithub"
              className="modal__group"
            >
              <Form.Label className="modal__label">Github URL</Form.Label>
              <Form.Control type="text" placeholder="Type here.." />
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="formGridLinkedIn"
              className="modal__group"
            >
              <Form.Label className="modal__label">LinkedIn URL</Form.Label>
              <Form.Control type="text" placeholder="Type here.." />
            </Form.Group>
          </Form.Row>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridFacebook"
              className="modal__group"
            >
              <Form.Label className="modal__label">Facebook URL</Form.Label>
              <Form.Control type="text" placeholder="Type here.." />
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <div className="modal__buttons">
        <Button onClick={props.onHide} className="modal__save">
          <span className="modal__buttontext">Save</span>
        </Button>
        <Button onClick={props.onHide} className="modal__cancel">
          <span className="modal__buttontext">Cancel</span>
        </Button>
      </div>
    </Modal>
  );
};
export default NewTicket;
