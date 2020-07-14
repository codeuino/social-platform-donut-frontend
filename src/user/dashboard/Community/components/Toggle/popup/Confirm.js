import React from 'react'
import { Col, Button, Form, Modal } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { TriggerMaintenance } from '../../../../../../actions/orgAction'

function Confirm(props) {

  let onYesClick = () => {
    console.log('yes sure!');
    if(props.text === "On") {
      // turning maintenance mode on
      props.handleChecked(true)
      props.TriggerMaintenance();
    }

    if(props.text === "Off") {
      // turning maintenance mode off
      props.handleChecked(false)
      props.TriggerMaintenance();
    }

    props.handleClose()
  }

  let onCancelClick = () => {
    console.log('no clicked!');
    if(props.text === "On") {
      // cancel maintenance mode to be on
      props.handleChecked(false);
    }
    if(props.text === "Off") {
      // cancel maintenance mode to be off
      props.handleChecked(true)
    }
    props.handleClose();
  }

  return (
    <div>
       <Modal
        show={props.show}
        onHide={props.handleClose}
        animation={true}
        className="modal"
        centered
      >
        <Modal.Header className="modal__header">
          <Modal.Title className="modal__title">
            <div className="modal__main-title">Confirm?</div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal__body">
          <Form className="modal__form">
            <Form.Row className="modal__row">
              <Form.Group
                as={Col}
                controlId="formGridFirstName"
                className="modal__group"
              >
                <div className="modal__message">
                  Are you sure, You want to <span>{props.text}</span> maintenance mode?
                </div>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <div className="modal__buttons">
          <Button 
          onClick={onYesClick}
          className = "modal__save" >
            <span className="modal__buttontext">Yes</span>
          </Button>
          <Button onClick={onCancelClick} className="modal__cancel">
            <span className="modal__buttontext">Cancel</span>
          </Button>
        </div>
      </Modal>
    </div>
  )
}

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  org: state.org
})

export default connect(mapStateToProps, { TriggerMaintenance })(withRouter(Confirm));