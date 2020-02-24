import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import "./popups.scss";

export class Logout extends Component{
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
        <div className="title">Logout?</div>
        <div className="message">Are you sure you want to logout of Donut?</div>
        </Modal.Title> 
        </Modal.Header>
        
        <div className="form-footer">
          <Button onClick={this.props.onHide} className="savebtn" size="sm">Yes</Button>
          <Button variant="outline-primary" onClick={this.props.onHide} size="sm">No</Button>
        </div>
      </div>
      </Modal>
    );
  }
}