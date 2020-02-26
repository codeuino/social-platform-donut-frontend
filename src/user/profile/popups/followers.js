import React, {Component} from 'react';
import {Modal, Button, Row} from 'react-bootstrap';
import logo from "../../../svgs/profile-icon.svg";
import "./popups.scss";

export class Followers extends Component{
    // eslint-disable-next-line
    constructor(props){
        super(props);
    }
    state = {text:"Follow"};
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
        <div className="title">Followers</div>
        <div className="about">PEOPLE WHO FOLLOW YOU</div>
        </Modal.Title> 
        </Modal.Header>
        <Modal.Body>
            <Row className="follower" id="p1">
                <img class="photo" src={logo} alt="I"></img>
                <div className="contain"> 
                  <p className="user">Dhanus Rajendra</p>
                  <p className="descr">Front-End Developer</p>
                </div>
                <Button className="follow-link" variant="outline-primary">Follow</Button>
            </Row>
            <Row className="follower">
                <img class="photo" src={logo} alt="I"></img>
                <div className="contain"> 
                  <p className="user">Dhanus Rajendra</p>
                  <p className="descr">Front-End Developer</p>
                </div>
                <Button className="follow-link" variant="outline-primary">Follow</Button>
            </Row>
            <Row className="follower">
                <img class="photo" src={logo} alt="I"></img>
                <div className="contain"> 
                  <p className="user">Dhanus Rajendra</p>
                  <p className="descr">Front-End Developer</p>
                </div>
                <Button className="follow-link" variant="outline-primary">Follow</Button>
            </Row>
            <Row className="follower">
                <img class="photo" src={logo} alt="I"></img>
                <div className="contain"> 
                  <p className="user">Dhanus Rajendra</p>
                  <p className="descr">Front-End Developer</p>
                </div>
                <Button className="follow-link" variant="outline-primary">Follow</Button>
            </Row>
        </Modal.Body>
      </div>
      </Modal>
    );
  }
}
