import React, { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./navigation.scss";
import Logout from "../../profile/popups/Logout";
import logo from "../../../assets/svgs/logout.svg";
import Plus from "../../../assets/svgs/NavigationIcons/Plus.svg";
import JitsiMeet from "../../../assets/svgs/NavigationIcons/JitsiMeet.svg";
import { Info } from "../../integrations/NameForm";

import {
  DonutTitleSmall,
  DonutIconSmall,
} from "../../../donutTitle/donutTitle";
import { Desktop, Mobile } from "../../../utils/breakpoints";
import SVGIcon from "../../../utils/SVGIcon";
import { connect } from "react-redux";

class Navigation extends Component {
  state = {
    logout: false,
    org: false,
    userId: "",
  };

  componentWillReceiveProps(nextProps) {
    console.log("nextProps from navigation", nextProps);
    this.setState({
      userId: nextProps.user.userProfile?._id,
    });
  }

  render() {
    const ListItem = (props) => {
      const item = props.isMobile ? (
        <NavLink to={props.link} className="link">
          <ListGroup.Item className={props.className}>
            <SVGIcon name={props.name} isMobile={true} />
          </ListGroup.Item>
        </NavLink>
      ) : (
        <NavLink to={props.link} className="link">
          <ListGroup.Item className={props.className}>
            <SVGIcon name={props.name} />
            {/* <b>{props.name}</b> */}
            <span>{props.name}</span>
          </ListGroup.Item>
        </NavLink>
      );

      return item;
    };

    const LogoutButton = () => {
      return (
        <ListGroup.Item
          className="inactive"
          onClick={() => this.setState({ logout: true })}
        >
          <SVGIcon name="Logout" />
          <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>Logout</span>
        </ListGroup.Item>
      );
    };

    const cancel = () =>
      this.setState({
        logout: false,
      });
    const close = () =>
      this.setState({
        open: false,
      });
    const divStyle2 = {
      position: "fixed",
      bottom: "2em",
    };
    const { logout } = this.props;
    return (
      <div className="main-navigation">
        <Desktop>
          <ListGroup className="list-group">
            <ListGroup.Item style={{ marginLeft: "15px" }}>
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
            {/* <ListItem
              name="Pinned Posts"
              className={this.props.posts ? "active" : "inactive"}
              link="/pinned-posts"
            /> */}
            <ListItem
              name="Organization"
              className={this.props.org ? "active" : "inactive"}
              link="/organization"
            />
            <ListItem
              name="Wikis"
              className={this.props.wikis ? "active" : "inactive"}
              link="/wikis"
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
              link={`/profile/${
                this.state.userId || this.props.user.userProfile._id
              }`}
            />
            <ListItem
              name="Settings"
              className={this.props.settings ? "active" : "inactive"}
              link="/settings"
            />
            <ListItem
              className={this.props.orgSettings ? "active" : "inactive"}
              link="/org-settings"
              name="Org settings"
            />
          </ListGroup>
          <hr />
          <ListGroup className="list-group-integrations">
            <ListGroup.Item>
              <div className="integration-text">
                Your Integrations
                <img
                  src={Plus}
                  alt="add integration"
                  className="integration-add"
                ></img>
              </div>
            </ListGroup.Item>
            <ListGroup.Item
              className="inactive"
              onClick={() => this.setState({ open: true })}
            >
              <SVGIcon name="JitsiMeet" />
              <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>Jitsi Meet</span>
            </ListGroup.Item>

            {this.state.open ? (
              <Info show={this.state.open} onHide={close} />
            ) : null}
          </ListGroup>
          <hr />
          <ListGroup>
            <LogoutButton />
            <Logout show={this.state.logout} handleClose={cancel} />
          </ListGroup>
          <hr />
          <ListGroup className="codeuino">
            <ListGroup.Item>
              <div className="codeuino-text">CODEUINO</div>
            </ListGroup.Item>
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
            {/* <ListItem
              name="Pinned Posts"
              className={this.props.posts ? "active" : "inactive"}
              link="/pinned-posts"
              isMobile="true"
            /> */}
            <ListItem
              name="Organization"
              className={this.props.org ? "active" : "inactive"}
              link="/organization"
              isMobile="true"
            />
            <ListItem
              name="Wikis"
              className={this.props.wikis ? "active" : "inactive"}
              link="/wikis"
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
                <img src={JitsiMeet} alt="jitsi" className="jitsi-meet link" />
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

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Navigation);
