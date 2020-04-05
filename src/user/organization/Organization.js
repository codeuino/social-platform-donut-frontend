import React, { Component } from 'react';
import './organization.scss';
import Navigation from '../dashboard/navigation/Navigation';
import OrgInfo from './org-info/OrgInfo';
import Portfolio from '../dashboard/portfolio/Portfolio';
import { Card, CardContent } from '@material-ui/core';
import Updates from "../dashboard/updates/Updates.js";
import OrgContact from "./org-contact/OrgContact"

class Organization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org: true,
      question_1: 'What is Donut?',
      description_1: 'Being inspired by the Cornucopia of various social hub this project has been developed taking into consideration about open source. Well, this is an Open Source Social networking hub which acts as a bridge between various Developers, Organisations and Open Source aspirants to elaborate on various things like #Projects, #Events, #Discussion on various researches, #Scholarships, #Coding release and various other things updates. The major priority of this project has been that this platform allows users to make their project "Open Sourced" and released them under various open source Organisations, experts which hold up a ring plate on this portal. This platform also makes users introduce and develops various solutions in the form of FOSS software to publish them for public use by integrating them with their social cause. Moreover, this project can be downloaded by any user, organization and can be used by them in their own custom way, making it run on their servers. It is built on Node.js and utilizing mongoose as a database.',
      admins: [
        {
          email: 'random@gmail.com',
          designation: 'Community'
        },
        {
          email: 'random2@gmail.com',
          designation: 'Admin'
        },
        {
          email: 'random3@gmail.com',
          designation: 'Moderator'
        },
      ],
      website: 'www.codeuino.org',
      contactinfo: 'Ricardo Murphy : 9892157212',
    };
  }

  render() {
    return (
      <div className='organization'>
        <div className='navigation'>
          <Navigation org={this.state.org}></Navigation>
        </div>
        <div className='news'>
          <div className='notify-user'>
            <OrgInfo></OrgInfo>
            <Portfolio></Portfolio>
          </div>
          <div className='org-info'>
            <div className='posts'>
              <h2>Posts</h2>
              <div className="categories">
                <div className="category-type active">About Us</div>
                <div className="category-type">Donuts</div>
                <div className="category-type">Events</div>
                <div className="category-type">Projects</div>
              </div>
              <Card className="about-us">
                <CardContent>
                  <div className="title">Codeuino</div>
                  <div className="subtitle">{this.state.question_1}</div>
                  <p>{this.state.description_1}</p>
                  <div className="subtitle">{this.state.question_1}</div>
                  <p>{this.state.description_1}</p>
                </CardContent>
              </Card>
            </div>
            <div className="sideinfo">
              <div className="org-updates">
                <h2>Organisation Updates</h2>
                <Updates></Updates>
              </div>
              <OrgContact
                question_1={this.state.question_1}
                description_1={this.state.description_1}
                admins={this.state.admins}
                website={this.state.website}
                contactinfo={this.state.contactinfo}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Organization;
