/*import React, { Component } from "react";
import "./organization.scss";
import NavBar from "../dashboard/navigation/navbar";
import OrgInfo from "./org-info/org-info";
import Portfolio from "../dashboard/portfolio/portfolio";
import { Card, CardContent } from "@material-ui/core";
import Updates from "../dashboard/updates/updates.js";
import OrgContact from "./org-contact/OrgContact";
import orginfo from "../../jsonData/orginfo";
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
          <NavBar org={this.state.org}/>
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
*/
 
import React, { Component } from "react";
import "./organization.scss";
import { makeStyles } from '@material-ui/core/styles';
import NavBar from "../dashboard/navigation/navbar";
import OrgInfo from "./org-info/org-info";
import Portfolio from "../dashboard/portfolio/portfolio";
import { Card, CardContent } from "@material-ui/core";
import Updates from "../dashboard/updates/updates.js";
import OrgContact from "./org-contact/OrgContact";
import orginfo from "../../jsonData/orginfo";
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

const styles = makeStyles( (theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  promotions: {
    flex: 1,
    paddingTop: 20,
    paddingRight: 12,
    paddingBottom: 20,
    paddingLeft: 0,
  },
  dv: {
    display: 'flex',
  },
  news: {
    flex: 2,
  },
  notifyuser: {
    display: 'flex',
    paddingTop: 20,
    paddingRight: 0,
    paddingBottom: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 3,
    left: 10,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  bar: {
    minWidth: 15,
    paddingRight: 0
  }
}));

export default function Organization(props){
  const classes = styles();

  const [open, setOpen] = React.useState(false);
  const [org, setOrg] = React.useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <ScopedCssBaseline />
      <NavBar org={org}/>
      <div className={classes.content}>
          <div className={classes.dv}>

            <div className="news">
              <div className="notify-user">
                <OrgInfo></OrgInfo>
                <Portfolio></Portfolio>
              </div>
              <div className="org-info">
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
              <div className="sideinfo">
                <div className="org-updates">
                  <Updates></Updates>
                </div>
                <div className="contact">
                  <OrgContact
                  admins={orginfo.admins}
                  website={orginfo.website}
                  contactinfo={orginfo.contactinfo}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
