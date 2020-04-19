import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "./popups.scss";
export class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Proj_name: '',
      version: '',
      short_des: '',
      long_des: '',
      github_link: '',
      bitbucket_link: '',
      host_link: '',
      img_link: ''
    }
   this.trigger=0
   this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
      if(this.trigger<1)
         this.setState({...nextProps.data})
         this.trigger = this.trigger+1;
        }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
const EditProject = this.state

    console.log("Edited Project", EditProject);
  }



  render() {
    return (
      <Modal
        {...this.props}
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
            <Form  onSubmit={this.onSubmit}>
              <Row className="form-content">
                <Col className="p-0" sm={12}>
                  <Form.Label className="label">Project Name</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    name="Proj_name"
                    value={this.state.Proj_name}
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
                  type="Number"
                  name="version"
                  value={this.state.version}
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
                  value={this.state.short_des}
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
                  value={this.state.long_des}
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
                    value={this.state.github_link}
                    onChange={this.onChange}
                    placeholder="GitHub Profile"
                    size="sm"
                  />
                </Col>
                <Col className="p-0" sm={5}>
                  <Form.Label className="label">BitBucket URL</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    name="bitbucket_link"
                    value={this.state.bitbucket_link}
                    onChange={this.onChange}
                    placeholder="BitBucket Profile"
                    size="sm"
                  />
                </Col>
              </Row>
              <Row className="form-content">
                <Col className="p-0" sm={5}>
                  <Form.Label className="label">Hosted URL</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    name="host_link"
                    value={this.state.host_link}
                    onChange={this.onChange}
                    placeholder="Hosted Profile"
                    size="sm"
                  />
                </Col>
                <Col className="p-0" sm={5}>
                  <Form.Label className="label">Image URL</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    name="img_link"
                    value={this.state.img_link}
                    onChange={this.onChange}
                    placeholder="Image link"
                    size="sm"
                  />
                </Col>
              </Row>
              <div className="form-footer">
                <Button
                  onClick={this.props.onHide}
                  type="submit"
                  className="savebtn"
                >
                  Save
                </Button>
                <Button variant="outline-primary" onClick={this.props.onHide}>
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
