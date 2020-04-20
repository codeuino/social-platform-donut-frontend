import React, { Component } from "react";
import "./org-info.scss";
import { Button } from "react-bootstrap";
import { EditOrg } from './../popups/EditOrg';
import {OrgFollowers} from './../popups/org-followers';

class OrgInfo extends Component {

  constructor(props){
    super(props);
    this.state = {
      edit : false,
      fol : false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
  }
  handleClose(){
    this.setState({edit: false});
  };
  handleFollow(){
    this.setState({fol : false});
  }
  render() {
    return (
      <div className="org-details">
        <div className="org-image">
          <div className="org-pic">
            <img src="" alt="" />
          </div>
          <div className="edit-option">
            <Button variant="primary"
            onClick={()=>this.setState({edit: true})}>
              User Edit
            </Button>
            <EditOrg open={this.state.edit}
            onClose={this.handleClose}/>
          </div>
        </div>
        <div className="org-data">
          <h1>
            CodeUnio Community <Button variant="primary"
            onClick={()=>this.setState({fol: true})}>Follow</Button>
            <OrgFollowers open={this.state.fol}
            onClose={this.handleFollow} />
          </h1>
          <p className="profession">Started 10 years ago</p>
          <p className="place">584 members</p>
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

export default OrgInfo;
