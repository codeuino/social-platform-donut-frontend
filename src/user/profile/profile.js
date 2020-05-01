import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import "./profile.scss";
import UserInfo from "./user-info/user-info";
import Portfolio from "../dashboard/portfolio/portfolio";
import PinPosts from "../pinned-posts/posts/pinPosts";
import NavBar from "../dashboard/navigation/navbar";
import Updates from "../dashboard/updates/updates";
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

const styles = makeStyles( (theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  dv: {
    display: 'flex',
  },
}));

export default function PinnedPosts(props){
  const classes = styles();
  const [profile, setProfile] = React.useState(true);
  return (
    <div className={classes.root}>
      <ScopedCssBaseline />
      <NavBar profile={profile}/>
        <div className={classes.content}>
          <div className={classes.dv}>
            <div className="news">
              <div className="notify-user">
                <UserInfo></UserInfo>
                <Portfolio></Portfolio>
              </div>
              <div className="two">
                <div className="posts-profile">
                  <PinPosts/>
                </div>
                <div className="updat">
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}


