import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./signup-form.scss";
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';
import { withRouter } from 'react-router-dom';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      cnfPassword: ""
    }
  }
  onChange = (e) => {
    this.setState({[e.target.name] : e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.registerUser(this.state, this.props.history);
    const emptyForm = {
      name: "",
      email: "",
      password: "",
      cnfPassword: ""
    };
    this.setState({emptyForm});
  }

  render() {
    const { email, password, cnfPassword } = this.state;
    return (
      <div className="signup-details">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="abc@gmail.com" 
              name="email" 
              onChange={this.onChange} 
              defaultValue={email}
              />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="***********" 
              name="password"
              onChange={this.onChange}
              defaultValue={password}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Re-Type Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="***********" 
              name="cnfPassword"
              onChange={this.onChange}
              defaultValue={cnfPassword}
            />
          </Form.Group>
          <div className="cta-register">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  error: state.error
});

export default connect(mapStateToProps, { registerUser })(withRouter(SignUpForm));
