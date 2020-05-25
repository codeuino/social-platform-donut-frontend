import React, { Component } from 'react'
import './insight.scss'
import Navigation from '../navigation/navigation';
import CommunityStats from './components/CommunityStats';
import MemberInfo from './components/MemberInfo';

class Insight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insight: true,
      view: 'org'
    };
  }
  onTabChange = (name) => {
    this.setState({ view: name }, () => {
      console.log('State is ', this.state);
    })
  }
  render() {
    const { view } = this.state;
    let communityInfo = (
      <div className="right_view_container">
        <CommunityStats view={view} onTabChange={this.onTabChange.bind(this)} />
      </div>
    );
    let memberInfo = (
      <div className="right_view_container">
        <MemberInfo view={view} onTabChange={this.onTabChange.bind(this)}/>
      </div>
    );
    return (
      <div className="insight_main_container">
        <div className="insight_left_nav">
          <Navigation insight={this.state.insight} />
        </div>
        <div className="insight_content">
          {view === "org" ? communityInfo : memberInfo}
        </div>
      </div>
    );
  }
}
export default Insight;
