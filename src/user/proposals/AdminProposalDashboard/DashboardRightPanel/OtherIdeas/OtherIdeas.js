import React, { Component } from "react";
import "./OtherIdeas.scss";
import { ListGroup, Image } from "react-bootstrap";
import userIcon2 from "../../../../../images/userIcon2.jpg";

class OtherIdeas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="ideas">
        <div className="ideas-title">Other Ideas</div>
        <div className="ideas-container">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <div className="idea-item">
                <div className="image-container">
                  <Image
                    src={userIcon2}
                    alt="icon"
                    rounded
                    className="user-image"
                  />
                </div>
                <div className="idea-container">
                  <div className="idea-title">We got into GSoC 2020</div>
                  <div className="idea-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                  </div>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="idea-item">
                <div className="image-container">
                  <Image
                    src={userIcon2}
                    alt="icon"
                    rounded
                    className="user-image"
                  />
                </div>
                <div className="idea-container">
                  <div className="idea-title">We got into GSoC 2020</div>
                  <div className="idea-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                  </div>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="idea-item">
                <div className="image-container">
                  <Image
                    src={userIcon2}
                    alt="icon"
                    rounded
                    className="user-image"
                  />
                </div>
                <div className="idea-container">
                  <div className="idea-title">We got into GSoC 2020</div>
                  <div className="idea-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                  </div>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="idea-item">
                <div className="image-container">
                  <Image
                    src={userIcon2}
                    alt="icon"
                    rounded
                    className="user-image"
                  />
                </div>
                <div className="idea-container">
                  <div className="idea-title">We got into GSoC 2020</div>
                  <div className="idea-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                  </div>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="idea-item">
                <div className="image-container">
                  <Image
                    src={userIcon2}
                    alt="icon"
                    rounded
                    className="user-image"
                  />
                </div>
                <div className="idea-container">
                  <div className="idea-title">We got into GSoC 2020</div>
                  <div className="idea-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default OtherIdeas;
