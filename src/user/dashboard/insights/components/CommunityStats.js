import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import './community.scss'
import Navigation from '../../navigation/navigation';

class CommunityStats extends Component {
  onTabClick = (tabName) => {
    console.log(`${tabName} is clicked`);
    this.props.onTabChange(tabName);
  }

  render() {
    const communityStats = [{name: 'MEMBERS', item: '260'},{name: 'ADMINS', item: '10'},{name: 'PROJECTS', item: '12'},{name: 'EVENTS', item: '15'},{name: 'DONUT', item: '290'}];
    
    const personalStats = [{name: 'DONUT', item: '200'},{name: 'PROJECTS', item: '12'},{name: 'EVENTS', item: '15'}];
    
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
export default CommunityStats;