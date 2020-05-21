import React, { Component } from 'react'
import DonutLogoWithText from '../../images/donut-logo-with-text.png'
import ExtraDonuts from '../../images/extra-donuts.png'
import './setup.scss'
import AboutDonut from './components/AboutDonut'
import SetupForm from './components/SetupForm'
import ShadowDonut from '../../images/shadowDonut.png'
import SetupPreview from './components/SetupPreview'

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step : 0,
      communityName: '',
      shortDesc: '',
      longDesc : '',
      website: '',
      fb: '',
      github: '',
      theme: ''
    }
  }
  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

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
    console.log('Finish message from setup page!');
  }

  render() {
    const { step } = this.state;
    const { communityName, website, fb, github, shortDesc, longDesc, theme } = this.state;
    const values = { communityName, website, fb, github, shortDesc, longDesc, theme };
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
              handleChange={this.handleChange}
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
export default Setup;