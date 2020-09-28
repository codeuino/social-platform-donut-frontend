import React, { Component } from 'react'
import LeftNav from './LeftNav'
import './community.scss'
import OrgProfile from './components/OrgProfile';
import OrgPermission from './components/OrgPermission'
import OrgSetting from './components/OrgSettings'
import OrgAuth from './components/OrgAuth'
import Navigation from '../navigation/navigation'
import { connect } from 'react-redux'
import OrgMaintenance from './components/OrgMaintenance';
import Users from '../../Activity/Users'

class CommunitySetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org: true,
      option: {
        profile: true,
        settings: false,
        permission: false,
        authentication: false,
        maintenance: false
      }
    };
  }
  componentDidMount() {
    this.setState({ view: 'profile' })
  }
  changeOption = (name) => {
   const keys = Object.keys(this.state.option)
   let item = keys.filter(k => k === name)
   console.log('item ', item)
   this.setState({ option: { profile: false }})
   this.setState({ option: { [name]: true }})
   this.setState({ view: name })
  }
  render() {
    const { view } = this.state;
    return (
      <div className="overall_container">
        <div className="main_navigation">
          <Navigation orgSettings={this.state.org} user={this.props.user} />
        </div>
        <div className="org_settings_view">
          <div className="main_section">
            <div className="left_nav">
              <p className="header_text">Community Settings</p>
              <LeftNav
                data={{
                  option: this.state.option,
                  changeOption: this.changeOption.bind(this),
                }}
              />
            </div>
            <div className="right_section">
              {view === "profile" ? <OrgProfile /> : null}
              {view === "permission" ? <OrgPermission /> : null}
              {view === "settings" ? <OrgSetting /> : null}
              {view === "authentication" ? <OrgAuth /> : null}
              {view === "maintenance" ? <OrgMaintenance /> : null}
              {view === "activity" ? (
                <Users 
                  handleOption={{ changeOption: this.changeOption.bind(this) }}
                />) : null }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  user: state.user,
  org: state.org
})
export default connect(mapStateToProps)(CommunitySetting);