import React, { Component } from "react";
import "./profile-card.scss";
import { Card, CardContent } from "@material-ui/core";
import profile from "../../../jsonData/profile";

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Card className="profilecard">
        <CardContent className="cardcontent">
          <div className="title">{profile.name}</div>
          <div className="designation">{profile.designation}</div>
          <p>{profile.description}</p>
          <div className="email-content">
            <p className="initial">Email</p>
            <div className="info-email info">{profile.email}</div>
          </div>
          <div className="email-content">
            <p className="initial">Website</p>
            <div className="info-website info">{profile.website}</div>
          </div>
          <div className="email-content">
            <p className="initial">Education</p>
            <div className="info-education info">
              <div className="education-info">
                {profile.education.map((i) => {
                  return (
                    <div>
                      {" "}
                      <div>{i.info}</div> <p>{i.year}</p>{" "}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="email-content">
            <p className="initial">Skills</p>
            <div className="info-skills info">{profile.skills}</div>
          </div>
          <div className="email-content">
            <p className="initial">Contact</p>
            <div className="info-contact info">{profile.phone}</div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default ProfileCard;
