import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import NavBar from "../navigation/navbar";
import SettingContent from './SettingContent';
import './styles/settings.scss';
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
  const [set, setting] = React.useState(true);
  return (
    <div className={classes.root}>
      <ScopedCssBaseline />
      <NavBar settings={set}/>
        <div className={classes.content}>
          <div className={classes.dv}>
            <div className="settings-content">
              <SettingContent />
            </div>
          </div>
        </div>
    </div>
  );
}


