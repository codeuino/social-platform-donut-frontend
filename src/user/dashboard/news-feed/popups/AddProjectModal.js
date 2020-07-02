import React, { useState } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { createProject } from '../../../../actions/dashboardAction'

const AddProjectModal = (props) => {
  const [projectName, setProjectName] = useState("")
  const [short, setShortDesc] = useState("")
  const [long, setLongDescription] = useState("")
  const [githubLink, setGithubLink] = useState("")
  const [bitbucketLink, setBitbucketLink] = useState("")
  const [stacks, setTechStacks] = useState("")

  const onProjectName = (event) => {
    setProjectName(event.target.value)
  }
  const onShortDescription = (event) => {
    setShortDesc(event.target.value)
  }
  const onLongDescription = (event) => {
    setLongDescription(event.target.value)
  }
  const onGithubLink = (event) => {
    setGithubLink(event.target.value)
  }
  const onBitBucketLink = (event) => {
    setBitbucketLink(event.target.value)
  }

  const onTechStacks = (event) => {
    const stacks = event.target.value;
    console.log('stacks ', stacks);
    setTechStacks(stacks)
  }

  const onCreateProjectClick = () => {
    const techStacks = stacks.split(',');
    const projectInfo = {
      projectName,
      description : {
        short,
        long
      },
      techStacks,
      links: [{ githubLink: githubLink }, {bitbucketLink: bitbucketLink}]
    }
    console.log('creating project!', projectInfo)
    props.createProject(projectInfo)
    props.handleClose()
  }

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      animation={true}
      className="modal"
      centered
    >
      <Modal.Header
        closeButton
        className="modal__header"
        style={props.borderStyle}
      >
        <Modal.Title className="modal__title" style={props.borderStyle}>
          <div className="modal__main-title">New Project</div>
          <div className="modal__mini-title">ABOUT THE PROJECT</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body" style={props.borderStyle}>
        <Form className="modal__form" style={props.borderStyle}>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              className="modal__group"
            >
              <Form.Label className="modal__label">Project Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Type here.."
                onChange={onProjectName}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="modal__row">
            <Form.Group as={Col} className="modal__group">
              <Form.Label className="modal__label">
                Short Description
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Short description of the project"
                onChange={onShortDescription}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              className="modal__group"
            >
              <Form.Label className="modal__label">
                Long Description
              </Form.Label>
              <Form.Control
                as="textarea"
                className="modal__post"
                placeholder="What do you want to tell people about the project?"
                onChange={onLongDescription}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              className="modal__group"
            >
              <Form.Label className="modal__label">Github Link</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Github Link"
                onChange={onGithubLink}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="formGridPassword"
              className="modal__group"
            >
              <Form.Label className="modal__label">BitBucket Link</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter bitbucket Link"
                onChange={onBitBucketLink} 
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className="modal__row">
            <Form.Group
              as={Col}
              controlId="formGridEmail"
              className="modal__group"
            >
              <Form.Label className="modal__label">Tech stacks</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Input tech stacks separated by comma.."
                onChange={onTechStacks}
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>
      <div className="modal__buttons">
        <Button onClick={onCreateProjectClick} className="modal__save">
          <span className="modal__buttontext">Save</span>
        </Button>
        <Button onClick={props.handleClose} className="modal__cancel">
          <span className="modal__buttontext">Cancel</span>
        </Button>
      </div>
    </Modal>
  );
};

AddProjectModal.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.bool,
  style: PropTypes.object,
};

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  dashboard: state.dashboard
})

export default connect(mapStateToProps, { createProject })(AddProjectModal);
