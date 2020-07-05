import React, { Component } from "react";
import "./user-info.scss";
import { Button } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import EditProfile from "./../popups/EditProfile";
// import Followers from "../popups/Followers";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editProfile: false,
      followersList: false,
      name: '',
      designation: '',
      location: '',
      shortDesc: '',
      website: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps.userProfile)
    const name = nextProps.userProfile?.name || "NA"
    const about = nextProps.userProfile.info?.about;
    this.setState({ 
      name: `${name?.firstName + " " + name?.lastName}`,
      designation: about?.designation,
      shortDesc: about?.shortDescription,
      location: about?.location,
      website: about?.website
    })
  }

  render() {
    const { designation, location, shortDesc, name } = this.state
    let cancel = () =>
      this.setState({
        editProfile: false,
      });
    return (
      <div className="user-detail">
        <div className="user-image">
          <div className="user-pic">
            <Avatar className="userpic"></Avatar>
          </div>
          <div className="edit-option">
            <Button
              className="useredit"
              onClick={() => this.setState({ editProfile: true })}
            >
              User Edit
            </Button>
            <EditProfile show={this.state.editProfile} onHide={cancel} />
          </div>
        </div>
        <div className="user-data">
          <h1>
            {name || "NA"}{" "}
            {/* <Button
              variant="primary"
              onClick={() => this.setState({ followersList: true })}
            >
              Follow
            </Button>
            <Followers show={this.state.followersList} onHide={cancelf} /> */}
          </h1>
          <p className="profession">{designation || "NA" }</p>
          <p className="place">{location ||  "NA"}</p>
          <p className="desc">
            {shortDesc || "Short description"}
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
