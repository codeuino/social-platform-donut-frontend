import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "./popups.scss";
export class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      shortDescription:'',
      longDescription:'',
      slots: '',
      eventDate: '',
      isOnline: '',
    }
   this.trigger=0
   this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
      if(this.trigger<1)
         this.setState({...nextProps.data})
         this.trigger = this.trigger+1;
        }

        onChange = (e) => {
          this.setState({ [e.target.name]:e.target.value })
      }
      

  onSubmit(e) {
    e.preventDefault();

const EditProject = this.state

    console.log("Edited Event", EditProject);
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
              <div className="title">Edit Event</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form  onSubmit={this.onSubmit.bind(this)}>
              <Row className="form-content">
                <Col className="p-0" sm={12}>
                  <Form.Label className="label">Event Name</Form.Label>
                  <Form.Control
                    className="form-input"
                    type="text"
                    name="eventName"
                    value={this.state.eventName}
                    onChange={this.onChange}
                    placeholder="Type here.."
                    size="sm"
                  />
                </Col>
              </Row>
              <Row className="form-content">
                <Form.Label className="label">Slots</Form.Label>
                <Form.Control
                  className="form-input"
                  type="Number"
                  name="slots"
                  value={this.state.slots}
                  onChange={this.onChange}
                  size="sm"
                />
              </Row>
              <Row className="form-content">
              <Col className="p-0" sm={12}>
                <Form.Label className="label">Short Description</Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  name="shortDescription"
                  value={this.state.shortDescription}
                  onChange={this.onChange}
                  placeholder="Type here.."
                  size="sm"
                />
              </Col>
            </Row>
            <Row className="form-content">
              <Col className="p-0" sm={12}>
                <Form.Label className="label">Short Description</Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  name="longDescription"
                  value={this.state.longDescription}
                  onChange={this.onChange}
                  placeholder="Type here.."
                  size="sm"
                />
              </Col>
            </Row>
      
               <Row className="form-content">
               <Col className="p-0" sm={12}>
               <Form.Group controlId="exampleForm.SelectCustomSizeSm">
               <Form.Label>IsOnline</Form.Label>
               <Form.Control as="select" size="sm" custom>
                 <option>True</option>
                 <option>False</option>
               </Form.Control>
             </Form.Group>
               </Col>
             </Row>
             <Row className="form-content">
             <Col className="p-0" sm={12}>
               <Form.Label className="label">Location</Form.Label>
               <Form.Control
                 className="form-input"
                 type="text"
                 name="location"
                 value={this.state.location}
                 onChange={this.onChange}
                 placeholder="Type here.."
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
