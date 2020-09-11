import React, { Component } from "react";
import Navigation from "../navigation/navigation";
import SettingContent from "./SettingContent";
import "./styles/settings.scss";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: true,
      sideBarOpen: true,
    };
  }
  handleViewSidebar = () => {
    console.log(this.state.sideBarOpen);
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  };
  render() {
    var sideBarClass = this.state.sideBarOpen ? "sidebar-open" : "sidebar";
    return (
      <div className="settings">
        <div className={sideBarClass}>
          <Navigation settings={this.state.settings}></Navigation>
        </div>
        <button
          onClick={this.handleViewSidebar}
          className="sidebar-toggle"
          style={
            sideBarClass === "sidebar-open"
              ? { marginLeft: "13vw" }
              : { marginLeft: 0 }
          }
        >
          <div />
          <div />
          <div />
        </button>
        <div className="settings-content">
          <SettingContent />
        </div>
      </div>
    );
  }
}
export default Settings;
