import React, { Component } from "react";
import "./organization.scss";
import Navigation from "../dashboard/navigation/navigation";
import OrgInfo from "./org-info/org-info";
import Portfolio from "../dashboard/portfolio/portfolio";
// import { Card, CardContent } from "@material-ui/core";
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
import { Button, Card } from "react-bootstrap";
import { Mobile, Desktop } from '../../utils/breakpoints';
import NewTicket from "./popups/NewTicket";

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
    this.setState({ type: type });
  };

  render() {
    const { orgProfile, type } = this.state;
    const {
      // name,
      description,
      // contactInfo
    } = orgProfile;

    const handleClick = (type) => {
      this.setState({ type: type })
    }

    const aboutContent = (
      <Card className="about-us">
        <Card.Body>
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
        </Card.Body>
      </Card>
    )

    const contactContent = (
      <>
        {this.state.isLoading ? (
          contactLoading()
        ) : (
          <OrgContact
            admins={orginfo.admins}
            website={orginfo.website}
            contactinfo={orginfo.contactinfo}
          />
        )}
      </>
    )

    const updatesContent = (
      <>
        {this.state.isLoading ? (
          <div className="orgupdatesloading">{orgUpdatesLoading()}</div>
        ) : (
          <div className="org-updates">
            <Updates></Updates>
          </div>
        )}
      </>
    )

    let content;
    if (type === "About") {
      content = aboutContent;
    }
    if (type === "Updates") {
      content = updatesContent;
    }
    if (type === "Contact") {
      content = contactContent;
    }
  

    return (
      <div>
        <Navigation org={this.state.org}></Navigation>
        <div className="organization__container">
          <div className="news">
            {this.state.isLoading ? (
              topBarLoading()
            ) : (
              <div className="notify-user">
                <OrgInfo></OrgInfo>
                <Desktop>
                  <Portfolio></Portfolio>
                </Desktop>
              </div>
            )}
            <div className="org-info">
              {this.state.isLoading ? (
                cardLoading()
              ) : (
                <>
                       <Mobile>
                  <div className="details">
                    <div className="details__proposal">
                      <Link
                        to={{
                          pathname: "/proposaleditor",
                          state: {
                            proposalId: "new",
                          },
                        }}
                        className="details__proposal_btn"
                      >
                        <Button className="proposal-btn">Propose an Idea</Button>
                      </Link>
                    </div>
                    <div className="tabs__container">
                        <div className="nav__tab">
                          <ul className="nav__list__container">
                            <li
                              className={
                                type === "About"
                                  ? "nav__single__tab selected"
                                  : "nav__single__tab"
                              }
                              onClick={() =>handleClick("About")}
                            >
                              About
                            </li>
                            <li
                              className={
                                type === "Updates"
                                  ? "nav__single__tab selected"
                                  : "nav__single__tab"
                              }
                              onClick={() =>handleClick("Updates")}
                            >
                              Updates
                            </li>
                            <li
                              className={
                                type === "Contact"
                                  ? "nav__single__tab selected"
                                  : "nav__single__tab"
                              }
                              onClick={() =>handleClick("Contact")}
                            >
                              Contact
                            </li>
                          </ul>
                        </div>
                    </div>
                    <div className="details__content">
                      {content}
                    </div>
                  </div>
                  
              </Mobile>
              <Desktop>
                <div className="details">
                <div className="tabs__container">
                        <div className="nav__tab">
                          <ul className="nav__list__container">
                            <li
                              className={
                                type === "Overview"
                                  ? "nav__single__tab selected"
                                  : "nav__single__tab"
                              }
                              onClick={() =>handleClick("Overview")}
                            >
                              Overview
                            </li>
                          </ul>
                        </div>
                    </div>
                  {aboutContent}
                </div>
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
                  {updatesContent}
                  {contactContent}
                </div>
              </Desktop>
                </>
              )}
         
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
