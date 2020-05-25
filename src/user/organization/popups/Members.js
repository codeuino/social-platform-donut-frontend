import React, { Component } from "react";
import { Modal, Button, Row, Col, Image } from "react-bootstrap";
import logo from "../../../svgs/logo-image.jpg";

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Follow'
    }
  }
  onFollowClick = (index) => {
    console.log('Start following!', index);
    // SEND REQUEST TO FOLLOW USER WITH ID = INDEX
  }

  render() {
    const membersList = [
      {name: 'John Doe', desc : 'UI/UX'},
      {name: 'John Doe', desc : 'UI/UX'},
      {name: 'John Doe', desc : 'UI/UX'},
      {name: 'John Doe', desc : 'UI/UX'},
      {name: 'John Doe', desc : 'UI/UX'}
    ] 
    let members = membersList.map((item, index) => (
      <Row className="modal__follower" id="p1" key={index}>
        <Col md={9} className="modal__name__container">
          <Col md={2}>
            <Image className="modal__followerPhoto" src={logo} alt="I" rounded />
          </Col>
          <Col md={10}>
            <p className="modal__followerName">{item.name}</p>
            <p className="modal__followerDescription">{item.desc}</p>
          </Col>
        </Col>
        {/* <Col md={7}></Col> */}
        <Col md={3}>
          <Button
            className="btn-danger modal__remove__followButton"
            onClick={this.onFollowClick.bind(this, index)}
          >
            <span className="remove_followText">Remove</span>
          </Button>
        </Col>
      </Row>
    )); 
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        className="modal"
        centered
      >
        <Modal.Header closeButton className="modal__header">
          <Modal.Title className="modal__title">
            <div className="modal__main-title">Members</div>
            <div className="modal__mini-title">COMMUNITY MEMBERS</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          {members}
        </Modal.Body>
      </Modal>
    );
  }
}
export default Members;