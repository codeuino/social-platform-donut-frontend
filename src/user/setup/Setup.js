import React, { Component } from 'react'
import DonutLogoWithText from '../../assets/images/donut-logo-with-text.png'
import ExtraDonuts from '../../assets/images/extra-donuts.png'
import './setup.scss'
import AboutDonut from './components/AboutDonut'
import SetupForm from './components/SetupForm'
import ShadowDonut from '../../assets/images/shadowDonut.png'
import SetupPreview from './components/SetupPreview'
import { connect } from 'react-redux'
import { registerCommunity } from '../../actions/orgAction'

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step : 0,
      communityName: '',
      shortDesc: '',
      longDesc : '',
      website: '',
      email: '',
      github: '',
      color: '',
      chatPlatform: '',
      error: null
    }
  }
  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  // Handle theme change
  handleThemeChange = input => e => {
    this.setState({ [input]: e.target.value }, () => {
      console.log('this.state ', this.state)
    })
  }

  onNext = () => {
    const { step } = this.state;
    this.setState({ 
      step: step + 1
    },() => {
      console.log('state is : ',this.state)
    })
  }

  onPrev = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    }, () => {
      console.log('state is : ', this.state)
    })
  }

  onFinish = () => {
    console.log('Finish message from setup page!', this.state);
    const { communityName, shortDesc, longDesc, email, website, chatPlatform } = this.state
    const orgObj = {
      name: communityName,
      description: {
        shortDescription: shortDesc,
        longDescription: longDesc
      },
      contactInfo: {
        email: email,
        website: website,
        chattingPlatform: [{
          link: chatPlatform
        }]
      }
    }
    this.props.registerCommunity(orgObj)
  }

  componentWillReceiveProps(nextProps) {
    const { msg } = nextProps.error;
    if (msg == null || msg === undefined) {
      window.location.href = "/dashboard";
    } else {
      this.setState({ error: msg });
    }
  }

  render() {
    const { step } = this.state;
    const { communityName, website, email, github, shortDesc, longDesc, color, chatPlatform, error } = this.state;
    const values = { communityName, website, email, github, shortDesc, longDesc, color, chatPlatform, error };
    const returnStep = (step) => {
      switch (step) {
        case 0: {
          return (
            <AboutDonut
              nextStep={this.onNext}
              handleChange={this.handleChange}
              values={values}
            />
          );
        }
        case 1: {
          return (
            <SetupForm
              nextStep={this.onNext}
              handleChange={this.handleChange}
              prevStep={this.onPrev}
              values={values}
            />
          );
        }
        case 2: {
          return (
            <SetupPreview
              nextStep={this.onNext}
              onFinish={this.onFinish}
              prevStep={this.onPrev}
              values={values}
            />
          );
        }
        default: {
          return null;
        }
      }
    }
    return (
      <div className="main_setup_section">
        <div className="donut_header_logo">
          <center><img src={DonutLogoWithText} alt="text" className="donut_logo_text" /></center>
          <img src={ShadowDonut} alt="donut_shadow" className="donut_shadow" />
        </div>
        <div className="setup_steps">
          {returnStep(step)}
        </div>
        <div className="donut_footer">
          <img src={ExtraDonuts} alt="extra_donuts" className="extra_donuts img-fluid"/>
        </div>
      </div>
    )
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  status: state.status
})

export default connect(mapStateToProps, { registerCommunity })(Setup);