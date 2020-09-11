import React, { Component } from "react";
import "./insight.scss";
import Navigation from "../navigation/navigation";
import CommunityStats from "./components/CommunityStats";
import MemberInfo from "./components/MemberInfo";
import { connect } from "react-redux";
import { getProfile } from "../../../actions/usersAction";

class Insight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insight: true,
      view: "org",
      userId: "",
      sideBarOpen: true,
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.getProfile(userId);
  }

  onTabChange = (name) => {
    this.setState({ view: name }, () => {
      console.log("State is ", this.state);
    });
  };
  handleViewSidebar = () => {
    console.log(this.state.sideBarOpen);
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  };
  render() {
    const { view, userId } = this.state;
    var sideBarClass = this.state.sideBarOpen ? "sidebar-open" : "sidebar";
    let communityInfo = (
      <div className="right_view_container">
        <CommunityStats view={view} onTabChange={this.onTabChange.bind(this)} />
      </div>
    );
    let memberInfo = (
      <div className="right_view_container">
        <MemberInfo view={view} onTabChange={this.onTabChange.bind(this)} />
      </div>
    );
    return (
      <div className="insight_main_container">
        <div className={sideBarClass}>
          <Navigation insight={this.state.insight} />
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
        <div className="insight_content">
          {view === "org" ? communityInfo : memberInfo}
        </div>
      </div>
    );
  }
}

// map state to props
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getProfile })(Insight);
