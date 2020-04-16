import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import "./popups.scss";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../../actions/authAction';

class Logout extends Component{
    // eslint-disable-next-line
    constructor(props){
        super(props);
    }
    onLogoutClick = (e) => {
      e.preventDefault();
      console.log("Logging out!");
      this.props.logoutUser();
    }
    render(){
      return (
          <Modal
            {...this.props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
          <div className="container">
            <Modal.Header closeButton className="heading border border-0 p-0">
            <Modal.Title id="contained-modal-title-vcenter"> 
            <div className="title">Logout?</div>
            <div className="message">Are you sure you want to logout of Donut?</div>
            </Modal.Title> 
            </Modal.Header>
            
            <div className="form-footer">
              <Button onClick={this.onLogoutClick} className="savebtn" size="sm">Yes</Button>
              <Button variant="outline-primary" onClick={this.props.onHide} size="sm">No</Button>
            </div>
          </div>
      </Modal>
      );
  }
}
// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Logout));