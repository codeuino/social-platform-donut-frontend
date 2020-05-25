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
        <Col md={2}>
          <Image
            className="modal__followerPhoto"
            src={logo}
            alt="I"
            rounded
          />
        </Col>
        <Col md={7}>
          <span className="modal__followerName">{item.name}</span>
          <span className="modal__followerDescription">
            {item.desg}
          </span>
        </Col>
        <Col md={3}>
          <Button className="modal__followButton" variant="outline-primary">
            <span className="modal__followText">Follow</span>
          </Button>
        </Col>
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
            <div className="modal__mini-title">PEOPLE WHO FOLLOW YOU</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
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