import React, { Component } from "react";
import { Modal, Button, Row, Col, Image, Form } from "react-bootstrap";
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
      <Row className="modal__member" id="p1" key={index}>
        <div className="member__image">
          <Image className="modal__memberPhoto" src={logo} alt="I" rounded />
        </div>
        <div className="member__content">
          <span className="modal__memberName">{item.name}</span>
          <span className="modal__memberDescription">{item.desc}</span>
        </div>
        <div className="member__btn__container">
          <Button
            className="btn-danger modal__remove__followButton"
            onClick={this.onFollowClick.bind(this, index)}
          >
            <span className="remove_followText">Remove</span>
          </Button>
        </div>
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
            <input type="text" placeholder="Search" className="modal__search" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div className="modal__mini-title">COMMUNITY MEMBERS</div>
          {members}
          <div className="add__member">
            <h3 className="modal__mini-title">ADD MEMBER</h3>
            <div className="add__member__form">
              <Form.Label htmlFor="email" className="email__header">
                Email
              </Form.Label>
              <div className="add__member__input__container">
                <Form.Control
                  as="input"
                  placeholder=" Enter their email"
                ></Form.Control>
                <Button className="invite__btn">Invite</Button>
              </div>
              <div className="share__btn__container">
                <p className="share__text">or share invite on</p>
                <Button className="invite__btn">Facebook</Button>
                <Button className="invite__btn">LinkedIn</Button>
                <Button className="invite__btn">Twitter</Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
export default Members;