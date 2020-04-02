import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Form, Modal } from 'react-bootstrap';
import { Button, FormControl, TextField, FormGroup } from '@material-ui/core';
import { Save, Close } from '@material-ui/icons';
import identityImage from "../images/identityVerify.gif";

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
    console.log("submitted value ", this.state);
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
    const optionsArray = ["name", "email", "account", "username", "identity"];
    let options;
    const updateName = (
      <Form>
        <div className="row">
          <div className="col-md-12">
             <FormGroup >
              <FormControl>
                <TextField 
                  label="Name" 
                  placeholder="Name" 
                  defaultValue={optionValue} 
                  name="name" 
                  onChange={this.onChange} 
                  variant="outlined" 
                  size="small" 
                  style={{width: "300px" }}
                  />
              </FormControl>
            </FormGroup>
          </div>
        </div>
      </Form>
    );

    const updateEmail = (
      <Form>
        <div className="row">
          <div className="col-md-12">
             <FormGroup >
             <FormControl>
                <TextField 
                  label="Email" 
                  placeholder="Email" 
                  defaultValue={optionValue} 
                  name="email" 
                  onChange={this.onChange} 
                  variant="outlined" 
                  size="small" 
                  style={{width: "300px" }}
                  />
              </FormControl>
            </FormGroup>
          </div>
        </div>
      </Form>
    );
    const updateUsername = (
      <Form>
        <div className="row">
          <div className="col-md-12">
             <FormGroup >
              <FormControl>
                <TextField 
                  label="Username" 
                  placeholder="Username" 
                  defaultValue={optionValue} 
                  name="username" 
                  onChange={this.onChange} 
                  variant="outlined" 
                  size="small" 
                  style={{width: "300px" }}/>
              </FormControl>
            </FormGroup>
          </div>
        </div>
      </Form>
    );
    const deactivateAccount = (
      <div className="container">
        <p className="text text-center" style={{color: "red"}}><b>Are you sure ??</b></p>
        <div className="row">
          <div className="col-md-2"></div>
            <Button 
              className="col-md-3" 
              variant="outlined" 
              color="primary" 
              onClick={this.handleClose}
              >No
              </Button>
          <div className="col-md-2"></div>
            <Button 
              className="col-md-3"
              color="secondary"
              variant="outlined"
              onClick={this.handleDeactivateAccount}
              >Yes
              </Button>
          <div className="col-md-2"></div>
        </div>
      </div>
    );

    const checkVerification = (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="center">{ optionValue ? (<div>
               <center>
                <img 
                  className="img-fluid img-circle"
                  src={identityImage} 
                  alt="identity badge" 
                  height="150px"
                  width="150px"
                />  
                <p className="text lead"><b>Verified, Thanks</b></p>
                </center>            
            </div>) : 
            ("Not verified")}</div>
          </div>
        </div>
      </div>
    );
    for(var i = 0; i < optionsArray.length; i++){
      if(optionsArray[i] === option && option === "name"){
        options = updateName;
        break;
      }
      if(optionsArray[i] === option && option === "email"){
        options = updateEmail;
        break;
      }
      if (optionsArray[i] === option && option === "username") {
        options = updateUsername;
        break;
      }
      if (optionsArray[i] === option && option === "account") {
        options = deactivateAccount;
        break;
      }
      if (optionsArray[i] === option && option === "identity") {
        options = checkVerification;
        break;
      }
    }
    
    return (
       <Modal show={this.state.show} onHide={this.handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update { " " + option }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {options}
        </Modal.Body>
        <Modal.Footer>
          <Button 
              variant="outlined"
              type="button" 
              onClick={this.handleSubmit}
              startIcon={<Save/>}
              >Save
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Close/>}
            onClick={this.handleClose} 
            >Cancel
          </Button>
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

