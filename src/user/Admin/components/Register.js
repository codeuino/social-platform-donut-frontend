import React, { Component } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux';
import { createAdmin } from '../../../actions/adminAction'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cnfPass: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("Register admin nextProps ", nextProps);
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  registerAdmin = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    const info = {
      name: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      isAdmin: true,
    };
    console.log("registering admin", info);
    this.props.createAdmin(info)
    if (this.props.status.success) {
      this.props.toggle("activate");
    }
  };

  render() {
    const { firstName, lastName, email, password, cnfPass } = this.state;
    return (
      <div className="register-details">
        <div className="user__data">
          <Form onSubmit={this.onSubmit}>
            <center>
              <Form.Label htmlFor="admin__register" className="form__header">
                Admin Account Signup
              </Form.Label>
            </center>
            <div className="register__infos">
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form__group__label">
                  Admin Email
                </Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="abc@gmail.com"
                  name="email"
                  defaultValue={email}
                  onChange={this.onChange}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      defaultValue={firstName}
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      onChange={this.onChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      defaultValue={lastName}
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      onChange={this.onChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form__group__label">Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="***********"
                  name="password"
                  defaultValue={password}
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form__group__label">
                  Retype Password
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="***********"
                  name="cnfPass"
                  defaultValue={cnfPass}
                  onChange={this.onChange}
                />
              </Form.Group>
            </div>
            <div className="cta-register">
              <Button
                className="registerbtn"
                type="submit"
                variant="primary"
                color="primary"
                onClick={this.registerAdmin}
              >
                <span className="register-text">Register as an Admin</span>
              </Button>
            </div>
            <p
              className="already__account"
              onClick={() => this.props.toggle("login")}
            >
              Already have an account?
              <span className="link"> Login</span>
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  admin: state.admin,
  status: state.status
})

export default connect(mapStateToProps, { createAdmin })(Register);
