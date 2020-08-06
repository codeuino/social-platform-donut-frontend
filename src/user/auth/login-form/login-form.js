import React, { Component } from "react";
import Popups from "../../../common/Popups";
import { Form, Button } from "react-bootstrap";
import "./login-form.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authAction";
import { ToastContainer, toast } from 'react-toastify'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      modalShow: false,
      option: "",
      optionValue: "",
      error: '',
      isValidEmail: true,
      isValidForm: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps login-form', nextProps)
    const error = nextProps.error
    this.setState({
      error: error?.msg
    }, () => {
      console.log('error state', this.state)
      if(Boolean(this.state?.error?.length > 0)) {
        toast.error(`${this.state.error}`)
      }
    })
  }

  onSubmit = (e) => {
    const { isValidForm } = this.state;
    e.preventDefault();
    if (isValidForm) {
      this.props.loginUser(this.state, this.props.history);
    } else {
      this.setState({ isValidForm: false });
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField = (fieldName, value) => {
    const { isValidEmail } = this.state;
    let validEmail = isValidEmail;

    switch (fieldName) {
      case "email": {
        validEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        break;
      }
      default:
        break;
    }

    this.setState(
      {
        isValidEmail: validEmail,
      },
      this.validateForm
    );
  };

  validateForm = () => {
    const { isValidEmail } = this.state;
    this.setState({ isValidForm: isValidEmail });
  };

  handleToggle = (e) => {
    const targetName = e.target.name;
    this.setState({
      modalShow: true,
      option: targetName,
    });
  };

   // toggle Popups
  toggle = (toggler) => {
    this.setState({
      modalShow: !this.state.modalShow
    }, () => {
      console.log('toggler ', this.state);
    })
  }

  render() {
    const { error } = this.state
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
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="***********"
              name="password"
              onChange={this.onChange}
            />
          </Form.Group>
          <div className="cta-login">
            <Button
              className="loginbtn"
              type="submit"
              variant="primary"
              color="primary"
            >
              <span className="loginbtn-text">Login</span>
            </Button>
          </div>
        </Form>
        <a
          className="forgot-password"
          href="javascript:void(0)"
          onClick={this.handleToggle}
          name="password"
        >
          Forgot Password?
        </a>
        <Popups
          option={this.state.option}
          optionValue={this.state.optionValue}
          modalShow={this.state.modalShow}
          toggler={this.toggle}
        />
        {error ? (
           <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        ) : null}
      </div>
    );
  }
}

// map state to props
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { loginUser })(withRouter(LoginForm));
