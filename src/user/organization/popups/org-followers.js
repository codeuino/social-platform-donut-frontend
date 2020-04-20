import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogContent, DialogTitle, Button, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import donut from '../../../images/donut.png';
import "../../profile/popups/popups.scss";
import customNotifications from '../../../jsonData/notifications'

export class OrgFollowers extends Component{
    // eslint-disable-next-line
    constructor(props){
        super(props);
    }
    state = {text: "Follow"};
    render(){
      const styles = theme => ({
        root: {
          margin: 0,
          padding: theme.spacing(2),
        },
        closeButton: {
          position: 'absolute',
          right: theme.spacing(1),
          top: theme.spacing(1),
          color: theme.palette.grey[500],
        },
      });
      
     const IconClose = withStyles(styles)(props => {
        const { children, classes, onClose, ...other } = props;
        return (
          <div>
            
              <IconButton aria-label="close" className={classes.closeButton} onClick={this.props.onClose}>
                <CloseIcon />
              </IconButton>
            
          </div>
        );
      });
      
      let followers = customNotifications.map((a) => {
        return(
          <Grid container spacing={4}>        
          <Grid item sm={2} xs={3 | 12}>
            <img class="photo" src={donut} alt="I"></img>
          </Grid>
          <Grid item sm={7} xs={9 | 12}>
            <h5><b>Donut</b></h5>
            <p className="descr">{(a.content).substring(0, 30)}</p>
          </Grid>
          <Grid item sm={3} xs={12}
          className="follow"
          alignItems="center">
            <Button size="small"
            variant="contained">
              Follow
            </Button>
          </Grid>
        </Grid>
        );
        });
      
    return (

      <div className="container">
        <Dialog
          {...this.props}
          aria-labelledby="customized-dialog-title">
          <DialogTitle> 
            <span className="title">Followers</span>
            {this.props.onClose ? <IconClose/> : null}
            <div className="about">ORGANIZATIONS THAT FOLLOW YOU</div>
          </DialogTitle> 
          <DialogContent>
            {followers}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}