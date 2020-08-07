import React, { Component } from 'react'
import './insight.scss'
import Navigation from '../navigation/navigation';
import CommunityStats from './components/CommunityStats';
import MemberInfo from './components/MemberInfo';
import { connect } from 'react-redux' 
import { getProfile } from '../../../actions/usersAction'

class Insight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insight: true,
      view: 'org',
      userId: ''
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem('userId');
    this.props.getProfile(userId)
  }

  onTabChange = (name) => {
    this.setState({ view: name }, () => {
      console.log('State is ', this.state);
    })
  }

  render() {
    const { view, userId } = this.state;
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

// map state to props 
const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, { getProfile })(Insight);
