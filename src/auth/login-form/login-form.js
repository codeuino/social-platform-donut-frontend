import React, { Component } from "react";
import { Form } from "react-bootstrap";
import "./login-form.scss";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authAction';
import { Grid, TextField, Button  } from '@material-ui/core';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.loginUser(this.state, this.props.history);
  }

  onChange = (e) =>{
    this.setState({ [e.target.name]:e.target.value })
  }

  render() {
   const {email,password} = this.state
    return (
      <div className="login-details">
        <Form onSubmit={this.onSubmit}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
        <TextField
              id="outlined-primary"
              label="Email"
              type="email"
              fullWidth
              size="small"
              name="email"
              value={email}
              onChange={this.onChange}
              variant="outlined"
              />
        </Grid>
        <Grid item xs={12}>
        <TextField
                id="outlined-primary"
                label="Password"
                type="password"
                fullWidth
                size="small"
                name="password"
                value={password}
                onChange={this.onChange}
                variant="outlined"
              />
        </Grid>
       </Grid>
         
          <div className="cta-login">
            <Button
            variant="contained" color="primary"
              type="submit">
              Login
            </Button>
          </div>
        </Form>
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
