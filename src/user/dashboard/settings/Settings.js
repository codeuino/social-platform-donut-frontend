import React, { Component } from 'react'
import Navigation from '../navigation/navigation';
import SettingContent from './SettingContent';
import './styles/settings.scss';

class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div className="settings">
        <div className="navigation">
            <Navigation></Navigation>
          </div>
          <div className="settings-content">
            <SettingContent />
          </div>
      </div>
    )
  }
}
export default Settings;

