import React, { Component } from "react";
import { Modal, Button, Row, Col, Image } from "react-bootstrap";
import PropTypes from 'prop-types';
import logo from "../../../svgs/logo-image.jpg";

class Followers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Follow'
    }
  }
  render() {
    const { borderStyle, onHide } = this.props
    let followersList = [
      {name: 'John Doe', desg: 'UI/UX'},
      {name: 'John Doe', desg: 'UI/UX'},
      {name: 'John Doe', desg: 'UI/UX'},
      {name: 'John Doe', desg: 'UI/UX'},
      {name: 'John Doe', desg: 'UI/UX'}
    ];
    let followers = followersList.map((item, index) => (
      <Row className="modal__follower" id="p1" key={index}>
        <div className="follower__image">
          <Image
            className="modal__followerPhoto"
            src={logo}
            alt="I"
            rounded
          />
        </div>
        <div className="follower__content">
          <span className="modal__followerName">{item.name}</span>
          <span className="modal__followerDescription">
            {item.desg}
          </span>
        </div>
        <div className="follower__btn__container">
          <Button className="modal__followButton" variant="outline-primary">
            <span className="modal__followText">Follow</span>
          </Button>
        </div>
    </Row>
    ))
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        className="modal"
        style={borderStyle}
        centered
      >
        <Modal.Header closeButton className="modal__header">
          <Modal.Title className="modal__title">
            <div className="modal__main-title">Followers</div>
            <input type="text" placeholder="Search" className="modal__search" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div className="modal__mini-title">PEOPLE WHO FOLLOW YOU</div>
          {followers}
        </Modal.Body>
      </Modal>
    );
  }
}

Followers.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
  borderStyle: PropTypes.object
}
export default Followers;