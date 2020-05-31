import React, { Component } from 'react'
import { Form, Button} from 'react-bootstrap'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    }
  }
  gotoLogin = () => {

  }
  render() {
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
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form__group__label">
                  Admin Name
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter admin name"
                  name="name"
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
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form__group__label">
                  Retype Password
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="***********"
                  name="cnfPass"
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
                onClick={() => this.props.toggle('activate')}
              >
                <span className="register-text">Register as an Admin</span>
              </Button>
            </div>
            <p className="already__account" onClick={() => this.props.toggle('login')}>
              Don't have an account?
              <span className="link"> Login</span>
            </p>
          </Form>
        </div>
      </div>
    );
  }
}
export default Register;
