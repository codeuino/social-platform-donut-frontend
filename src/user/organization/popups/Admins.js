/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { Modal, Button, Row, Col, Image, Form } from "react-bootstrap";
import logo from "../../../svgs/logo-image.jpg";

class Admins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Follow',
      admins: []
    }
  }
  onRemoveClick = (index) => {
    console.log('Removing admin!', index);
    // SEND REQUEST TO REMOVE USER WITH ID = INDEX FROM ADMINISTRATORs LIST
  }

  componentWillReceiveProps(nextProps) {
    let adminsInfo = []
    nextProps.admins?.forEach((admin) => {
      adminsInfo.push({ name: admin.name.firstName + ' ' + admin.name.lastName, desc: admin.info.about?.designation, _id: admin._id })
    })
    this.setState({ admins: adminsInfo })
  }

  render() {
    const adminList = [...this.state.admins] 
    let admins = adminList.map((item) => (
      <Row className="modal__member" id="p1" key={item._id}>
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
            onClick={this.onRemoveClick.bind(this, item._id)}
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
            <div className="modal__main-title">Administrators</div>
            <input type="text" placeholder="Search" className="modal__search" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div className="modal__mini-title">COMMUNITY ADMINISTRATORS</div>
          {admins}
          <div className="add__member">
            <h3 className="modal__mini-title">ADD ADMINISTRATOR</h3>
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
              {/* <div className="share__btn__container">
                <p className="share__text">or share invite on</p>
                <Button className="invite__btn">Facebook</Button>
                <Button className="invite__btn">LinkedIn</Button>
                <Button className="invite__btn">Twitter</Button>
              </div> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
export default Admins;