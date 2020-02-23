import React, { Component } from "react";
import "./user-info.scss";
import { Button } from "react-bootstrap";
import { UserEdit } from "../../../popups/UserEdit/UserEdit";

class UserInfo extends Component {
  state = { userEdit :false };

  render() {
    const closePopup =()=>this.setState({
      userEdit:false
    })
    return (
      <div className="user-details">
        <div className="user-image">
          <div className="user-pic">
            <img src="" alt="" />
          </div>
          <div className="edit-option">
            <Button variant="primary" onClick={()=>this.setState({userEdit:true})}>User Edit</Button>
            <UserEdit show={this.state.userEdit} onHide={closePopup}/>
          </div>
        </div>
        <div className="user-data">
          <h1>
            Dhanus Rajendra <Button variant="primary">Follow</Button>
          </h1>
          <p className="profession">Front end developer</p>
          <p className="place">Bengaluru, Karnataka</p>
          <p className="desc">
            where millions of people gather together every day to imagine,
            create
          </p>
          <div className="social-icons">
            <Button variant="primary">Facebook</Button>
            <Button variant="primary">Linkedin</Button>
            <Button variant="primary">Github</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
