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
      error:{ msg: "" },
      isValidEmail: true,
      isValidPassword: true,
      isValidPhone: true,
      isValidDesc: true,
      isMatched: true, 
      isValidForm: false
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.error?.msg.length > 0) {
      this.setState({ 
        error: { 
          msg: 'Something went wrong, Please recheck the input!'
      }})
    }
  }
  
  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateFields(name, value);
    })
  }

  validateFields = (fieldName, value) => {
    const { 
      isMatched, 
      isValidDesc, 
      isValidEmail, 
      isValidPassword, 
      isValidPhone,
    } = this.state;

    let validPass = isValidPassword;
    let validEmail = isValidEmail;
    let validDesc = isValidDesc;
    let validPhone = isValidPhone;
    let matched = isMatched;
    
    switch(fieldName) {
      case 'email': {
        validEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        break;
      }
      case 'password': {
        validPass = value.length >= 6;
        break;
      }
      case 'phone': {
        validPhone = value.length === 10;
        break;
      }
      case 'shortDescription': {
        validDesc = value.length >= 10;
        break;
      }
      case 'cnfPassword': {
        matched = this.state.password === value.toString();
        break;
      }
      default:
        break;
    }

    this.setState({
      isMatched: matched,
      isValidEmail: validEmail,
      isValidDesc: validDesc,
      isValidPassword: validPass,
      isValidPhone: validPhone
    }, this.validateForm)
  
  }

  validateForm = () => {
    const { 
      isMatched, 
      isValidDesc, 
      isValidEmail, 
      isValidPassword, 
      isValidPhone 
    } = this.state;
    
    if(isMatched && isValidDesc && isValidEmail && isValidPassword && isValidPhone){
      this.setState({ isValidForm: true })
    } else {
      this.setState({ isValidForm : false })
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {
      firstName, 
      lastName, 
      email, 
      phone, 
      shortDescription, 
      password, 
      isValidForm 
    } = this.state;
    if(isValidForm){
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
      this.setState({ 
        error: { msg: 'Something went wrong, please check the input!'}
      })
    }
  }

  render() {
    const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
    }));
    const {
      firstName, 
      lastName, 
      email, 
      phone, 
      shortDescription, 
      password, 
      cnfPassword,
      isValidPassword,
      isValidEmail,
      isValidPhone, 
      isValidDesc,
      isMatched,
      isValidForm,
      error
    } = this.state;
    
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
                required = {true}
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
                required = {true}
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
                required = {true}
              />
              <ul className="list-unstyled">
                <li id="validation_msg">
                  {!isValidEmail ? 'Invalid email!' : null }
                </li>
              </ul>
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
                required = {true}
              />
              <ul className="list-unstyled">
                <li id="validation_msg">
                  {!isValidPhone ? 'Invalid phone number!' : null }
                </li>
              </ul>
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
              required = {true}
            />
            <ul className="list-unstyled">
              <li id="validation_msg">
                {!isValidDesc ? 'Should be at least 10 characters long!' : null }
              </li>
            </ul>
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
                required = {true}
              />
              <ul className="list-unstyled">
                <li id="validation_msg">
                  {!isValidPassword ? 'Should be at least 6 characters long!' : null }
                </li>
              </ul>
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
                required = {true}
              />
              <ul className="list-unstyled">
                <li id="validation_msg">
                  {!isMatched ? 'Password doesn\'t matched!' : null }
                </li>
              </ul>
            </Grid>
            <ul className="list-unstyled">
              <li id="validation_msg">
                { error?.msg.length > 0 ? error.msg : null }
              </li>
            </ul>
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
