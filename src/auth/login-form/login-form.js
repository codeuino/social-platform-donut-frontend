import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./login-form.scss";
import cookie from "react-cookies";
import { withRouter } from "react-router-dom";
import * as auth from "../auth-service";
import TextField from '@material-ui/core/TextField';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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

  authorizeUser = event => {
    event.preventDefault();
    const isValidated = this.checkValidation();
    if (isValidated) {
      auth
        .loginIn(this.state)
        .then(response => {
          const decodedToken = auth.decodeResponse(response.data.token);
          this.setSession(decodedToken);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  setSession = token => {
    const id = token.payload._id;
    cookie.save("userId", id, { path: "/" });
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div className="login-details">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <TextField
              id="outlined-full-width"
              label="Email"
              style={{ margin: 8 }}
              placeholder="abc@donut.com"
              helperText="We will not share your information with anyone"
              fullWidth
              margin="normal"
              InputLabelProps={{
              shrink: true,
              }}
              variant="outlined"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <TextField
              id="outlined-full-width"
              label="Password"
              style={{ margin: 8 }}
              placeholder="********"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Form.Group>
          <div className="cta-login">
            <Button
              variant="primary"
              type="submit"
              onClick={this.authorizeUser}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
