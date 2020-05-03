import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Modal, Row,Col,Container,Button } from 'react-bootstrap';
import './popup.scss'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


class Popups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      optionValue: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.modalShow,
      optionValue: nextProps.optionValue,
    });
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    let {
      eventName,
      rsvpYes,
      rsvpNo,
      rsvpMaybe,
      description,
      slots,
      eventDate,
      isOnline,
      location,
      isCancelled,
    } = this.state.optionValue;

    return (
      <Modal
        size="lg"
        show={this.state.show}
        onHide={this.handleClose}
        animation={true}
        centered
      >
        <Modal.Body>
          <Container>
            <Row className="show-grid">
              <Col xs={6} md={4}>
                <Button variant="light" onClick={this.handleClose}>
                  <ArrowBackIcon />
                </Button>
              </Col>
              <Col xs={6} md={4}>
                {eventName ? (
                  <p className="info-eventName">{eventName}</p>
                ) : null}
              </Col>
              <Col xs={6} md={4}>
                {slots ? (
                  <p className="info-common">
                    Slots : <span className="info-common-no">{slots}</span>
                  </p>
                ) : null}
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={6} md={4}>
                {eventDate ? (
                  <p className="info-common">{eventDate.slice(0, 16)}</p>
                ) : null}
              </Col>
              <Col xs={6} md={4}>
                {eventDate ? (
                  <p className="info-common">{eventDate.slice(16, 33)}</p>
                ) : null}
              </Col>
              <Col xs={6} md={4}>
                {isCancelled ? (
                  <p className="info-cancelled">CANCELLED</p>
                ) : { isOnline } ? (
                  <p className="info-common">Online</p>
                ) : (
                  <p className="info-common">{location}</p>
                )}
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={12} md={12}>
                {description ? (
                  <p className="info-description">
                    {description.longDescription}
                  </p>
                ) : null}
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12} md={4}>
                {rsvpYes ? (
                  <p className="info-common">
                    Attending :{" "}
                    <span className="info-common-no">{rsvpYes.length}</span>
                  </p>
                ) : null}
              </Col>
              <Col xs={12} md={4}>
                {rsvpYes ? (
                  <p className="info-common">
                    Might Attend :{" "}
                    <span className="info-common-no">{rsvpMaybe.length}</span>
                  </p>
                ) : null}
              </Col>
              <Col xs={12} md={4}>
                {rsvpYes ? (
                  <p className="info-common">
                    Not Attending :{" "}
                    <span className="info-common-no">{rsvpNo.length}</span>
                  </p>
                ) : null}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

Popups.propTypes = {
  modalShow: PropTypes.bool.isRequired,
  option: PropTypes.string.isRequired,
  optionValue: PropTypes.any.isRequired,
};

export default Popups;
