import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { connect } from 'react-redux'
import { updateProject } from '../../../actions/projectAction'

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: '',
      github_link: '',
      bitbucket_link: '',
      version: '',
      long_des: '',
      short_des: '',
      img_link: '',
      projectId: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('edit nextProps ',nextProps);
    const { projectName, description, links, version, _id, imgUrl } = nextProps.project.singleProject
    this.setState({ 
      projectName: projectName, 
      long_des: description?.long, 
      short_des: description?.short, 
      github_link: links[0]?.githubLink ||  '', 
      bitbucket_link: links[0]?.bitbucketLink ||  '', 
      version: version || '',
      img_link: imgUrl || '',
      projectId: _id
     },() => { 
       console.log('edit project ', this.state)
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onUpdateClick = (e) => {
    e.preventDefault()
    const { projectName, projectId, github_link, bitbucket_link, version, long_des, short_des, img_link} = this.state
    const info = {
      projectName: projectName,
      description: {
        long: long_des,
        short: short_des
      },
      version: version,
      links: [{
        githubLink: github_link,
        bitbucketLink: bitbucket_link
      }],
      imgUrl: img_link
    }
    console.log('updating project ', info)
    this.props.updateProject(projectId, info)
  }

  render() {
    const { 
      projectName, 
      github_link, 
      bitbucket_link, 
      version, 
      short_des, 
      long_des, 
      img_link
     } = this.state
    const { show, onHide, borderStyle } = this.props
    return (
      <Modal
        show={show}
        onHide={onHide}
        className="modal"
        animation={true}
        centered
      >
        <Modal.Header closeButton className="modal__header" style={borderStyle}>
          <Modal.Title className="modal__title" style={borderStyle}>
            <div className="modal__main-title">Edit Project</div>
            <div className="modal__mini-title">Project Information</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <Form className="modal__form" onSubmit={this.onSubmit}>
            <Form.Row className="modal__row">
              <Form.Group className="modal__group" as={Col}>
                <Form.Label className="modal__label">Project Name</Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  name="projectName"
                  value={projectName}
                  onChange={this.onChange}
                  placeholder="Type here.."
                  size="sm"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="modal__row">
              <Form.Group className="modal__group" as={Col}>
                <Form.Label className="modal__label">Version</Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  name="version"
                  value={version}
                  onChange={this.onChange}
                  size="sm"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="modal__row">
              <Form.Group className="modal__group" as={Col}>
                <Form.Label className="modal__label">
                  Short description
                </Form.Label>
                <Form.Control
                  className="form-input"
                  as="textarea"
                  name="short_des"
                  value={short_des}
                  onChange={this.onChange}
                  placeholder="Write a brief info about the project.."
                  size="sm"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="modal__row">
              <Form.Group className="modal__group" as={Col}>
                <Form.Label className="modal__label">
                  Long description
                </Form.Label>
                <Form.Control
                  className="form-input"
                  as="textarea"
                  name="long_des"
                  value={long_des}
                  onChange={this.onChange}
                  placeholder="Whats the project is about.."
                  size="sm"
                />
              </Form.Group>
            </Form.Row>
            <div className="about extra">Links of Project</div>
            <Form.Row className="modal__row">
              <Form.Group className="modal__group" as={Col}>
                <Form.Label className="modal__label">GitHub URL</Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  name="github_link"
                  value={github_link}
                  onChange={this.onChange}
                  placeholder="GitHub Link"
                  size="sm"
                />
              </Form.Group>
              <Form.Group className="modal__group" as={Col}>
                <Form.Label className="modal__label">BitBucket URL</Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  name="bitbucket_link"
                  value={bitbucket_link}
                  onChange={this.onChange}
                  placeholder="BitBucket Link"
                  size="sm"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="modal__row">
              <Form.Group className="modal__group" as={Col}>
                <Form.Label className="modal__label">Image URL</Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  name="img_link"
                  value={img_link}
                  onChange={this.onChange}
                  placeholder="Image link"
                  size="sm"
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <div className="modal__buttons">
          <Button onClick={this.onUpdateClick} className="modal__save">
            <span className="modal__buttontext">Save</span>
          </Button>
          <Button className="modal__cancel" onClick={this.props.onHide}>
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
  project: state.project
})

export default connect(mapStateToProps, { updateProject })(EditProject);

