import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Dialog, DialogContent, DialogTitle, Button, Grid} from '@material-ui/core';
import {TextField, InputLabel} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import "../../profile/popups/popups.scss";

export class CreatePost extends Component{
    
    constructor(props){
        super(props);
        this.state = {
          value : ''
        };
    }
    valChange(event){
      this.setState({value : event.target.value});
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
            <span className="title">New Post</span>
            {this.props.onClose ? <IconClose/> : null}
            <div className="about">ABOUT THE Post</div>
          </DialogTitle> 
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item sm={12} xs={12}>
                <TextField id="outlined-primary" 
                label="Post Title"
                variant="outlined"
                fullWidth='true'
                placeholder="Type here.."
                value={this.state.value} 
                onChange={this.valChange}
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid>
              
             
              <Grid item sm={6} xs={12}>
                <TextField id="outlined-primary" 
                label="Image URL"
                variant="outlined"
                fullWidth='true' 
                placeholder="Type here.." 
                size="small">
                  <InputLabel/>
                </TextField>
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField id="outlined-primary" 
                label="Post Description"
                variant="outlined"
                fullWidth='true' 
                multiline
                rows="5"
                placeholder="Write about your post here" 
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
