import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false,
    };
  }
  render() {
    return (
      <div className="login-details">
        <div className="user__data">
          <Form onSubmit={this.onSubmit}>
            <center>
              <Form.Label htmlFor="admin__login" className="form__header">
                Admin Account Login
              </Form.Label>
            </center>
            <div className="login__infos">
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form__group__label">
                  Admin Email
                </Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="abc@gmail.com"
                  name="email"
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form__group__label">Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="***********"
                  name="password"
                  onChange={this.onChange}
                />
              </Form.Group>
            </div>
            <div className="cta-login">
              <Button
                className="loginbtn"
                type="submit"
                variant="primary"
                color="primary"
                onClick={() => this.props.toggle('setup')}
              >
                <span className="login-text">Login as an Admin</span>
              </Button>
            </div>
            <p className="already__account" onClick={() => this.props.toggle('register')}>
              Don't have an account?
              <span className="link"> Register</span>
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;