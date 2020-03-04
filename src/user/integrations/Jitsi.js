import React, {Component} from 'react';
import {Modal, Row} from 'react-bootstrap';
import JitsiMeetComponent from "./jitsi_api";
import "./jitsi.scss";

export class JitsiMeet extends Component{
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
        <div className="title">Jitsi-Meet Codeuino</div>
        </Modal.Title> 
        </Modal.Header>
        <Modal.Body>
            <Row  className="display2"><JitsiMeetComponent user={this.props.user} 
              roomID={this.props.roomID}/></Row>
        </Modal.Body>
      </div>
      </Modal>
    );
  }
}