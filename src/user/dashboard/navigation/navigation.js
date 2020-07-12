import React, { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./navigation.scss";
import Logout from "../../profile/popups/Logout";
import logo from "../../../svgs/logout.svg";
import {Info} from "../../integrations/NameForm";
import JitsiMeets from '../../../images/jitsi.png'
import {
  DonutTitleSmall,
  DonutIconSmall,
} from "../../../donutTitle/donutTitle";
// import ComminytPng from "../../../images/community.png";
// import CommunitySetting from "../Community/CommunitySetting";
import { Desktop, Mobile } from "../../../utils/breakpoints";
import SVGIcon from "../../../utils/SVGIcon";

class Navigation extends Component {
  state = { 
    logout: false,
    org: false
 };
  render() {
    const ListItem = (props) => {
      const item = props.isMobile ? (
        <ListGroup.Item className={props.className}>
          <NavLink to={props.link} className="link">
            <SVGIcon name={props.name} isMobile={true} />
          </NavLink>
        </ListGroup.Item>
      ) : (
        <ListGroup.Item className={props.className}>
          <SVGIcon name={props.name} />
          <NavLink to={props.link} className="link">
            <b>{props.name}</b>
          </NavLink>
        </ListGroup.Item>
      );

      return item;
    };
    const cancel = () =>
      this.setState({
        logout: false,
      });
    const close = () =>
      this.setState({
        open: false,
      });
    // const divStyle = {
    //   position: "fixed",
    //   bottom: '5em'
    // };
    const divStyle2 = {
      position: "fixed",
      bottom: "2em"
    };
    const { logout } = this.props;
    return (
      <div className="main-navigation">
        <Desktop>
          <ListGroup className="list-group">
            <ListGroup.Item>
              <NavLink to="/dashboard">
                <div className="donut-title">
                  <DonutTitleSmall />
                </div>
              </NavLink>
            </ListGroup.Item>
            <hr />

            <ListItem
              name="Dashboard"
              className={this.props.dashboard ? "active" : "inactive"}
              link="/dashboard"
            />
            <ListItem
              name="Pinned Posts"
              className={this.props.posts ? "active" : "inactive"}
              link="/pinned-posts"
            />
            <ListItem
              name="Organization"
              className={this.props.org ? "active" : "inactive"}
              link="/organization"
            />

            <ListItem
              name="Events"
              className={this.props.event ? "active" : "inactive"}
              link="/events"
            />

            <ListItem
              name="Projects"
              className={this.props.proj ? "active" : "inactive"}
              link="/projects"
            />

            <ListItem
              name="Account"
              className={this.props.profile ? "active" : "inactive"}
              link="/profile"
            />
            <ListItem
              name="Settings"
              className={this.props.settings ? "active" : "inactive"}
              link="/settings"
            />
            <ListGroup.Item
              style={divStyle2}
              className={logout ? "active" : "inactive"}
            >
              <Button
                variant="link"
                size="sm"
                className="log-button link"
                onClick={() => this.setState({ logout: true })}
              >
                <img className="logout" src={logo} alt="L"></img>
                <b>Logout</b>
              </Button>
              <Logout show={this.state.logout} handleClose={cancel} />
            </ListGroup.Item>

            <ListGroup.Item>
              <div
                className="jitsi"
                onClick={() => this.setState({ open: true })}
              >
                <img src={JitsiMeets} alt="jitsi" className="jitsi-meet link" />
                <b>Jitsi Meet</b>
              </div>
              {this.state.open ? (
                <Info show={this.state.open} onHide={close} />
              ) : null}
            </ListGroup.Item>
            <ListItem
              className={this.props.orgSettings ? "active" : "inactive"}
              link="/org-settings"
              name="Org settings"
            />
          </ListGroup>
        </Desktop>

        <Mobile>
          <ListGroup className="list-group">
            <ListGroup.Item>
              <Link to="/dashboard">
                <div className="donut-title">
                  <DonutIconSmall />
                </div>
              </Link>
            </ListGroup.Item>
            <ListItem
              name="Dashboard"
              className={this.props.dashboard ? "active" : "inactive"}
              link="/dashboard"
              isMobile="true"
            />
            <ListItem
              name="Pinned Posts"
              className={this.props.posts ? "active" : "inactive"}
              link="/pinned-posts"
              isMobile="true"
            />
            <ListItem
              name="Organization"
              className={this.props.org ? "active" : "inactive"}
              link="/organization"
              isMobile="true"
            />

            <ListItem
              name="Events"
              className={this.props.event ? "active" : "inactive"}
              link="/events"
              isMobile="true"
            />

            <ListItem
              name="Projects"
              className={this.props.proj ? "active" : "inactive"}
              link="/projects"
              isMobile="true"
            />

            <ListItem
              name="Account"
              className={this.props.profile ? "active" : "inactive"}
              link="/profile"
              isMobile="true"
            />
            <ListItem
              name="Settings"
              className={this.props.settings ? "active" : "inactive"}
              link="/settings"
              isMobile="true"
            />

            <ListGroup.Item
              style={divStyle2}
              className={logout ? "active" : "inactive"}
            >
              <Button
                variant="link"
                size="sm"
                className="log-button link"
                onClick={() => this.setState({ logout: true })}
              >
                <img className="logout" src={logo} alt="L"></img>
              </Button>
              <Logout show={this.state.logout} handleClose={cancel} />
            </ListGroup.Item>

            <ListGroup.Item>
              <div
                className="jitsi"
                onClick={() => this.setState({ open: true })}
              >
                <img src={JitsiMeets} alt="jitsi" className="jitsi-meet link" />
              </div>
              {this.state.open ? (
                <Info show={this.state.open} onHide={close} />
              ) : null}
            </ListGroup.Item>
            <ListItem
              className={this.props.orgSettings ? "active" : "inactive"}
              link="/org-settings"
              name="Org settings"
              isMobile={true}
            />
          </ListGroup>
        </Mobile>
      </div>
    );
  }
}

Navigation.propTypes = {
  dashboard: PropTypes.bool,
  post: PropTypes.bool,
  org: PropTypes.bool,
  orgSettings: PropTypes.bool,
  profile: PropTypes.bool,
  settings: PropTypes.bool,
  logout: PropTypes.bool,
};

export default Navigation;
