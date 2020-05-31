import React from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";

class RequestChanges extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  handleChange = () => {
    const value = this.textInput.current.value;
    console.log(value);
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handleClose}
        animation={false}
        className="modal"
        centered
      >
        <Modal.Header
          closeButton
          className="modal__header"
          style={this.props.borderStyle}
        >
          <Modal.Title className="modal__title" style={this.props.borderStyle}>
            <div className="modal__main-title">Request Changes</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body" style={this.props.borderStyle}>
          <Form className="modal__form" style={this.props.borderStyle}>
            <Form.Row className="modal__row">
              <Form.Group
                as={Col}
                controlId="formGridEmail"
                className="modal__group"
              >
                <span className="modal__textSelection">{`"${this.props.selectedText}"`}</span>
                <Form.Control
                  ref={this.textInput}
                  as="textarea"
                  className="modal__post"
                  placeholder="Explain the changes required"
                  onChange={() => {
                    this.handleChange();
                  }}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <div className="modal__buttons">
          <Button
            onClick={() =>
              this.props.handleComment(this.textInput.current.value)
            }
            className="modal__save"
          >
            <span className="modal__buttontext">Coment</span>
          </Button>
          <Button onClick={this.props.handleClose} className="modal__cancel">
            <span className="modal__buttontext">Cancel</span>
          </Button>
        </div>
      </Modal>
    );
  }
}
RequestChanges.propTypes = {
  onClick: PropTypes.func,
  handleComment: PropTypes.func,
  show: PropTypes.bool,
  style: PropTypes.object,
  selectedText: PropTypes.string,
};

export default RequestChanges;
