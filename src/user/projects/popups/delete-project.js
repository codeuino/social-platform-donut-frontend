import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export class DeleteProject extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="delete_project_title">
            Delete This Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger">Remove</Button>
          <Button variant="light">Keep It</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
