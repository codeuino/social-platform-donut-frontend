import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { loginAdmin } from '../../../actions/adminAction'
import { withRouter } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false,
      email: '',
      password: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('login nextProps', nextProps)
  }

  loginAdmin = (e) => {
    e.preventDefault()
    const { email, password } = this.state
    const info = {
      email: email,
      password: password
    }
    console.log('admin login', info)
    this.props.loginAdmin(info, this.props.history)
    if(this.props.status.success) {
      this.props.toggle('setup')
    }
  }

  onChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { email, password } = this.state
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
                  defaultValue={email}
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
                  defaultValue={password}
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
                onClick={this.loginAdmin}
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

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  admin: state.admin,
  status: state.status
})

export default connect(mapStateToProps, { loginAdmin })(withRouter(Login));