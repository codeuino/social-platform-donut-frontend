import React, { Component } from "react";
import Members from '../../organization/popups/Members'
import "./portfolio.scss";
import Followers from "../../profile/popups/Followers";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followersList: false,
      membersList: false
    }
  }
  showMembers = () => {
    this.setState({ membersList: true })
  }
  closeMembersList = () => {
    this.setState({ membersList: false })
  }
  showFollowersList = () => {
    this.setState({ followersList: true });
  }
  closeFollowersList = () => {
    this.setState({ followersList: false })
  }
  render() {
    return (
      <div className="portfolio">
        <div className="items-list">
          <div className="item members_list" onClick={this.showMembers}>
            <h1><b>41</b></h1>
            <h3>Members</h3>
          </div>
          <Members show={this.state.membersList} onHide={this.closeMembersList} />
          <div className="item">
            <h1><b>59</b></h1>
            <h3>Events Organized</h3>
          </div>
        </div>
        <div className="items-list">
          <div className = "item followers__pointer" onClick = { this.showFollowersList }>
            <h1><b>123</b></h1>
            <h3>Followers</h3>
          </div>
          <Followers show={this.state.followersList} onHide={this.closeFollowersList} />
          <div className="item">
            <h1><b>87</b></h1>
            <h3>Events Attended</h3>
          </div>
        </div>
        <div className="items-list">
          <div className="item">
            <h1><b>12</b></h1>
            <h3>Projects</h3>
          </div>
          <div className="item">
            <h1><b>41</b></h1>
            <h3>Following</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
