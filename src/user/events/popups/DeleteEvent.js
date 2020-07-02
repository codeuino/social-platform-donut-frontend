import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import "./popup.scss";
import { deleteEvent } from '../../../actions/eventAction';

class DeleteEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: '',
      success: false
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('deleteEvent ', nextProps)
  }

  deleteEventClick = () => {
    console.log("Clicked on delete event")
    this.props.deleteEvent(this.props.eventId);
    if(this.props.status.success){
      this.setState({ show: false, success: true })
    } else {
      console.log('Something went wrong!')
    }
  }

  render() {
    const { show, onHide } = this.props;
    return (
      <div>
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop={true}>
          <div className="container">
            <Modal.Header closeButton className="heading border border-0 p-0">
              <Modal.Title id="contained-modal-title-vcenter"> 
                <div className="title">Delete Event?</div>
                <div className="message">Are you sure you want to delete this event?</div>
              </Modal.Title> 
            </Modal.Header>
            
            <div className="form-footer">
              <Button onClick={this.deleteEventClick} className="savebtn" size="sm">Yes</Button>
              <Button variant="outline-primary" onClick={this.props.onHide} size="sm">No</Button>
            </div>
          </div>
      </Modal>
    </div>
    )
  }
}

DeleteEvent.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  eventId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  status: state.status
})

export default connect(mapStateToProps, { deleteEvent })(DeleteEvent);