import React, { Component } from "react";
import { Modal, Button, Row, Col, Image } from "react-bootstrap";
import logo from "../../../svgs/logo-image.jpg";

export class Followers extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  state = { text: "Follow" };
  render() {
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
            <div className="modal__main-title">Followers</div>
            <div className="modal__mini-title">PEOPLE WHO FOLLOW YOU</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <Row className="modal__follower" id="p1">
            <Col md={2}>
              <Image
                className="modal__followerPhoto"
                src={logo}
                alt="I"
                rounded
              />
            </Col>
            <Col md={7}>
              <span className="modal__followerName">Dhanus Rajendra</span>
              <span className="modal__followerDescription">
                Front-End Developer
              </span>
            </Col>
            <Col md={3}>
              <Button className="modal__followButton" variant="outline-primary">
                <span className="modal__followText">Follow</span>
              </Button>
            </Col>
          </Row>
          <Row className="modal__follower" id="p1">
            <Col md={2}>
              <Image
                className="modal__followerPhoto"
                src={logo}
                alt="I"
                rounded
              />
            </Col>
            <Col md={7}>
              <span className="modal__followerName">Dhanus Rajendra</span>
              <span className="modal__followerDescription">
                Front-End Developer
              </span>
            </Col>
            <Col md={3}>
              <Button className="modal__followButton" variant="outline-primary">
                <span className="modal__followText">Follow</span>
              </Button>
            </Col>
          </Row>
          <Row className="modal__follower" id="p1">
            <Col md={2}>
              <Image
                className="modal__followerPhoto"
                src={logo}
                alt="I"
                rounded
              />
            </Col>
            <Col md={7}>
              <span className="modal__followerName">Dhanus Rajendra</span>
              <span className="modal__followerDescription">
                Front-End Developer
              </span>
            </Col>
            <Col md={3}>
              <Button className="modal__followButton" variant="outline-primary">
                <span className="modal__followText">Follow</span>
              </Button>
            </Col>
          </Row>
          <Row className="modal__follower" id="p1">
            <Col md={2}>
              <Image
                className="modal__followerPhoto"
                src={logo}
                alt="I"
                rounded
              />
            </Col>
            <Col md={7}>
              <span className="modal__followerName">Dhanus Rajendra</span>
              <span className="modal__followerDescription">
                Front-End Developer
              </span>
            </Col>
            <Col md={3}>
              <Button className="modal__followButton" variant="outline-primary">
                <span className="modal__followText">Follow</span>
              </Button>
            </Col>
          </Row>
          <Row className="modal__follower" id="p1">
            <Col md={2}>
              <Image
                className="modal__followerPhoto"
                src={logo}
                alt="I"
                rounded
              />
            </Col>
            <Col md={7}>
              <span className="modal__followerName">Dhanus Rajendra</span>
              <span className="modal__followerDescription">
                Front-End Developer
              </span>
            </Col>
            <Col md={3}>
              <Button className="modal__followButton" variant="outline-primary">
                <span className="modal__followText">Follow</span>
              </Button>
            </Col>
          </Row>
          <Row className="modal__follower" id="p1">
            <Col md={2}>
              <Image
                className="modal__followerPhoto"
                src={logo}
                alt="I"
                rounded
              />
            </Col>
            <Col md={7}>
              <span className="modal__followerName">Dhanus Rajendra</span>
              <span className="modal__followerDescription">
                Front-End Developer
              </span>
            </Col>
            <Col md={3}>
              <Button className="modal__followButton" variant="outline-primary">
                <span className="modal__followText">Follow</span>
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
}
