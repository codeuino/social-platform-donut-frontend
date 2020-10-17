import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { MdVerifiedUser } from 'react-icons/md';
import { FaUserSlash } from 'react-icons/fa';
import { connect } from 'react-redux';
import { forgotPassword, changePassword } from '../actions/authAction';
import { activateDeactivateToggler, updateProfile } from '../actions/usersAction';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
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
      cnfPass: "",
      requested: false,
      userId: ''
    }
  }
  
  componentWillReceiveProps(nextProps){
    console.log('nextProps in common ', nextProps)
    this.setState({
      userId: nextProps.user.userProfile?._id,
      show: nextProps.modalShow,
      option: nextProps.option,
      optionValue: nextProps.optionValue,
    });
    if(nextProps.option === "name") {
      this.setState({
        firstName: nextProps?.optionValue?.firstName,
        lastName: nextProps?.optionValue?.lastName
      })
    }
    const { currentStep, requested } = this.state
    if (nextProps.auth.resetPassReq !== null && requested) {
      toast.success('Link sent to your registered email!')
      let step = currentStep >= 2 ? 2 : currentStep + 1
      this.setState({
        currentStep: step 
      })
    } 
  }
 
  handleClose = () => {
    this.setState({show : false });
    this.props.toggler(false);
  }
 
  updateUserInfo = (e, option) => {
    e.preventDefault();
    // send request to server to update the data 
    if(option === "name") {
      const { firstName, lastName, userId } = this.state
      const info = {
        name: {
          firstName,
          lastName
        }
      }
      var id = userId || localStorage.getItem('userId')
      this.props.updateProfile(id, info)
      this.props.toggler(false);
    }

    if(option === "email") {
      const { email } = this.state
      const info = {
        email: email
      }
      this.props.updateProfile(id, info);
      this.props.toggler(false);
    }
  }
 
  handleDeactivateAccount = (e) => {
    e.preventDefault();
    console.log("Deactivating account...", this.state);
    // send request to the server to deactivate account 
    this.props.activateDeactivateToggler()
    this.props.toggler(false);
  }
 
  onChange = (e) => {
    this.setState({[e.target.name] : e.target.value });
  }

  changePassword = (e) => {
    e.preventDefault();
    const { newPass, success } = this.state;
    const { auth, changePassword } = this.props;
    
    const passObj = { 
      password: newPass,
      id: auth.user ? auth.user._id : null
    };
    
    console.log("change password request sending ...", passObj);
    changePassword(passObj);

    // show notification on sidebar if done successfully 
    if(success) {
      console.log("Successfully changed the password!");
    }
  }
  
  forgotPasswordRequest = () => {
    const { email } = this.state;
    const { forgotPassword } = this.props;
    
    console.log("forgot password request sending...")
    const emailObj = {
      email: email
    }
    this.setState({ requested: true })
    forgotPassword(emailObj);
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
      <React.Fragment>
        <Form className="modal__form">
          <Form.Row className="modal__row">
            <Form.Group as={Col} className="modal__group">
              <Form.Label className="modal__label"> First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                onChange={this.onChange}
                defaultValue={optionValue?.firstName}
                name="firstName"
              />
            </Form.Group>
            <Form.Group as={Col} className="modal__group">
              <Form.Label className="modal__label"> Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                onChange={this.onChange}
                defaultValue={optionValue?.lastName}
                name="lastName"
              />
            </Form.Group>
          </Form.Row>
        </Form>
        <div className="modal__setting__btn__container">
          <Button
            className="modal__save"
            onClick={(e) => this.updateUserInfo(e, "name")}
          >
            <span className="modal__buttontext">Save</span>
          </Button>
        </div>
      </React.Fragment>
    );
 
    const updateEmail = (
      <React.Fragment>
        <Form className="modal__form">
          <Form.Row className="modal__row">
            <Form.Group className="modal__group" as={Col}>
              <Form.Label className="modal__label" />
              <Form.Control
                type="text"
                placeholder="Enter email address"
                onChange={this.onChange}
                defaultValue={optionValue}
                name="email"
              />
            </Form.Group>
          </Form.Row>
        </Form>
        <div className="modal__setting__btn__container">
          <Button
            className="modal__save"
            onClick={(e) => this.updateUserInfo(e, "email")}
          >
            <span className="modal__buttontext">Save</span>
          </Button>
        </div>
      </React.Fragment>
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
      <Form className="modal__form" onSubmit={this.handleSubmit}>
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

      </Form>
      </React.Fragment>
    );
    const deactivateAccount = (
      <Form className="modal__form">
        <Form.Row className="modal__row">
          <Form.Group className="modal__group" as={Col}>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <span style={{ fontFamily: "Inter", color: "red" }}>
                 Are you sure?
                </span>
              </div>
              <div className="col-md-4"></div>
            </div>
          </Form.Group>
        </Form.Row>
        <div className="row">
          <div className="col-md-2"></div>
          <button
            className="btn btn-outline-success col-md-3"
            onClick={this.handleClose}
            type="submit"
          >
            No
          </button>
          <div className="col-md-2"></div>
          <button
            className="btn btn-outline-danger col-md-3"
            onClick={this.handleDeactivateAccount}
            type="submit"
          >
            Yes
          </button>
          <div className="col-md-2"></div>
        </div>
      </Form>
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
       <Modal 
        show={this.state.show} 
        onHide={this.handleClose} 
        animation={true} 
        centered
        className="modal"
        >
        <Modal.Header closeButton className="modal__header">
          <Modal.Title className="modal__title">
            <div className="modal__main-title">
              Update { " " + option }
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          {Boolean(option === "name") ? updateName : null}
          {Boolean(option === "email") ? updateEmail: null}
          {Boolean(option === "password") ? updatePassword : null}
          {Boolean(option === "new-password") ? resetPassword : null}
          {Boolean(option === "account") ? deactivateAccount: null}
          {Boolean(option === "identity") ? checkVerification : null}
        </Modal.Body>
      </Modal>
    )
  }
}


function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  } 
  return(
    <Form.Row className="modal__row">
      <Form.Group as={Col} className="modal__group">
        <Form.Label 
          htmlFor="email" 
          className="modal__label"
          >
            Registered-Email address
        </Form.Label>
        <Form.Control
          id="email"
          name="email"
          type="text"
          placeholder="abc@gmail.com"
          value={props.email}
          onChange={props.onChange}
          />
      </Form.Group>
    </Form.Row>
  );
}



function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  } 
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="form-group">
        <label htmlFor="password">
          Check your email to get the link of reset the password. If it doesnot
          appear within few minutes, check the spam folder.
        </label>
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
    user: state.user,
    error: state.error
  }
}
 
export default connect( mapStateToProps, { 
  forgotPassword, 
  changePassword, 
  updateProfile,
  activateDeactivateToggler
 })(Popups);