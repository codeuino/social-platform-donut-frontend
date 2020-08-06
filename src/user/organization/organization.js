import React, { Component } from "react";
import "./organization.scss";
import Navigation from "../dashboard/navigation/navigation";
import OrgInfo from "./org-info/org-info";
import Portfolio from "../dashboard/portfolio/portfolio";
import { Card, CardContent } from "@material-ui/core";
import Updates from "./updates/updates";
import OrgContact from "./org-contact/OrgContact";
import orginfo from "../../assets/jsonData/orginfo";
import topBarLoading from "../../placeholderLoading/topBarLoading/topBarLoading";
import orgUpdatesLoading from "../../placeholderLoading/orgUpdatesLoading/orgUpdatesLoading";
import contactLoading from "../../placeholderLoading/contactLoading/contactLoading";
import cardLoading from "../../placeholderLoading/cardLoading/cardLoading";
import { connect } from "react-redux";
import { getOrgProfile } from "../../actions/orgAction";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org: true,
      isLoading: true,
      orgProfile: {},
      type: "About",
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.getOrgProfile();
    });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    console.log("organization ", nextProps);
    this.setState({ orgProfile: nextProps.org?.org });
  }

  handleClick = (type) => {
    this.setState({ type: type })
  }

  render() {
    const { orgProfile, type } = this.state;
    const {
      // name,
      description,
      // contactInfo
    } = orgProfile;
    return (
      <div className="organization">
        <div className="navigation">
          <Navigation org={this.state.org}></Navigation>
        </div>
        <div className="news">
          {this.state.isLoading ? (
            topBarLoading()
          ) : (
            <div className="notify-user">
              <OrgInfo></OrgInfo>
              <Portfolio></Portfolio>
            </div>
          )}
          <div className="org-info">
            {this.state.isLoading ? (
              cardLoading()
            ) : (
              <div className="posts">
                <div className="categories">
                  <div className="ul__container">
                    <span className="nav__tab container">
                      <ul className="nav__list__container">
                        <li
                          className={
                            type === "About"
                              ? "nav__single__tab selected"
                              : "nav__single__tab"
                          }
                          onClick={this.handleClick.bind(this, "About")}
                        >
                          Overview
                        </li>
                        {/* <li
                          className={
                            type === "Post"
                              ? "nav__single__tab selected"
                              : "nav__single__tab"
                          }
                          onClick={this.handleClick.bind(this, "Post")}
                        >
                          Posts
                        </li>
                        <li
                          className={
                            type === "Event"
                              ? "nav__single__tab selected"
                              : "nav__single__tab"
                          }
                          onClick={this.handleClick.bind(this, "Event")}
                        >
                          Events
                        </li>
                        <li
                          className={
                            type === "Project"
                              ? "nav__single__tab selected"
                              : "nav__single__tab"
                          }
                          onClick={this.handleClick.bind(this, "Project")}
                        >
                          Projects
                        </li> */}
                      </ul>
                    </span>
                  </div>
                </div>
                <Card className="about-us">
                  <CardContent>
                    <div className="title">{orgProfile?.name}</div>
                    <div className="subtitle">Short description </div>
                    <p className="short__desc">
                      {description?.shortDescription ||
                        "Short details of organization"}
                    </p>
                    <div className="subtitle">About us in details</div>
                    <p className="long__desc">
                      {description?.longDescription ||
                        "Long description of the organization"}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="sideinfo">
              <Link
                to={{
                  pathname: "/proposaleditor",
                  state: {
                    proposalId: "new",
                  },
                }}
              >
                <Button className="proposal-btn">Propose an Idea</Button>
              </Link>
              {this.state.isLoading ? (
                <div className="orgupdatesloading">{orgUpdatesLoading()}</div>
              ) : (
                <div className="org-updates">
                  <Updates></Updates>
                </div>
              )}

              <div className="contact">
                {this.state.isLoading ? (
                  contactLoading()
                ) : (
                  <OrgContact
                    admins={orginfo.admins}
                    website={orginfo.website}
                    contactinfo={orginfo.contactinfo}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// map state to props
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  org: state.org,
});

export default connect(mapStateToProps, { getOrgProfile })(Organization);
