import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import "./popup.scss";
import { deleteEvent } from '../../../actions/eventAction';
import { ToastContainer, toast } from 'react-toastify'

class DeleteEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: '',
      error: ''
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('deleteEvent ', nextProps)
    const error = nextProps.error
    this.setState({
      error: error?.msg
    }, () => {
      console.log('error state', this.state)
      if(Boolean(this.state?.error?.length > 0)) {
        toast.error(`${this.state.error}`)
      }
    })
  }

  deleteEventClick = () => {
    console.log("Clicked on delete event")
    this.props.deleteEvent(this.props.eventId);
    this.props.onHide()
  }

  render() {
    const { show, onHide } = this.props;
    const { error } = this.state
    return (
      <div>
        <Modal
          show={show}
          onHide={onHide}
          centered
          backdrop={true}
          animation={true}
          className="modal"    
        >
          <Modal.Header closeButton className="modal__header">
            <Modal.Title className="modal__title"> 
              <div className="modal__main-title">Delete Event?</div>
              <div className="modal__mini-title">Are you sure you want to delete this event?</div>
            </Modal.Title> 
          </Modal.Header>
          <Modal.Body className="modal__body">
            <Form className="modal__form">
              <div className="modal__buttons">
                <Button 
                  onClick={this.deleteEventClick} 
                  className="modal__save" 
                >
                 <span className="modal__buttontext">Yes</span>
                </Button>
                <Button
                 className="modal__cancel" 
                 onClick={this.props.onHide} 
                 >
                  <span className="modal__buttontext">No</span>
                </Button>
              </div>
            </Form>
          </Modal.Body>
          {error ? (
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
        ) : null}
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