import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import {JitsiMeet} from './Jitsi';
import "../../user/profile/popups/popups.scss";

export class Info extends Component{
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {user: '', roomID: '', startJitsi: false};
    
        this.handleChange = this.handleChange.bind(this);
        this.closeJitsi = this.closeJitsi.bind(this);
      }
      handleChange = (event, params) => {
        event.preventDefault();
        params === "user"
          ? this.setState({ user: event.target.value })
          : this.setState({ roomID: event.target.value });
      };
      closeJitsi = ()=>this.setState({
        startJitsi: false
        
      });
    render(){      
    return (
        <Modal
      {...this.props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <div className="container">
        <Modal.Header closeButton className="heading border border-0 p-0">
        <Modal.Title id="contained-modal-title-vcenter"> 
        <div className="title">Info</div>
        <div className="about">Enter your name and a roomID</div>
        </Modal.Title> 
        </Modal.Header>
        <Modal.Body>
          <Row className="form-content">
          <Col sm={12}>
          <Form.Label className="label">Your Name</Form.Label>
          <Form.Control className="form-input"
              type="text"   placeholder="Type here.."   size="sm"
              onChange={event => this.handleChange(event, "user")}/>
          </Col>
          </Row>
          <Row className="form-content">
          <Col sm={12}>
          <Form.Label className="label">Room Name</Form.Label>
          <Form.Control className="form-input"
              type="text"   placeholder="Type here.."   size="sm"   
              onChange={event => this.handleChange(event, "roomID")}/>
          </Col>
          </Row> 
        </Modal.Body>
        <div className="form-footer">
          <Button onClick={
              () => this.setState({startJitsi:true})} className="savebtn">Save</Button>
          {this.state.startJitsi ? <JitsiMeet show={this.state.startJitsi}
              onHide={this.closeJitsi} user={this.state.user} 
              roomID={this.state.roomID}/> : null}
          <Button variant="outline-primary" onClick={this.props.onHide}>Cancel</Button>
        </div>
      </div>
      </Modal>
    );
  }
}