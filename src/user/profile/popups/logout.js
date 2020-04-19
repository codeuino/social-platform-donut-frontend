import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Dialog, DialogContent, DialogTitle, Button} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import "./popups.scss";

export class Logout extends Component{
    // eslint-disable-next-line
    constructor(props){
        super(props);
        //state = { open: true};
        //this.state.handleClickOpen = this.state.handleClickOpen.bind(this);
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
      aria-labelledby="customized-dialog-title"
      >
      
        
        <DialogTitle> 
          <span className="title">Logout?</span>
          {this.props.onClose ? <IconClose/> : null}
        </DialogTitle> 
        <DialogContent>
          <div className="message">Are you sure you want to logout of Donut?</div>
        </DialogContent>
        <div className="form-foot">
          <Button onClick={this.props.onClose} variant="contained" 
          className="savebtn" size="sm">Yes</Button>
          <Button variant="outlined" className="closebtn" 
          onClick={this.props.onClose} size="sm">No</Button>
        </div>
      
      </Dialog>
    </div>
    );
  }
}