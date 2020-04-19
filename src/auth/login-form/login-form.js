import React, { Component } from "react";
import Popups from '../../common/Popups';
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
      password: "",
      modalShow: false,
      option: "",
      optionValue: ""
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
