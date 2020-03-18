import React, { Component } from 'react'
import { Form, Button } from "react-bootstrap";
import {Link} from 'react-router-dom'
import './forgot-password.scss'
import multipleDonuts from "../../images/extra-donuts.png";
class ForgotPassword extends Component {

    render() {
        return (
           
            <div className="forgotpassword-page">
            <div className="extra-donuts">
            <img src={multipleDonuts} alt="donut logo" />
          </div>
            <div className="password-details">
              <div className="password-data">
            <Form>
            <Link to="/" className="btn btn-light">
            Go Back
          </Link>
   
              <Form.Group controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="***********" />
              </Form.Group>
    
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="***********" />
              </Form.Group>
      
                <Button variant="primary" type="submit">
                  Save Password
                </Button>
        
            </Form>
       
          
              </div>
            </div>
          </div>
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
        
        )
    }
}

export default ForgotPassword
