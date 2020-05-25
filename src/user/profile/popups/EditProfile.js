import React, { Component } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      shortDesc: '',
      location: '',
      github: '',
      fb: '',
      linkedIn: '',
      designation: ''
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSave = (e) => {
    e.preventDefault();
    console.log('Updating data!', this.state)
  }
  render() {
    const { borderStyle,onHide } = this.props
    const { firstName, lastName, shortDesc, location, github, linkedIn, fb, designation } = this.state
     return (
      <Modal {...this.props} className="modal">
      <Modal.Header
        closeButton
        className="modal__header"
        style={borderStyle}
        centered
      >
        <Modal.Title className="modal__title" style={borderStyle}>
          <div className="modal__main-title">Edit Profile</div>
          <div className="modal__mini-title">PERSONAL INFORMATION</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body" style={borderStyle}>
        <Form className="modal__form" style={borderStyle}>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridFirstName"
              className="modal__group"
            >
              <Form.Label className="modal__label">First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name.."
                defaultValue={firstName}
                name='firstName'
                onChange={this.onChange}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="formGridLastName"
              className="modal__group"
            >
              <Form.Label className="modal__label">Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name.."
                defaultValue={lastName}
                name='lastName'
                onChange={this.onChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridDesignation"
              className="modal__group"
            >
              <Form.Label className="modal__label">Designation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Designation"
                defaultValue={designation}
                name='designation'
                onChange={this.onChange}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="formGridLocation"
              className="modal__group"
            >
              <Form.Label className="modal__label">Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Location"
                defaultValue={location}
                name='location'
                onChange={this.onChange}
              />
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
                rows={2}
                defaultValue={shortDesc}
                name='shortDesc'
                onChange={this.onChange}
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
              <Form.Control
                type="text"
                placeholder="Github URL"
                defaultValue={github}
                name='github'
                onChange={this.onChange}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="formGridLinkedIn"
              className="modal__group"
            >
              <Form.Label className="modal__label">LinkedIn URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="LinkedIn URL"
                defaultValue={linkedIn}
                name='linkedIn'
                onChange={this.onChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridFacebook"
              className="modal__group"
            >
              <Form.Label className="modal__label">Facebook URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Facebook URL"
                defaultValue={fb}
                name='fb'
                onChange={this.onChange}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <div className="modal__buttons">
        <Button onClick={this.onSave} className="modal__save">
          <span className="modal__buttontext">Save</span>
        </Button>
        <Button onClick={onHide} className="modal__cancel">
          <span className="modal__buttontext">Cancel</span>
        </Button>
      </div>
    </Modal>
    )
  }
}
EditProfile.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
  style: PropTypes.object,
};

export default EditProfile;
