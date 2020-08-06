import React, {Component} from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import {JitsiMeet} from './Jitsi';
import "./jitsi.scss";

export class Info extends Component{
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {user: '', roomID: '', startJitsi: false, disable: true};
    
        this.handleChange = this.handleChange.bind(this);
        this.closeJitsi = this.closeJitsi.bind(this);
      }
      handleChange = (event, params) => {
        event.preventDefault();
        params === "user"
          ? this.setState({ user: event.target.value })
          : this.setState({ roomID: event.target.value });
          this.setState({disable: (this.state.roomID === '' || this.state.user === '') ?
          true : false });
      };
      closeJitsi = ()=>this.setState({
        startJitsi: false
        
      });

    render(){      
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        className="modal"
        centered>

          <Modal.Header closeButton className="modal__header">
            <Modal.Title id="contained-modal-title-vcenter"> 
              <div className="title">Info</div>
              <div className="about">Enter your name and a roomID</div>
            </Modal.Title> 
          </Modal.Header>
          <Modal.Body className="modal__body">
            <Form className="modal__form">
              <Form.Row className="modal__row">
                <Form.Group className="modal__group" as={Col}>
                  <Form.Label className="label">Your Name</Form.Label>
                  <Form.Control className="modal__post"
                    type="text"   placeholder="Name.."   size="sm"
                    onChange={event => this.handleChange(event, "user")}
                    required/>
                </Form.Group>
              </Form.Row>
              <Form.Row className="modal__row">
              <Form.Group className="modal__group" as={Col}>
                <Form.Label className="label">Room ID</Form.Label>
                <Form.Control className="modal__post"
                  type="text"   placeholder="RoomID.."   size="sm"   
                  onChange={event => this.handleChange(event, "roomID")}
                  required/>
                  </Form.Group>
              </Form.Row>
            </Form>
          </Modal.Body>
          <div className="modal__buttons">
            <Button onClick={() => this.setState({startJitsi:true})} 
              disabled={this.state.disable} className="modal__save">
                <span className="modal__buttontext">Join</span></Button>
            {this.state.startJitsi ? <JitsiMeet show={this.state.startJitsi}
            onHide={this.closeJitsi} user={this.state.user} 
            roomID={this.state.roomID}/> : null}
            <Button className="modal__cancel" variant="outline-primary" onClick={this.props.onHide}>
              <span className="modal__buttontext">Cancel</span></Button>
          </div>
      </Modal>
    );
  }
}