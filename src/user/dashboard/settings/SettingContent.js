import React, { Component } from 'react';
import SettingSidebar from './layouts/SettingSidebar';
import './styles/settings.scss';
import Popups from '../../../common/Popups';
import { connect } from 'react-redux';
import { getProfile } from '../../../actions/usersAction'
import { getOrgProfile } from '../../../actions/orgAction'
import './styles/SettingSidebar.scss';

class SettingContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {
          name: {
            firstName: "firstName",
            lastName: "lastName",
          },
          email: "test@test.com",
          identity: true,
          account: "",
          isActivated: true,
      },
      modalShow: false,
      option: "",
      optionValue: "",
      canChangeName: false,
      canChangeEmail: false
    }
  }

  componentDidMount(){
    // here get the data from api and update the state 
    const userId = localStorage.getItem('userId')
    this.props.getProfile(userId);
    this.props.getOrgProfile();
  }

  componentWillReceiveProps(nextProps) {
    console.log('settings nextProps ', nextProps);
    const { userProfile } = nextProps?.user;
    const permission = nextProps?.org?.org?.options?.permissions
    this.setState({  
      data: {
          ...this.state.data,
          name: {
            ...this.state.name,
            firstName: `${userProfile?.name?.firstName}`,
            lastName: `${userProfile?.name?.lastName}`,
          },
          email: `${userProfile?.email}`,
          isActivated: userProfile?.isActivated
      },
      canChangeEmail: permission?.canChangeEmail,
      canChangeName: permission?.canChangeName
    }, () => {
      console.log('setting state ', this.state)
    })
  }

  render() {
    const { name, email, identity, isActivated } = this.state.data;
    const { modalShow, option, optionValue, canChangeEmail, canChangeName } = this.state
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
    const handleToggle = (target) => {
      const targetName = target;
      this.setState({
        modalShow: true,
        option: targetName
      });
      setOptionValue(targetName);
    }
    
    // toggle Popups
    const toggle = (toggler) => {
      this.setState({
        modalShow: !this.state.modalShow
      }, () => {
        console.log('toggler ', this.state);
      })
    }
    return (
      <div className="settings__right__container">
        <div className="settings__left__nav">
          <SettingSidebar />
        </div>
        <div className="settings__right__content">
          <div className="settings__header">
            <p className="settings__header__text">General account settings</p>
          </div>
          <div className="right__setting__option__content">
            <hr />
            <div className="row">
              <div className="col-md-3">
                <p className="options">Name</p>
              </div>
              <div className="col-md-9">
                <p className="options-value">
                  {name?.firstName} {name?.lastName}
                  <span 
                    className={
                        isActivated === false || canChangeName === false 
                        ? "disable__link": ""
                      }
                    >
                    <a
                      href="javascript:void(0)"
                      onClick={handleToggle.bind(this, "name")}
                      style={{ float: "right" }}
                    >
                      Edit
                    </a>
                  </span>
                </p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <p className="options">Email</p>
              </div>
              <div className="col-md-9">
                <p className="options-value">
                  {email}
                  <span 
                    className={
                        isActivated === false || canChangeEmail === false 
                        ? "disable__link" : ""
                      }
                     >
                    <a
                      href="javascript:void(0)"
                      onClick={handleToggle.bind(this, "email")}
                      style={{ float: "right" }}
                    >
                      Edit
                    </a>
                  </span>
                </p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <p className="options">Identity verified</p>
              </div>
              <div className="col-md-9">
                <p className="options-value">
                  {identity ? "Yes" : "No"}
                  <span>
                    <a
                      href="javascript:void(0)"
                      onClick={handleToggle.bind(this, "identity")}
                      style={{ float: "right" }}
                    >
                      View
                    </a>
                  </span>
                </p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-3">
                <p className="options">Deactivate account ?</p>
              </div>
              <div className="col-md-9">
                <button
                  className="btn button-outline btn-outline-danger deactivate___settings__btn"
                  style={{ float: "right" }}
                  onClick={handleToggle.bind(this, "account")}
                >
                  <span 
                    className="deactivate__text"
                     > { isActivated === true ? "Deactivate" : "Activate" }
                  </span>
                </button>
              </div>
            </div>
            <hr />
            <Popups
              option={option}
              optionValue={optionValue}
              modalShow={modalShow}
              toggler={toggle}
            />
          </div>
        </div>
      </div>
    );
  }
}
// map state to props 
const mapStateToProps = (state) => ({
  user: state.user,
  org: state.org
})
export default connect(mapStateToProps, { getProfile, getOrgProfile })(SettingContent);
