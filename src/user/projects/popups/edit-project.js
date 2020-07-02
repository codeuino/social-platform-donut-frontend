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
    const { projectName, github_link, bitbucket_link, version, short_des, long_des, img_link } = this.state
    const { show, onHide } = this.props
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
              <div className="title">Edit Project</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.onSubmit}>
              <Row className="form-content">
                <Col className="p-0" sm={12}>
                  <Form.Label className="label">Project Name</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    name="projectName"
                    value={projectName}
                    onChange={this.onChange}
                    placeholder="Type here.."
                    size="sm"
                  />
                </Col>
              </Row>
              <Row className="form-content">
                <Form.Label className="label">Version</Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  name="version"
                  value={version}
                  onChange={this.onChange}
                  size="sm"
                />
              </Row>
              <Row className="form-content">
                <Form.Label className="label">Short Description</Form.Label>
                <Form.Control
                  className="form-input"
                  as="textarea"
                  name="short_des"
                  value={short_des}
                  onChange={this.onChange}
                  placeholder="Write a brief info about the project.."
                  size="sm"
                />
              </Row>
              <Row className="form-content">
                <Form.Label className="label">Long Description</Form.Label>
                <Form.Control
                  className="form-input"
                  as="textarea"
                  name="long_des"
                  value={long_des}
                  onChange={this.onChange}
                  placeholder="Whats the project is about.."
                  size="sm"
                />
              </Row>
              <div className="about extra">Links of Project</div>
              <Row className="form-content">
                <Col className="p-0" sm={5}>
                  <Form.Label className="label">GitHub URL</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    name="github_link"
                    value={github_link}
                    onChange={this.onChange}
                    placeholder="GitHub Link"
                    size="sm"
                  />
                </Col>
                <Col className="p-0" sm={5}>
                  <Form.Label className="label">BitBucket URL</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    name="bitbucket_link"
                    value={bitbucket_link}
                    onChange={this.onChange}
                    placeholder="BitBucket Link"
                    size="sm"
                  />
                </Col>
              </Row>
              <Row className="form-content">
                <Col className="p-0" sm={5}>
                  <Form.Label className="label">Image URL</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    name="img_link"
                    value={img_link}
                    onChange={this.onChange}
                    placeholder="Image link"
                    size="sm"
                  />
                </Col>
              </Row>
              <div className="form-footer">
                <Button
                  onClick={this.onUpdateClick}
                  type="submit"
                  className="savebtn"
                >
                  Save
                </Button>
                <Button variant="outline-primary" onClick={onHide}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal.Body>
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

