import React, { Component } from "react";
import "./org-info.scss";
import { Button } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import EditInfo from "../popups/EditInfo";
import { connect } from 'react-redux';
import { getOrgProfile } from '../../../actions/orgAction'

class OrgInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editOrg: false,
      orgProfile: {}
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

  componentDidMount() {
    console.log('props ', this.props)
    // this.props.getOrgProfile()
  }

  componentWillReceiveProps(nextProps) {
    console.log('orgInfo nextProps', nextProps)
    this.setState({ orgProfile: nextProps.org?.org }, () => {
      console.log('updating org profile', this.state)
    })
  }

  render() {
    const { orgProfile } = this.state
    const { 
      name, 
      description, 
      // contactInfo, 
      createdAt
     } = orgProfile
    return (
      <div className="org-details">
        <div className="org-image">
          <div className="org-pic">
            <Avatar alt="Organisation-DP" className="orgpic" src=""></Avatar>
          </div>
          <div className="edit-option">
            <Button variant="primary" className="useredit">
              Community
            </Button>
          </div>
          <EditInfo show={this.state.editOrg} onHide={this.closeEditPop} />
        </div>
        <div className="org-data">
          <h1>
            {name || "NA" }
            {/* <Button variant="primary" size="sm" className="org-followbtn">
              Follow
            </Button> */}
          </h1>
          <p className="profession">Created on: {createdAt || "NA"}</p>
          <p className="desc">
            {description?.shortDescription || "Short description of org "}
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

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  org: state.org,
  error: state.error
})

export default connect(mapStateToProps, { getOrgProfile })(OrgInfo);
