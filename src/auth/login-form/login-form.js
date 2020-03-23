import React, { Component } from "react";
import Popups from '../../common/Popups';
import { Form, Button } from "react-bootstrap";
import "./login-form.scss";
import cookie from "react-cookies";
import { withRouter } from "react-router-dom";
import * as auth from "../auth-service";

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


  //     const handleToggle = (e) => {
//       const targetName = e.target.name;
//       this.setState({
//         modalShow: true,
//         option: targetName
//       });
//       setOptionValue(targetName);
//     }

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

        const handleToggle = (e) => {
      const targetName = e.target.name;
      this.setState({
        modalShow: true,
        option: targetName
      });
  
    }
    return (
      <div className="login-details">
        <Form>
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
              onClick={this.authorizeUser}
            >
              Login
            </Button>
          </div>
        </Form>
        <a className ="forgot-password" href="javascript:void(0)" onClick={handleToggle} name="password">Forgot Password?</a>
 
        <Popups 
        option={this.state.option}
        optionValue={this.state.optionValue}
        modalShow={this.state.modalShow}
      />
        </div>
     
 
    );
  }
}

export default withRouter(LoginForm);






// import React, { Component } from 'react';
// import SettingSidebar from './layouts/SettingSidebar';
// import './styles/settings.scss';
// import Popups from '../../../common/Popups';

// class SettingContent extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       data: {
//           name: "Default",
//           username: "Default",
//           email: "test@test.com",
//           identity: true,
//           account: "",
//       },
//       modalShow: false,
//       option: "",
//       optionValue: ""
//     }
//   }
//   componentDidMount(){
//     // here get the data from api and update the state 
//   }

//   render() {
//     const { name, email, username, identity } = this.state.data;
//     const setOptionValue = (targetName) => {
//       let value;
//       Object.entries(this.state.data).filter(([key, val])=>{
//         if(key === targetName){
//           value = val;
//           this.setState({optionValue: value});
//         }
//         return value;
//       })
//     }
//     //toggle modal
//     const handleToggle = (e) => {
//       const targetName = e.target.name;
//       this.setState({
//         modalShow: true,
//         option: targetName
//       });
//       setOptionValue(targetName);
//     }
    
//     return (
//       <div className="">
//         <div className="row ml-3">
//           <div className="col-md-9 mt-5">
//             <h4><b>General account settings</b></h4><hr/>
//             <div className="row">
//               <div className="col-md-3">
//                 <p className="options">Name</p>
//               </div>
//               <div className="col-md-9">
//                <p className="options-value">{name}
//                <span><a href="javascript:void(0)" onClick={handleToggle} style={{float: "right"}} name="name">Edit</a></span>
//                </p>
//               </div>
//             </div><hr/>
//             <div className="row">
//               <div className="col-md-3">
//                 <p className="options">Username</p>
//               </div>
//               <div className="col-md-9">
//                 <p className="options-value">{username}
//                   <span><a href="javascript:void(0)" onClick={handleToggle} style={{float: "right"}} name="username">Edit</a></span>
//                 </p>
//               </div>
//             </div><hr/>
//             <div className="row">
//               <div className="col-md-3">
//                 <p className="options">Email</p>
//               </div>
//               <div className="col-md-9">
//                 <p className="options-value">{email}
//                 <span><a href="javascript:void(0)" onClick={handleToggle} style={{float: "right"}} name="email">Edit</a></span>
//                 </p>
//               </div>
//             </div><hr/>
//             <div className="row">
//               <div className="col-md-3">
//                 <p className="options">Identity verified</p>
//               </div>
//               <div className="col-md-9">
//                 <p className="options-value">{identity ? "Yes" : "No"}
//                 <span><a href="javascript:void(0)" onClick={handleToggle} style={{float: "right"}} name="identity">View</a></span>
//                 </p>
//               </div>
//             </div><hr/>
//             <div className="row">
//               <div className="col-md-3">
//                 <p className="options">Deactivate account ?</p>
//               </div>
//               <div className="col-md-9">
//                 <button className="btn btn-light" style={{float: "right"}} name="account" onClick={handleToggle}>Deactivate</button>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-3 setting-sidebar">
//             <SettingSidebar/>
//           </div>
//         </div>
//        <Popups 
//           option={this.state.option}
//           optionValue={this.state.optionValue}
//           modalShow={this.state.modalShow}
//         />
//       </div>
//     )
//   }
// }
// export default SettingContent;

