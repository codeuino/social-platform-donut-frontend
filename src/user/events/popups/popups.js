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
      eventInfo: {},
      isCancelled: false
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('popups ', nextProps)
    this.setState({
      show: nextProps.modalShow,
      optionValue: nextProps?.optionValue,
      eventInfo: nextProps?.eventInfo
    });
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  RefineDate = (d) => {
    const date = d.split("T")
    const eventDate = date[0].slice(-2)
    return eventDate;
  }

  RefineTime = (d) => {
    const time = d.split("T");
    const eventTime = time[1].slice(0, 5)
    return eventTime;
  }

  RefinedDay = (d) => {
    const day = d.slice(0, 3);
    return day;
  };

  RefinedYear = (d) => {
    const month = d.slice(4, 7);
    const year = d.slice(11, 15);
    return month + " " + year;
  };

  RefineTime = (d) => {
    const time = d.split("T");
    const eventTime = time[1].slice(0, 5)
    return eventTime;
  }

  render() {
    const { eventName, eventDate, description, location, isOnline, slots, rsvpMaybe, rsvpNo, rsvpYes, eventTime } = this.state.eventInfo
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
                  <p className="info-eventName">{eventName || "EventName"}</p>
                ) : null}
              </Col>
              <Col xs={6} md={4}>
                {slots ? (
                  <p className="info-common">
                    Slots : <span className="info-common-no">{slots || 0}</span>
                  </p>
                ) : null}
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={6} md={4}>
                {eventTime ? (
                  <p className="info-common">Time : {this.RefineTime(eventDate)}</p>
                ) : null}
              </Col>
              <Col xs={6} md={4}>
                {eventDate ? (
                  <p className="info-common">
                    {" "}
                    {this.RefineDate(eventDate)}{" "}
                    {this.RefinedYear(
                      new Date(Date.parse(eventDate)).toString()
                    )}
                  </p>
                ) : null}
              </Col>
              <Col xs={6} md={4}>
                {this.state.isCancelled ? (
                  <p className="info-cancelled">CANCELLED</p>
                ) : { isOnline } ? (
                  <p className="info-common">
                    {isOnline ? "Online" : "Offline"}
                  </p>
                ) : (
                  <p className="info-common">{location || "Location"}</p>
                )}
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={12} md={12}>
                {description ? (
                  <p className="info-description">
                    {description?.longDescription}
                  </p>
                ) : null}
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12} md={4}>
                {rsvpYes ? (
                  <p className="info-common">
                    Attending :{" "}
                    <span className="info-common-no">
                      {rsvpYes?.length || 0}
                    </span>
                  </p>
                ) : null}
              </Col>
              <Col xs={12} md={4}>
                {rsvpYes ? (
                  <p className="info-common">
                    Might Attend :{" "}
                    <span className="info-common-no">
                      {rsvpMaybe?.length || 0}
                    </span>
                  </p>
                ) : null}
              </Col>
              <Col xs={12} md={4}>
                {rsvpYes ? (
                  <p className="info-common">
                    Not Attending :{" "}
                    <span className="info-common-no">
                      {rsvpNo?.length || 0}
                    </span>
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
  optionValue: PropTypes.any.isRequired,
};

export default Popups;
