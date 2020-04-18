import React, { Component } from "react";
import Popups from '../../common/Popups';
import { Form, Button } from "react-bootstrap";
import "./login-form.scss";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authAction';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      modalShow: false,
      option: "",
      optionValue: ""
    };
 
    
  }
 
 
  handleChange = (event, params) => {
    event.preventDefault();
    params === "email"
      ? this.setState({ email: event.target.value })
      : this.setState({ password: event.target.value });
  };
 
  checkValidation = () => {
    if (this.state.email.includes("@") && this.state.email.includes(".")) {
      return true;
    }
    return false;
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.loginUser(this.state, this.props.history);
  }

  render() {
 
        const handleToggle = (e) => {
      const targetName = e.target.name;
      this.setState({
        modalShow: true,
        option: targetName
      });
  
    }
    return (
      <div className="login-details">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="abc@gmail.com"
              name="email"
              onChange={event => this.handleChange(event, "email")}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
 
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="***********"
              name="password"
              onChange={event => this.handleChange(event, "password")}
            />
          </Form.Group>
          <div className="cta-login">
            <Button
              variant="primary"
              type="submit"
            >
              Login
            </Button>
          </div>
        </Form>
        <a className ="forgot-password" href="javascript:void(0)"  onClick={handleToggle} name="password">Forgot Password?</a>
        <Popups 
        option={this.state.option}
        optionValue={this.state.optionValue}
        modalShow={this.state.modalShow}
      />
        </div>
     
 
    );
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { loginUser })(withRouter(LoginForm));
