import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './register.scss'
import SmallDonut from '../../assets/images/small_donut.png'
import ExtraDonuts from '../../assets/images/extra-donuts.png'
import DonutShadow from '../../assets/images/shadow.png'
import Register from './components/Register'
import Login from './components/Login'
import { connect } from 'react-redux'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      cnfPass: '',
      activate: false,
      setup: false,
      view: 'register'
    }
  }

  toggleView = (name) => {
    this.setState({ view: name })
  }

  render() {
    const {  view } = this.state;
    
    let adminEmailVerification = (
      <div className="email__verification__box">
        <div className="inside__email__verification__box">
          <p className="email__header">Admin Account Signup</p>
          <p className="email__subtitle">A verification mail has been sent to your mail. Activate the admin account by clicking on the link. </p>
          <div className="verify__button__container">
            <Button className="btn-danger verify__button">
              Email Not Verified
            </Button>
          </div>
        </div>
      </div>
    );

    let setupContent = (
      <div className="setup__box">
        <div className="inside__setup__box">
          <p className="setup__header">Admin Account Signup</p>
          <p className="setup__subtitle">A verification mail has been sent to your mail. Activate the admin account by clicking on the link. </p>
          <div className="setup__button__container">
            <Button className="setup__button">
              <a href="/setup">Set up you Community</a>
            </Button>
          </div>
        </div>
      </div>
    )

    return (
      <div className="main__container">
        <img
          src={DonutShadow}
          alt="donut__shadow"
          className="donut__shadow img-fluid"
        />
        <div className="main__content">
          <div className="donut__text__container">
            <img
              src={SmallDonut}
              alt="donut_logo"
              className="donut__logo img-fluid"
            />
            <p className="tagline__title">One place for meeting everyone</p>
            <p className="tagline__subtitle">
              An Open Source Social networking bridge between Developers,
              Organisations and Open Source aspirants.
            </p>
          </div>
          <div className="admin__register">
            {view === "register" ? (
              <Register toggle={this.toggleView.bind(this)} />
            ) : null}
            {view === "login" ? (
              <Login toggle={this.toggleView.bind(this)} />
            ) : null}
            {view === "activate" ? adminEmailVerification : null}
            {view === "setup" ? setupContent : null}
          </div>
        </div>
        <div className="main__footer">
          <div className = {
            (view === "login" || view === "setup" || view === "activate" ) ? "stick__to__bottom" : null
          } >
            <img
            src={ExtraDonuts}
            alt="extra__donuts"
            className="extra__donuts img-fluid"
          />
          </div>
        </div>
      </div>
    );
  }
}
// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  admin: state.admin
})

export default connect(mapStateToProps)(Admin);