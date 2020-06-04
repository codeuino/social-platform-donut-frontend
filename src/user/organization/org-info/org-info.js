import React, { Component } from "react";
import "./org-info.scss";
import { Button } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import EditInfo from "../popups/EditInfo";

class OrgInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editOrg: false
    }
  }
  onEditOrg = () => {
    console.log('Edit org is clicked!')
    this.setState({ editOrg: true })
  }
  closeEditPop = () => {
    console.log('Closing edit pop');
    this.setState({ editOrg: false })
  }

  render() {
    return (
      <div className="org-details">
        <div className="org-image">
          <div className="org-pic">
            <Avatar alt="Organisation-DP" className="orgpic" src=""></Avatar>
          </div>
          <div className="edit-option">
            <Button variant="primary" className="useredit" onClick={this.onEditOrg}>
              User Edit
            </Button>
          </div>
          <EditInfo show={this.state.editOrg} onHide={this.closeEditPop} />
        </div>
        <div className="org-data">
          <h1>
            CodeUnio
            <Button variant="primary" size="sm" className="org-followbtn">
              Follow
            </Button>
          </h1>
          <p className="profession">Started 10 years ago</p>
          <p className="place">584 members</p>
          <p className="desc">
            Where millions of people gather together every day to imagine,
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

export default OrgInfo;
