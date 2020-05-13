import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import "./popup.scss";
import { connect } from 'react-redux';
import { updateEvent, deleteEvent } from '../../../actions/eventAction';
import PropTypes from 'prop-types'


class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      shortDesc: "",
      longDesc: "",
      location: "",
      date: "",
    };
  }

  componentDidMount = () => {
    // FETCH THE EVENT DETAILS ON POPUP GETS TRIGGERED (INTEGRATION)
    console.log("Fetching the event details!");
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  updateEvent = (e) => {
    e.preventDefault();
    console.log("Updating the event!!");
    // DISPATCH THE ACTION TO UPDATE EVENT (INTEGRATION)
    const { eventName, shortDesc, longDesc, date, location } = this.state;
    const { eventId } = this.props;
    const updatedInfo = {
      eventName,
      description: {
        shortDescription: shortDesc,
        longDescription: longDesc,
      },
      location,
      eventDate: date,
    };
    console.log('submitted data ', updatedInfo);
    this.props.updateEvent(eventId, updatedInfo);
  };

  render() {
    const { show, onHide } = this.props;

    return (
      <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="container">
          <Modal.Header closeButton className="heading border border-0 p-0">
            <Modal.Title id="contained-modal-title-vcenter">
              <div className="title">Edit Event</div>
              <div className="about">Event Information</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="form-content">
              <Col className="p-0" sm={12}>
                <Form.Label className="label">Event Name</Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  placeholder="Event name.."
                  size="sm"
                  name="eventName"
                  onChange={this.onChange}
                  required={true}
                />
              </Col>
            </Row>
            <Row className="form-content">
              <Form.Label className="label">Short description</Form.Label>
              <Form.Control
                className="form-input"
                as="textarea"
                placeholder="Write a few lines about event.."
                size="sm"
                name="shortDesc"
                onChange={this.onChange}
                required={true}
              />
            </Row>
            <Row className="form-content">
              <Form.Label className="label">Long description</Form.Label>
              <Form.Control
                className="form-input"
                as="textarea"
                placeholder="Write a details of event.."
                size="sm"
                name="longDesc"
                onChange={this.onChange}
                required={true}
              />
            </Row>
            <Row>
              <Form.Label className="label">Location</Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                placeholder="Event location.."
                size="sm"
                name="location"
                onChange={this.onChange}
                required={true}
              />
            </Row>
            <Row>
              <Form.Label className="label">Event Date</Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                placeholder="Event date.."
                size="sm"
                name="date"
                onChange={this.onChange}
                required={true}
              />
            </Row>
          </Modal.Body>
          <div className="form-footer">
            <Button onClick={this.updateEvent} className="savebtn">
              Save
            </Button>
            <Button variant="outline-primary" onClick={this.props.onHide}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

EditEvent.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  eventId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  error: state.error,
  statue: state.status
})

export default connect(mapStateToProps, { updateEvent, deleteEvent })((EditEvent))
