import React, { Component } from 'react';
import SettingSidebar from './layouts/SettingSidebar';
import './styles/settings.scss';
import Popups from '../../../common/Popups';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

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
          <div className="col-md-9 mt-5">
            <h4><b>General account settings</b></h4><hr/>
            <div className="row">
              <div className="col-md-3">
                <p className="options">Name</p>
              </div>
              <div className="col-md-9">
               <p className="options-value">{name}
               <span>
                 <a 
                  href="javascript:void(0)" 
                  onClick={handleToggle} 
                  style={{float: "right"}} 
                  name="name"
                  >Edit
                  </a>
                </span>
               </p>
              </div>
            </div><hr/>
            <div className="row">
              <div className="col-md-3">
                <p className="options">Username</p>
              </div>
              <div className="col-md-9">
                <p className="options-value">{username}
                  <span>
                    <a 
                     href="javascript:void(0)" 
                     onClick={handleToggle} 
                     style={{float: "right"}} 
                     name="username"
                     >Edit
                     </a>
                  </span>
                </p>
              </div>
            </div><hr/>
            <div className="row">
              <div className="col-md-3">
                <p className="options">Email</p>
              </div>
              <div className="col-md-9">
                <p className="options-value">{email}
                <span>
                  <a 
                   href="javascript:void(0)" 
                   onClick={handleToggle} 
                   style={{float: "right"}} 
                   name="email"
                   >Edit
                  </a>
                </span>
                </p>
              </div>
            </div><hr/>
            <div className="row">
              <div className="col-md-3">
                <p className="options">Identity verified</p>
              </div>
              <div className="col-md-9">
                <p className="options-value">{identity ? "Yes" : "No"}
                <span>
                  <a 
                   href="javascript:void(0)" 
                   onClick={handleToggle} 
                   style={{float: "right"}} 
                   name="identity"
                   >View
                   </a>
                </span>
                </p>
              </div>
            </div><hr/>
            <div className="row">
              <div className="col-md-3">
                <p className="options">Deactivate account ?</p>
              </div>
              <div className="col-md-9">
                <button 
                  className="btn btn-light" 
                  style={{float: "right"}} 
                  name="account" 
                  onClick={handleToggle}
                  >Deactivate
                </button>
              </div>
            </div>
          </div>
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

