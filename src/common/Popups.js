import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { MdVerifiedUser } from 'react-icons/md';
import { FaUserSlash } from 'react-icons/fa';

class Popups extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false,
      name: "",
      email: "",
      username: "",
      account: "",
      identity: true,
      option: "",
      optionValue: ""
    }
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      show: nextProps.modalShow,
      option: nextProps.option,
      optionValue: nextProps.optionValue
    });
  }

  handleClose = () => {
    this.setState({show : false });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // send request to server to update the data 
    // ADD CODE HERE
  }

  handleDeactivateAccount = () => {
    console.log("Deactivating account...");
    // send request to the server to deactivate account 
    // ADD CODE HERE
  }

  onChange = (e) => {
    this.setState({[e.target.name] : e.target.value });
  }

  render() {
    const { option, optionValue } = this.state;
    const updateName = (
      <Form>
        <div className="row">
          <div className="col-md-9">
             <Form.Group controlId="formBasicEmail">
              <Form.Control 
                type="text"
                placeholder="Enter your name"
                onChange={this.onChange}
                defaultValue={optionValue}
                name="name"
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Button className="btn btn-light" type="button" onClick={this.handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </Form>
    );

    const updateEmail = (
      <Form>
        <div className="row">
          <div className="col-md-9">
             <Form.Group controlId="formBasicName">
              <Form.Control 
                type="text"
                placeholder="Enter email address"
                onChange={this.onChange}
                defaultValue={optionValue}
                name="email"
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Button className="btn btn-light" type="button" onClick={this.handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </Form>
    );
    const updateUsername = (
      <Form>
        <div className="row">
          <div className="col-md-9">
             <Form.Group controlId="formBasicEmail">
              <Form.Control 
                type="text"
                placeholder="Enter your username"
                onChange={this.onChange}
                defaultValue={optionValue}
                name="username"
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Button className="btn btn-light" type="button" onClick={this.handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </Form>
    );
    const deactivateAccount = (
      <div className="container">
        <p className="text text-center" style={{color: "red"}}><b>Are you sure ??</b></p>
        <div className="row">
          <div className="col-md-2"></div>
            <button className="btn btn-outline-success col-md-3" onClick={this.handleClose}>No</button>
          <div className="col-md-2"></div>
            <button className="btn btn-outline-danger col-md-3" onClick={this.handleDeactivateAccount}>Yes</button>
          <div className="col-md-2"></div>
        </div>
      </div>
    );

    const checkVerification = (
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            { optionValue ? (<MdVerifiedUser size={60} color="blue"/>) : 
            (<FaUserSlash size={60} color="red"/>)}
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    )
    return (
       <Modal show={this.state.show} onHide={this.handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update { " " + option }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Boolean(option === "name") ? updateName : null}
          {Boolean(option === "email") ? updateEmail: null}
          {Boolean(option === "username") ? updateUsername: null}
          {Boolean(option === "account") ? deactivateAccount: null}
          {Boolean(option === "identity") ? checkVerification : null}
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    )
  }
}

Popups.propTypes = {
  modalShow: PropTypes.bool.isRequired,
  option: PropTypes.string.isRequired,
  optionValue: PropTypes.any.isRequired
}


export default Popups;

