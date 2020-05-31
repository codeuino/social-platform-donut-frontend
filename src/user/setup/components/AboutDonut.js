import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import './about.scss'

class AboutDonut extends Component {
  onNext = (e) => {
    e.preventDefault();
    console.log('Going from step 0 to step 1');
    this.props.nextStep();
  }

  render() {
    return (
      <div className="about_main_content">
        <div className="about_header">
          <h3 className="donut_text">DONUT</h3>
          <p>0 / 2</p>
        </div>
        <div className="about_content">
          <p className="about_title">ABOUT</p>
          <p className="about_content_text">
            Being inspired by the Cornucopia of various social hub this project
            has been developed taking into consideration about open source.
            Well, this is an Open Source Social networking hub which acts as a
            bridge between various Developers, Organisations and Open Source
            aspirants to elaborate on various things like #Projects, #Events,
            #Discussion on various researches, #Scholarships, #Coding release
            and various other things updates. The major priority of this project
            has been that this platform allows users to make their project "Open
            Sourced" and released them under various open source Organisations,
            experts which hold up a ring plate on this portal. This platform
            also makes users introduce and develops various solutions in the
            form of FOSS software to publish them for public use by integrating
            them with their social cause. Moreover, this project can be
            downloaded by any user, organization and can be used by them in
            their own custom way, making it run on their servers. It is built on
            Node.js and utilizing mongoose as a database.
          </p>
        </div>
        <div className="feature_content">
          <p className="feature_title">FEATURES</p>
          <p className="feature_content_text">
            Sign Up / Login Authentication. Node.js basic Password
            Authentication ( Uses Unique email and Password ). Third party
            access login and signup. Sign Up as a User and Organisation Write
            any Post that acts as a Feed ( with various formatting tools, tags
            effect, etc ). Propose any project that a person wants to raise as
            researched under various organizations and experts. Write Events and
            get updates of various Events happening around. Provides various
            opportunities to integrate many other Open Source projects
            recognized by organisations.
          </p>
        </div>
        <div className="switch_step">
          <Button className="next_btn" onClick={this.onNext}>Next</Button>
        </div>
      </div>
    );
  }
}
export default AboutDonut;