import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import "./signup-form.scss";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';
import { withRouter } from 'react-router-dom';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      shortDescription:"",
      password: "",
      cnfPassword: "",
      error:{}
    };
  }

  
  onChange = (e) => {
    this.setState({ [e.target.name]:e.target.value })
}


  onSubmit = (e) => {
    e.preventDefault();
    const {firstName, lastName, email, phone, shortDescription, password, cnfPassword } = this.state;
    if(password === cnfPassword){
      const newUser = {
        name:{
          firstName : firstName,
          lastName: lastName
        },
        email: email,
        phone: phone,
        password: password,
        info: {
          about: {
            shortDescription: shortDescription
        }
      }
      }
      this.props.registerUser(newUser, this.props.history);
    }
    else{
      this.props.history.push('/');
    }
    const emptyForm = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      shortDescription:"",
      password: "",
      cnfPassword: "",
      error:{}
    }
    this.setState({emptyForm});
  }

  render() {
    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
    }));
    const {firstName, lastName, email, phone, shortDescription, password, cnfPassword } = this.state;
    return (
      <div className="signup-details">
        <Form className={useStyles.root} onSubmit={this.onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                id="outlined-primary"
                label="First Name"
                type="Text"
                fullWidth
                size="small"
                name="firstName"
                value={firstName}
                 onChange={this.onChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-primary"
                label="Last Name"
                type="Text"
                fullWidth
                size="small"
                name="lastName"
                value={lastName}
                 onChange={this.onChange}
                variant="outlined"
              />
            </Grid>
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
                label="Phone Number"
                type="Number"
                fullWidth
                size="small"
                name="phone"
                value={phone}
                 onChange={this.onChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              id="outlined-primary"
              label="Description"
              type="Text"
              fullWidth
              size="small"
              name="shortDescription"
              value={shortDescription}
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
            <Grid item xs={12}>
              <TextField
                id="outlined-primary"
                label="Confirm Password"
                type="password"
                fullWidth
                size="small"
                name="cnfPassword"
                value={cnfPassword}
                 onChange={this.onChange}
                variant="outlined"
              />
            </Grid>
            <Button
              className="savebtn"
              type="submit"
              variant="primary"
              color="primary"
            >
              Register
            </Button>
          </Grid>
        </Form>
      </div>
    );
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  error: state.error
});

export default connect(mapStateToProps, { registerUser })(withRouter(SignUpForm));
