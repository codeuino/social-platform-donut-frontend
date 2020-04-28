import React, { Component } from "react";
import "./organization.scss";
import Navigation from "../dashboard/navigation/navigation";
import OrgInfo from "./org-info/org-info";
import Portfolio from "../dashboard/portfolio/portfolio";
import { Card, CardContent } from "@material-ui/core";
import Updates from "../dashboard/updates/updates.js";
import OrgContact from "./org-contact/OrgContact";
import orginfo from "../../jsonData/orginfo";
import Posts from "../pinned-posts/posts/posts";
import topBarLoading from "../../placeholderLoading/topBarLoading/topBarLoading";
import orgUpdatesLoading from "../../placeholderLoading/orgUpdatesLoading/orgUpdatesLoading";
import contactLoading from "../../placeholderLoading/contactLoading/contactLoading";
import cardLoading from "../../placeholderLoading/cardLoading/cardLoading";

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org: true,
      isLoading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }

  render() {
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
                <h2>Posts</h2>
                <div className="categories">
                  <div className="category-type active">About Us</div>
                  <div className="category-type">Donuts</div>
                  <div className="category-type">Events</div>
                  <div className="category-type">Projects</div>
                </div>
                <Card className="about-us">
                  <CardContent>
                    <div className="title">Codeuino</div>
                    <div className="subtitle">{orginfo.question_1}</div>
                    <p>{orginfo.description_1}</p>
                    <div className="subtitle">{orginfo.question_1}</div>
                    <p>{orginfo.description_1}</p>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="sideinfo">
              {this.state.isLoading ? (
                <div className="orgupdatesloading">{orgUpdatesLoading()}</div>
              ) : (
                <div className="org-updates">
                  {" "}
                  <Updates></Updates>{" "}
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

export default Organization;
