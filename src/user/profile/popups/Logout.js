import React, { Component } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../../../actions/authAction";

class Logout extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  onLogoutClick = (e) => {
    e.preventDefault();
    console.log("Logging out!");
    this.props.logoutUser();
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handleClose}
        animation={true}
        className="modal"
        centered
      >
        <Modal.Header closeButton className="modal__header">
          <Modal.Title className="modal__title">
            <div className="modal__main-title">Logout?</div>
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
                  You sure you want to logout from Donut?
                </div>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <div className="modal__buttons">
          <Button Button onClick = {this.onLogoutClick}
          className = "modal__save" >
            <span className="modal__buttontext">Logout</span>
          </Button>
          <Button onClick={this.props.handleClose} className="modal__cancel">
            <span className="modal__buttontext">Cancel</span>
          </Button>
        </div>
      </Modal>
    );
  }
}
// map state to props
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Logout));
