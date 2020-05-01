import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import "./pinned-posts.scss";
import PinPosts from '../pinned-posts/posts/pinPosts';
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
  const [post, setPost] = React.useState(true);
  return (
    <div className={classes.root}>
      <ScopedCssBaseline />
      <NavBar post={post}/>
        <div className={classes.content}>
          <div className={classes.dv}>
            <div className="news">
              <PinPosts/>
            </div> 
            <div className="promotions">
              <Updates></Updates>
            </div>
          </div>
        </div>
    </div>
  );
}

