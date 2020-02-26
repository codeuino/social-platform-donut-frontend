import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./signup-form.scss";
import * as auth from "../auth-service";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  handleChange = (event, params) => {
    event.preventDefault();
    if (params === "name") {
      this.setState({ name: event.target.value });
    } else if (params === "email") {
      this.setState({ email: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
  };

  checkValidation() {
    if (
      this.state.email.includes("@") &&
      this.state.email.includes(".") &&
      this.state.name &&
      this.state.password
    ) {
      return true;
    }
    return false;
  }

  addUser = event => {
    event.preventDefault();
    const isValidated = this.checkValidation();
    if (isValidated) {
      auth
        .signUp(this.state)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div className="signup-details">
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="James Bond"
              required
              onChange={event => this.handleChange(event, "name")}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="abc@gmail.com"
              required
              onChange={event => this.handleChange(event, "email")}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="***********"
              required
              onChange={event => this.handleChange(event, "password")}
            />
          </Form.Group>

          <div className="cta-register">
            <Button variant="primary" type="submit" onClick={this.addUser}>
              Register
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default SignUpForm;
