import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import "./dashboard.scss";
import NavBar from "./navigation/navbar";
import UpcomingEvents from "./upcoming-events/upcoming-events";
import Notifications from "./notifications/notifications";
import Portfolio from "./portfolio/portfolio";
import NewsFeed from "./news-feed/news-feed";
import Updates from "./updates/updates";
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

export default function Dashboard(props){
  const classes = styles();
  const [dashboard, setDashboard] = React.useState(true);
  return (
    <div className={classes.root}>
            <ScopedCssBaseline />

          <NavBar dashboard={dashboard}/>
        <div className={classes.content}>
          <div className={classes.dv}>
          <div className={classes.news}>
          <div className={classes.notifyuser}>
            <UpcomingEvents></UpcomingEvents>
            <Notifications></Notifications>
          </div>
          <NewsFeed></NewsFeed>
          </div>

          <div className={classes.promotions}>
            <Portfolio></Portfolio>
            <Updates></Updates>
          </div>
          </div>
        </div>
    </div>
  );
}
