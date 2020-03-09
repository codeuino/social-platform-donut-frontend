import React, { Component } from 'react'
import Navigation from '../navigation/navigation';
import SettingContent from './SettingContent';
import './styles/settings.scss';

class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: true
    };
  }
  render() {
    return (
      <div className="settings">
        <div className="navigation">
            <Navigation settings={this.state.settings}></Navigation>
          </div>
          <div className="settings-content">
            <SettingContent></SettingContent>
          </div>
      </div>
    )
  }
}
export default Settings;

