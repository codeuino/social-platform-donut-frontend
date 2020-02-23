import React, { Component } from "react";
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import "../popups.scss";

export class AddPost extends Component{
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
        <div className="title">New Post</div>
        <div className="about">PROJECT DETAILS</div>
        </Modal.Title> 
        </Modal.Header>
        <Modal.Body>
          <Row className="form-content">
          <Form.Label className="label">Post Description</Form.Label>
          <Form.Control as="textarea" rows="10"
              type="text"
              placeholder="What do you want to tell people about?"
              size="sm"/>
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