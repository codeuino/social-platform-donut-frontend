import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import "../popups.scss";

export class AddProject extends Component{
    constructor(props){
        super(props);
    }
    render(){
    return (
        <Modal
      {...this.props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="container">
        <Modal.Header closeButton className="heading border border-0 p-0">
        <Modal.Title id="contained-modal-title-vcenter"> 
        <div className="title">New Project</div>
        <div className="about">ABOUT THE PROJECT</div>
        </Modal.Title> 
        </Modal.Header>
        <Modal.Body>
          <Row className="form-content">
          <Form.Label className="label">Project Name</Form.Label>
          <Form.Control
              type="text"
              placeholder="Type here.."
              size="sm"/>
          </Row>
          <Row className="form-content">
          <Form.Label className="label">Project Contributors</Form.Label>
          <Form.Control
              type="text"
              placeholder="Who all contributed to this project?"
              size="sm"/>
          </Row>
          <Row className="form-content">
          <Form.Label className="label">Post Description</Form.Label>
          <Form.Control as="textarea" rows="3"
              type="text"
              placeholder="What do you want to tell people about the project?"
              size="sm"/>
          </Row>
          <Row className="form-content">
            <Col className="p-0" sm={5}>
            <Form.Label className="label">Github Link</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter github link"
                size="sm"/>
            </Col>
            <Col className="p-0" sm={5}>
            <Form.Label className="label">Other Link</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter other link"
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
