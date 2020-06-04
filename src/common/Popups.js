import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { MdVerifiedUser } from 'react-icons/md';
import { FaUserSlash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { forgotPassword, changePassword } from '../actions/authAction';
 
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
      optionValue: "",
      newPass: "",
      cnfPass: ""
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

  changePassword = (e) => {
    e.preventDefault();
    const { newPass } = this.state;
    const { auth, changePassword, status } = this.props;
    
    const passObj = { 
      password: newPass,
      id: auth.user ? auth.user._id : null
    };
    
    console.log("change password request sending ...", passObj);
    changePassword(passObj);

    // show notification on sidebar if done successfully 
    if(status.success) {
      console.log("Successfully changed the password!");
    }
  }
  
  forgotPasswordRequest = () => {
    const { email } = this.state;
    const { forgotPassword, status } = this.props;
    
    console.log("forgot password request sending...")
    forgotPassword(email);
    
    let { currentStep } = this.state;
    // move to next step if forgot password request successful
    if(status.success){
      currentStep = currentStep >= 2 ? 2 : currentStep + 1
      this.setState({
        currentStep: currentStep
      })
    } else {
      // show error message in popup 
      console.log("Something went wrong!!");
    }

  }
    

nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep <2){
    return (
      <button 
        className="btn btn-primary btn-block" 
        type="button" 
        onClick={this.forgotPasswordRequest}
        > 
        Send Password Reset-Email
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


   const resetPassword = (
     <Form>
       {this.state.newPass !== this.state.cnfPass ? (
       <small className="text text-danger">Password not matched!!</small> ) : null}
      <div className="form-group">
      <label htmlFor="password">New Password</label>
      <input
        className="form-control"
        name="newPass"
        type="password"
        placeholder="***********"
        onChange={this.onChange}
        defaultValue={this.state.newPass}
        />      
    </div>
    <div className="form-group">
      <label htmlFor="password">Confirm Password</label>
      <input
        className="form-control"
        name="cnfPass"
        type="password"
        placeholder="***********"
        onChange={this.onChange}
        defaultValue={this.state.cnfPass}
      />      
    </div>
    <button 
      className="btn btn-primary btn-block"
      onClick={this.changePassword}
      >
      Update Password
      </button>
    </Form>
   )
    const updatePassword = (
      <React.Fragment>
      <form onSubmit={this.handleSubmit}>
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
          {Boolean(option === "new-password") ? resetPassword : null}
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
      <label htmlFor="password">Check your email to get the link of reset the password. If it doesnot appear within few minutes, check the spam folder.</label>
          
    </div>
    </React.Fragment>
  );
}
 
Popups.propTypes = {
  modalShow: PropTypes.bool.isRequired,
  option: PropTypes.string.isRequired,
  optionValue: PropTypes.any.isRequired
}
 
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    status: state.status,
    error: state.error
  }
}
 
export default connect( mapStateToProps, { forgotPassword, changePassword })(Popups);