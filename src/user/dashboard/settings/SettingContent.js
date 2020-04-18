import React, { Component } from 'react';
import SettingSidebar from './layouts/SettingSidebar';
import './styles/settings.scss';
import Popups from '../../../common/Popups';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { Typography, ListItemText, ListItem, List, Link, Button } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
});

class SettingContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
          name: "Default",
          username: "Default",
          email: "test@test.com",
          identity: true,
          account: "",
      },
      modalShow: false,
      option: "",
      optionValue: ""
    }
  }
  componentDidMount(){
    // here get the data from api and update the state 
  }

  render() {
    const { name, email, username, identity } = this.state.data;
    const setOptionValue = (targetName) => {
      let value;
      Object.entries(this.state.data).filter(([key, val])=>{
        if(key === targetName){
          value = val;
          this.setState({optionValue: value});
        }
        return value;
      })
    }
    //toggle modal
    const handleToggle = (e) => {
      const targetName = e.target.name;
      this.setState({
        modalShow: true,
        option: targetName
      });
      setOptionValue(targetName);
    }
    
    return (
      <ThemeProvider theme={theme}>
      <div className="">
        <div className="row ml-3">
          <List className="col-md-9 mt-5">
            <h4><b>General account settings</b></h4><hr/>
            <ListItem className="row">
              <ListItemText className="col-md-3">
                <Typography className="options">Name</Typography>
              </ListItemText>
              <div className="col-md-9">
               <Typography className="options-value">{name}
               <span>
                 <Link 
                  href="javascript:void(0)" 
                  onClick={handleToggle} 
                  style={{float: "right"}} 
                  name="name"
                  >Edit
                  </Link>
                </span>
               </Typography>
              </div>
            </ListItem><hr/>
            <ListItem className="row">
              <ListItemText className="col-md-3">
                <Typography className="options">Username</Typography>
              </ListItemText>
              <div className="col-md-9">
                <Typography className="options-value">{username}
                  <span>
                    <Link 
                     href="javascript:void(0)" 
                     onClick={handleToggle} 
                     style={{float: "right"}} 
                     name="username"
                     >Edit
                     </Link>
                  </span>
                </Typography>
              </div>
            </ListItem><hr/>
            <ListItem className="row">
              <ListItemText className="col-md-3">
                <Typography className="options">Email</Typography>
              </ListItemText>
              <div className="col-md-9">
                <Typography className="options-value">{email}
                <span>
                  <Link 
                   href="javascript:void(0)" 
                   onClick={handleToggle} 
                   style={{float: "right"}} 
                   name="email"
                   >Edit
                  </Link>
                </span>
                </Typography>
              </div>
            </ListItem><hr/>
            <ListItem className="row">
              <ListItemText className="col-md-3">
                <Typography className="options">Identity verified</Typography>
              </ListItemText>
              <div className="col-md-9">
                <Typography className="options-value">{identity ? "Yes" : "No"}
                <span>
                  <Link 
                   href="javascript:void(0)" 
                   onClick={handleToggle} 
                   style={{float: "right"}} 
                   name="identity"
                   >View
                   </Link>
                </span>
                </Typography>
              </div>
            </ListItem><hr/>
            <ListItem className="row">
              <ListItemText className="col-md-3">
                <Typography className="options">Deactivate account ?</Typography>
              </ListItemText>
              <div className="col-md-9">
                <Button 
                  color="secondary"
                  variant="contained"
                  style={{float: "right"}} 
                  name="account" 
                  onClick={handleToggle}
                  >Deactivate
                </Button>
              </div>
            </ListItem>
          </List>
          <div className="col-md-3 setting-sidebar">
            <SettingSidebar/>
          </div>
        </div>
       <Popups 
          option={this.state.option}
          optionValue={this.state.optionValue}
          modalShow={this.state.modalShow}
        />
      </div>
      </ThemeProvider>
    )
  }
}
export default SettingContent;

