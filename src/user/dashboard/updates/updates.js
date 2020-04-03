import React, { Component } from "react";
import "./updates.scss";
import customUpdates from '../../../jsonData/organization-updates'

class Updates extends Component {

  render() {

    let organizationUpdates = customUpdates.map((update,i)=>{
      return(
          <div className="notification" key={i}>
            <div className="notification-description-container">
              <div className="image-container">
                <div className="image">
                  <img src={update.imgSrc} alt="icon" />
                </div>
              </div>
              <div className="img-desc-container">
                <div className="img-desc">
                  <h2>{update.title}</h2>
                  <p>{update.description}</p>
                </div>
              </div>
            </div>
          </div>
      )
    })

    return (
      <div className="updates">
        <h2>Organization Updates</h2>
        <div className="update-container">
          <div className="org-updates">
            <div className="notification-container">
              {organizationUpdates}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Updates;
