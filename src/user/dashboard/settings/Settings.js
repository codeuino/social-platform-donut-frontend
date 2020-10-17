import React, { Component } from 'react'
import Navigation from '../navigation/navigation';
import SettingContent from './SettingContent';
import './styles/settings.scss';

class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: true
    }
  }
  render() {
    return (
      <>
          <Navigation settings={this.state.settings}></Navigation>
          <div className="settings">
            <div className="settings__content">
              <SettingContent />
            </div>
          </div>
      </>
    )
  }
}
export default Settings;

