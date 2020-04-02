import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Dialog, DialogContent, DialogTitle, Button, Grid} from '@material-ui/core';
import {TextField, InputLabel} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import "../../profile/popups/popups.scss";

export class EditOrg extends Component{
    constructor(props){
        super(props);
    }
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
      
    return (
      <div>
        <Dialog
        {...this.props}
        size="sm"
        aria-labelledby="customized-dialog-title">
          <DialogTitle> 
            <span className="title">New Organization</span>
            {this.props.onClose ? <IconClose/> : null}
            <div className="about">ABOUT THE ORGANIZATION</div>
          </DialogTitle> 
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField id="outlined-primary" 
                label="Organization Name"
                variant="outlined"
                fullWidth='true'
                placeholder="Type here.." 
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField id="outlined-primary" 
                label="Logo URL"
                variant="outlined"
                fullWidth='true' 
                placeholder="Logo for your organization.." 
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField id="outlined-primary" 
                label="Short Description"
                variant="outlined"
                fullWidth='true'
                placeholder="Write a Tag line.." 
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid> 
              <Grid item sm={6} xs={12}>
                <TextField id="outlined-primary" 
                label="Website"
                variant="outlined"
                fullWidth='true' 
                placeholder="www.donut.com" 
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField id="outlined-primary" 
                label="Organization Description"
                variant="outlined"
                fullWidth='true'
                multiline
                rows="4"
                placeholder="Tell people about your organization.." 
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField id="outlined-primary" 
                label="Email ID"
                variant="outlined"
                fullWidth='true'
                placeholder="donut@gmail.com" 
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid> 
              <Grid item sm={6} xs={12}>
                <TextField id="outlined-primary" 
                label="Chat Platform"
                variant="outlined"
                fullWidth='true'
                placeholder="IRC, Slack, etc." 
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid> 
            </Grid>
          </DialogContent>
          <div className="form-footer">
            <Button onClick={this.props.onClose} 
            variant="contained" size="sm" 
            className="savebtn">Yes</Button>
            <Button variant="outlined" className="closebtn" 
            onClick={this.props.onClose} size="sm">No</Button>
          </div>
        </Dialog>
      </div>
    );
  }
}
