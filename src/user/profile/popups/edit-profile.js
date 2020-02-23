import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import "./popups.scss";

export class EditProfile extends Component{
    // eslint-disable-next-line
    constructor(props){
        super(props);
    }
    render(){
    return (
        <Modal
      {...this.props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <div className="container">
        <Modal.Header closeButton className="heading border border-0 p-0">
        <Modal.Title id="contained-modal-title-vcenter"> 
        <div className="title">Edit Profile</div>
        <div className="about">PERSONAL INFORMATION</div>
        </Modal.Title> 
        </Modal.Header>
        <Modal.Body>
          <Row className="form-content">
          <Col className="p-0" sm={5}>
          <Form.Label className="label">First Name</Form.Label>
          <Form.Control className="form-input"
              type="text"
              placeholder="Type here.."
              size="sm"/>
          </Col>
          <Col className="p-0" sm={5}>
          <Form.Label className="label">Last Name</Form.Label>
          <Form.Control className="form-input"
              type="text"
              placeholder="Type here.."
              size="sm"/>
          </Col>
          </Row>
          <Row className="form-content">
          <Col className="p-0" sm={5}>
          <Form.Label className="label">Designation</Form.Label>
          <Form.Control className="form-input"
              type="text"
              placeholder="What do you do?"
              size="sm"/>
          </Col>
          <Col className="p-0" sm={5}>
          <Form.Label className="label">Location</Form.Label>
          <Form.Control className="form-input"
              type="text"
              placeholder="Where do you live?"
              size="sm"/>
          </Col>
          </Row>
          <Row className="form-content">
          <Form.Label className="label">About</Form.Label>
          <Form.Control className="form-input"
              as="textarea"
              placeholder="Write a few lines about yourself.."
              size="sm"/>
          </Row>
          <div className="about extra">PROFILES</div>
          <Row className="form-content">
          <Col className="p-0" sm={5}>
          <Form.Label className="label">GitHub URL</Form.Label>
          <Form.Control className="form-input"
              type="text"
              placeholder="GitHub Profile"
              size="sm"/>
          </Col>
          <Col className="p-0" sm={5}>
          <Form.Label className="label">LinkedIn URL</Form.Label>
          <Form.Control className="form-input"
              type="text"
              placeholder="LinkedIn Profile"
              size="sm"/>
          </Col>
          </Row>
          <Row className="form-content">
          <Col className="p-0" sm={5}>
          <Form.Label className="label">Facebook URL</Form.Label>
          <Form.Control className="form-input"
              type="text"
              placeholder="Facebook Profile"
              size="sm"/>
          </Col>
          </Row>  
        </Modal.Body>
        <div className="form-footer">
          <Button onClick={this.props.onHide} className="savebtn">Save</Button>
          <Button variant="outline-primary" onClick={this.props.onHide}>Cancel</Button>
        </div>
      </div>
      </Modal>
    );
  }
}