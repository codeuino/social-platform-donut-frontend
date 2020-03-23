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
      currentStep: 1,
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


  
  step_next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2? 2: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    

  


nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep <2){
    return (
      <button 
        className="btn btn-primary float-right" 
        type="button" onClick={this.step_next}>
      Next
      </button>        
    )
  }
  return null;
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
    const updatePassword = (
      <React.Fragment>

      <form onSubmit={this.handleSubmit}>
      {/* 
        render the form steps and pass required props in
      */}
        <Step1 
          currentStep={this.state.currentStep} 
          onChange={this.onChange}
          email={this.state.email}
        />
        <Step2 
          currentStep={this.state.currentStep} 
          onChange={this.onChange}
         
        />
      
        {this.nextButton()}

      </form>
      </React.Fragment>
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
          {Boolean(option === "password") ? updatePassword : null}
          {Boolean(option === "account") ? deactivateAccount: null}
          {Boolean(option === "identity") ? checkVerification : null}
        </Modal.Body>
        <Modal.Footer>
        
        </Modal.Footer>
      </Modal>
    )
  }
}


function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  } 
  return(
    <div className="form-group">
      <label htmlFor="email">Registered-Email address</label>
      <input
        className="form-control"
        id="email"
        name="email"
        type="text"
        placeholder="abc@gmail.com"
        value={props.email}
        onChange={props.onChange}
        />
    </div>
  );
}



function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  } 
  return(
    <React.Fragment>
    <div className="form-group">
      <label htmlFor="password">New Password</label>
      <input
        className="form-control"
        name="new_password"
        type="password"
        placeholder="***********"
        onChange={props.onChange}
        />      
    </div>
    <div className="form-group">
    <label htmlFor="password">Confirm Password</label>
    <input
      className="form-control"
      name="confirm_password"
      type="password"
      placeholder="***********"
      onChange={props.onChange}
      />      
  </div>
    <button className="btn btn-primary btn-block">Update Password</button>
    </React.Fragment>
  );
}
 
Popups.propTypes = {
  modalShow: PropTypes.bool.isRequired,
  option: PropTypes.string.isRequired,
  optionValue: PropTypes.any.isRequired
}
 
 
export default Popups;