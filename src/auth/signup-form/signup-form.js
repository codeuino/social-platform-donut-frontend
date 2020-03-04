import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./signup-form.scss";
import TextField from '@material-ui/core/TextField';

class SignUpForm extends Component {
  render() {
    return (
      <div className="signup-details">
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

          <Form.Group controlId="formBasicPassword">
            <TextField
              id="outlined-full-width"
              label="Re-Type Password"
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

export default SignUpForm;
