import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Dialog, DialogContent, DialogTitle, Button, Grid} from '@material-ui/core';
import {TextField, InputLabel} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import "./popups.scss";

export class EditProfile extends Component{
    // eslint-disable-next-line
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
      <div className="container">
        <Dialog
        {...this.props}
        size="md"
        aria-labelledby="customized-dialog-title">
          <DialogTitle> 
            <span className="title">Edit-Profile</span>
            {this.props.onClose ? <IconClose/> : null}
            <div className="about">PERSONAL INFORMATION</div>
          </DialogTitle> 
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField id="outlined-primary" 
                label="First Name"
                variant="outlined"
                fullWidth='true'
                placeholder="Type here.." 
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField id="outlined-primary" 
                label="Last Name"
                variant="outlined"
                fullWidth='true' 
                placeholder="Type here.." 
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField id="outlined-primary" 
                label="Designation"
                variant="outlined"
                fullWidth='true' 
                placeholder="Type here.." 
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField id="outlined-primary" 
                label="Location"
                variant="outlined"
                fullWidth='true'
                placeholder="Type here.." 
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid> 
              <Grid item sm={12} xs={12}>
                <TextField id="outlined-primary" 
                label="About"
                variant="outlined"
                fullWidth='true'
                multiline
                rows="4"
                placeholder="Type here.." 
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid>
            </Grid>
            <div className="about extra">PROFILES</div>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField id="outlined-primary" 
                label="Github URL"
                variant="outlined"
                fullWidth='true'
                placeholder="Github Profile.." 
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField id="outlined-primary" 
                label="LinkedIn URL"
                variant="outlined"
                fullWidth='true'
                placeholder="LinkedIn Profile.." 
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField id="outlined-primary" 
                label="Facebook URL"
                variant="outlined"
                fullWidth='true'
                placeholder="Facebook Profile.." 
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
