import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import "./signup-form.scss";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phone_no: "",
      description:"",
      password: "",
      cnf_password: "",
    };
    this.onChange=this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
  }

  
  onChange(e){
    this.setState({ [e.target.name]:e.target.value })
}


  onSubmit(e) {
    e.preventDefault();
    const newUser = this.state

    console.log("register", newUser);
  }

  render() {
    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
    }));

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
                name="first_name"
                value={this.state.first_name}
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
                name="last_name"
                value={this.state.last_name}
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
                value={this.state.email}
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
                name="phone_no"
                value={this.state.phone_no}
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
              name="description"
              value={this.state.description}
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
                value={this.state.password}
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
                name="cnf_password"
                value={this.state.cnf_password}
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

export default SignUpForm;
