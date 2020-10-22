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
import { Mobile, Desktop } from '../../../utils/breakpoints';
import { Accordion, Button } from 'react-bootstrap'; 

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
        maintenance: false,
        sidebarOpen: false
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
    
    const toggleSidebar = () => {
      this.setState((prevState) => {
        return {
          sidebarOpen: !prevState.sidebarOpen
        }
      })
    }
    return (
      <>
        <Navigation orgSettings={this.state.org} user={this.props.user} />
        <div className="main_section">
          <div className="left_nav">
            <p className="header_text">Community Settings</p>
            <Desktop>
              <LeftNav
                data={{
                  option: this.state.option,
                  changeOption: this.changeOption.bind(this),
                }}
              />
            </Desktop>
            <Mobile>
              <Accordion>
                  <Accordion.Toggle onClick={() => toggleSidebar()} variant="outline-secondary" size="sm" as={Button} eventKey="0">
                    {this.state.sidebarOpen?"Close Menu":"Setting Menu"}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <LeftNav
                      data={{
                        option: this.state.option,
                        changeOption: this.changeOption.bind(this),
                      }}
                    />
                  </Accordion.Collapse>
              </Accordion>
            </Mobile>
          </div>
          <div className="right_section_content">
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
      </>
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
