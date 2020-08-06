import React, { Component } from "react";
import "./org-info.scss";
import { Button } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import EditInfo from "../popups/EditInfo";
import { connect } from 'react-redux';
import { getOrgProfile } from '../../../actions/orgAction'
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import Moment from 'react-moment'

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
           <div className="fa_icon__container">
            <span>
              <FaFacebookSquare
                color="#4457a5"
                className="fa__icon"
                onClick={this.onFbClick}
                size={30}
              />
            </span>
            <span>
              <FaGithubSquare
                color="#24292e"
                className="fa__icon"
                onClick={this.onGithubClick}
                size={30}
              />
            </span>
            <span>
              <FaLinkedin
                color="#1a73e8"
                className="fa__icon"
                onClick={this.onLinkedInClick}
                size={30}
              />
            </span>
          </div>
          <h1>
            {name || "NA" }
            {/* <Button variant="primary" size="sm" className="org-followbtn">
              Follow
            </Button> */}
          </h1>
          <p className="profession mr-3">Created on: 
            <Moment format="DD MMM YYYY">
              {createdAt || "NA"}
            </Moment>
          </p>
          <p className="desc">
            {description?.shortDescription || "Short description of org "}
          </p>
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
