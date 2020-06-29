import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from 'react-redux'
import { deleteProjectById } from '../../../actions/projectAction'
import { withRouter } from 'react-router-dom'

class DeleteProject extends Component {
  onRemove = () => {
    console.log('deleting project', this.props.projectId);
    this.props.deleteProjectById(this.props.projectId, this.props.history);
  }
  render() {
    const { show, onHide } = this.props
    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="delete_project_title">
            Delete This Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={this.onRemove}>Remove</Button>
          <Button variant="light" onClick={onHide}>Keep It</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  project: state.project
})

export default connect(mapStateToProps, { deleteProjectById })(withRouter(DeleteProject));

