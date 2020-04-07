import React, { Component } from "react";
import "./user-info.scss";
import { Button } from "react-bootstrap";
import {EditProfile} from "./../popups/edit-profile";
import {Followers} from "./../popups/followers"
class UserInfo extends Component {
  state = { editProfile:false, followersList:false };
  render() {
    let cancel =()=>this.setState({
      editProfile:false
    });
    let cancelf =()=>this.setState({
      followersList:false
    });
    return (
      <div className="user-details">
        <div className="user-image">
          <div className="user-pic">
            <img src="" alt="" />
          </div>
          <div className="edit-option">
            <Button variant="primary" onClick={
              ()=>this.setState({editProfile:true})}>User Edit</Button>
              <EditProfile show={this.state.editProfile}
              onHide={cancel} />
          </div>
        </div>
        <div className="user-data">
          <h1>
            Dhanus Rajendra <Button variant="primary" onClick={
              ()=>this.setState({followersList:true})}>Follow</Button>
              <Followers show={this.state.followersList}
              onHide={cancelf} />
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
