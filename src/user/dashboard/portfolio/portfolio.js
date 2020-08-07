import React, { Component } from "react";
import Members from '../../organization/popups/Members'
import "./portfolio.scss";
import Followers from "../../profile/popups/Followers";
import Admins from "../../organization/popups/Admins";
import { connect } from 'react-redux'
import { getMembers, getPersonalOverview } from '../../../actions/insightAction'
import { clearInviteLink } from '../../../actions/usersAction'
import { getProfile } from '../../../actions/usersAction'

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followersList: false,
      membersList: false,
      adminList: false,
      members: [],
      admins: [],
      followers: [],
      followings: [],
      personalInfo: {}
    }
  }

  componentDidMount() {
    const userId = localStorage.getItem('userId')
    this.props.getProfile(userId);
    setTimeout(() => {
      this.props.getMembers();
    })
    setTimeout(() => {
       this.props.getPersonalOverview();
    })
  }

  componentWillReceiveProps(nextProps) {
    const { insight, user} = nextProps
    let members = insight.allMembers
    let admins = insight.allMembers.filter(member => member.isAdmin === true);
    let info = insight.personalOverview
    let followers = user.userProfile?.followers
    let followings = user.userProfile?.followings;
    this.setState({ 
      members: members, 
      admins: admins, 
      personalInfo: info, 
      followers: followers, 
      followings: followings
     }, () => {
      console.log('state ', this.state);
    })
  }

  showMembers = () => {
    this.setState({ membersList: true })
  }
  closeMembersList = () => {
    this.setState({ membersList: false })
    this.props.clearInviteLink()
  }
  showFollowersList = () => {
    this.setState({ followersList: true });
  }
  closeFollowersList = () => {
    this.setState({ followersList: false })
  }
  showAdminLists = () => {
    this.setState({ adminList: true })
  }
  hideAdminLists = () => {
    this.setState({ adminList: false })
    this.props.clearInviteLink()
  }
  render() {
    const { members, admins, personalInfo, followers, followings } = this.state
    return (
      <div className="portfolio">
        <div className="items-list">
          <div className="item members_list" onClick={this.showMembers}>
            <h1><b>{members.length || 0}</b></h1>
            <h3 className="portfolio__text">Members</h3><hr/>
          </div>
          <Members show={this.state.membersList} onHide={this.closeMembersList} members={members} />
            <div className = "item admins__list" onClick={this.showAdminLists}>
              <h1><b> {admins.length || 0}</b></h1>
              <h3 className="portfolio__text">Administrators</h3>
            </div>
            <Admins show={this.state.adminList} onHide={this.hideAdminLists} admins={admins}/>
          </div>
        <div className="items-list">
          <div className = "item followers__pointer" onClick = { this.showFollowersList } >
            <h1><b>{followers?.length || 0}</b></h1>
            <h3 className="portfolio__text">Followers</h3><hr/>
          </div>
          <Followers show={this.state.followersList} onHide={this.closeFollowersList} followers={followers} followings={followings} />
          <div className="item">
            <h1><b>{personalInfo.events || 0}</b></h1>
            <h3 className="portfolio__text">Events Organized</h3>
          </div>
        </div>
        <div className="items-list">
          <div className="item">
            <h1><b>{personalInfo.projects || 0 }</b></h1>
            <h3 className="portfolio__text">Projects</h3><hr/>
          </div>
          <div className="item">
            <h1><b>{followings?.length || 0}</b></h1>
            <h3 className="portfolio__text">Following</h3>
          </div>
        </div>
      </div>
    );
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  insight: state.insight,
  user: state.user
})

export default connect(mapStateToProps, {
  getMembers, 
  getPersonalOverview, 
  getProfile,
  clearInviteLink
})(Portfolio);
