import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import './community.scss'
import { connect } from 'react-redux'
import { getMember, getMembers, getOrgOverview, getPersonalOverview } from '../../../../actions/insightAction'

class CommunityStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communityStats: [],
      personalStats: [],
      noOfAdmins: 0
    }
  }
  onTabClick = (tabName) => {
    console.log(`${tabName} is clicked`);
    this.props.onTabChange(tabName);
  }

  componentWillMount () { 
    setTimeout(() => {
      this.props.getOrgOverview()
    })
    setTimeout(() => {
      this.props.getPersonalOverview()
    })
    setTimeout(() => {
      this.props.getMembers()
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps)
    let communityOverview = nextProps.insight.orgOverview
    let personalOverview = nextProps.insight.personalOverview
    let allMembers = nextProps.insight.allMembers

    let communityObj = []
    let personalObj = []

    // COMMUNITY OVERVIEW
    for (const property in communityOverview) {
      communityObj.push({ name: property.toUpperCase(), item: communityOverview[property] })
    } 
    this.setState({ communityStats: communityObj }, () => {
      console.log('communityStats state ', this.state)
    })

    // PERSONAL OVERVIEW
    for (const property in personalOverview) {
      personalObj.push({ name: property.toUpperCase(), item: personalOverview[property] })
    }
    this.setState({ personalStats: personalObj })

    // NO OF ADMINS 
    let admins = allMembers.filter(member => member.isAdmin === true)
    this.setState({ noOfAdmins: admins.length }, () => {
      console.log('no of admins ', this.state)
    })
  }

  render() {
    const communityStats = [...this.state.communityStats, {name: 'ADMINS', item: this.state.noOfAdmins},{name: 'DONUT', item: '290'}];
    
    const personalStats = [{name: 'DONUT', item: '200'}, ...this.state.personalStats];
    
    let communityInfo = communityStats.map((stat, index) => (
      <div className="stat_box" key={index}>
        <h1 className="stat_header">{stat.item}</h1>
        <p className="stat_para">{stat.name}</p>
      </div>
    ));

    let personalInfo = personalStats.map((stat, index) => (
      <div className="stat_box" key={index}>
        <h1 className="stat_header">{stat.item}</h1>
        <p className="stat_para">{stat.name}</p>
      </div>
    ));
    return (
     <div className="right_main_container">
        <div className="right_view_container">
          <div className="right_view">
            <p className="right_view_header">Insight</p>
            <div className="right_view_content">
              <div className="switch_btn">
                <Button className="org_btn" onClick={() => this.onTabClick('org')}>Organization</Button>
                <Button className="member_btn" onClick={() => this.onTabClick('member')}>Members</Button>
              </div>
              <div className="community_overview">
                <p className="community_overview_header">Community Overview</p>
                <div className="overview_stats">
                  {communityInfo}
                </div>
                <p className="community_overview_header">Personal Overview</p>
                <div className="overview_stats">
                  {personalInfo}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  insight: state.insight
})

export default connect(mapStateToProps, { getMember, getOrgOverview, getPersonalOverview, getMembers })(CommunityStats);