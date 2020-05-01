import React, {Component} from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import {JitsiMeet} from './Jitsi';
import "./jitsi.scss";

export class Info extends Component{
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {user: '', roomID: '', startJitsi: false, disable: true,
      show: this.props.open};
    
        this.handleChange = this.handleChange.bind(this);
        this.closeJitsi = this.closeJitsi.bind(this);
        this.handleClose = this.handleClose.bind(this);
      }
      handleChange = (event, params) => {
        event.preventDefault();
        params === "user"
          ? this.setState({ user: event.target.value })
          : this.setState({ roomID: event.target.value });
          this.setState({disable: (this.state.roomID == '' || this.state.user == '') ?
          true : false });
      };
      closeJitsi = ()=>this.setState({
        startJitsi: false  
      });
      handleClose = ()=>this.setState({
        show: true
      })

    render(){      
      console.log("modal loads", this.state.show);
    return (
      <Modal
        {...this.props}
        show={this.state.show}
        onHide={this.handleClose}
        size="md"
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
              <Form.Label className="label">Your Name</Form.Label>
              <Form.Control className="form-input"
                type="text"   placeholder="Name.."   size="sm"
                onChange={event => this.handleChange(event, "user")}
                required/>
            </Row>
            <Row className="form-content">
              <Form.Label className="label">Room ID</Form.Label>
              <Form.Control className="form-input"
                type="text"   placeholder="RoomID.."   size="sm"   
                onChange={event => this.handleChange(event, "roomID")}
                required/>
            </Row> 
          </Modal.Body>
          <div className="form-footer">
            <Button onClick={() => this.setState({startJitsi:true})} 
              disabled={this.state.disable} className="savebtn">Join Call</Button>
            {this.state.startJitsi ? <JitsiMeet show={this.state.startJitsi}
            onHide={this.closeJitsi} user={this.state.user} 
            roomID={this.state.roomID}/> : null}
            <Button variant="outline-primary" onClick={this.handleClose}>Cancel</Button>
          </div>
        </div>
      </Modal>
    );
  }
}