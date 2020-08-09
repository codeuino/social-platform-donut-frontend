import React, { Component } from "react";
import "./IntegrationsPage.scss";
import { connect } from "react-redux";
import Navigation from "../../dashboard/navigation/navigation";
import {
  Button,
  Form,
  Image,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import GoogleCalendar from "../../../assets/integrations/Calendar.png";
import GoogleDrive from '../../../assets/integrations/Drive.png'
import Github from '../../../assets/integrations/Github.png'
import Jitsi from '../../../assets/integrations/Jitsi.png'
import Trello from '../../../assets/integrations/Trello.png'
import SimplePoll from '../../../assets/integrations/SimplePoll.png'

class IntegrationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      integrations: true,
    };
  }
  render() {
    return (
      <div className="integrations">
        <div className="navigation">
          <Navigation org={this.state.org}></Navigation>
        </div>
        <div className="integrations-content">
          <div className="title-content">
            <div className="integrations-title">Integrations</div>
            <div className="integrations-subtitle">
              These are the present integrations for the donut application. More
              cool integrations are on their way
            </div>
            <Form>
              <Form.Control
                as="input"
                placeholder="Search"
                className="searchbar"
                onChange={this.handleSearchBarChange}
              />
            </Form>
          </div>
          <div className="integration-content">

                <Card className="integration-card">
                  <Card.Img
                    variant="top"
                    src={GoogleCalendar}
                    className="integration-card-image"
                  />
                  <Card.Body>
                    <div className="integration-card-body">
                      <Card.Title className="integration-card-title">
                        Google Calendar
                      </Card.Title>
                      <Card.Text className="integration-card-tag">
                        Communication
                      </Card.Text>
                      <Button
                        className="integration-card-button-remove"
                      >
                        Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
  
                <Card className="integration-card">
                  <Card.Img
                    variant="top"
                    src={GoogleDrive}
                    className="integration-card-image"
                  />
                  <Card.Body>
                    <div className="integration-card-body">
                      <Card.Title className="integration-card-title">
                        Google Drive
                      </Card.Title>
                      <Card.Text className="integration-card-tag">
                        File Management
                      </Card.Text>
                      <Button
                        variant="primary"
                        className="integration-card-button"
                      >
                        Add to Donut
                      </Button>
                    </div>
                  </Card.Body>
                </Card>

                <Card className="integration-card">
                  <Card.Img
                    variant="top"
                    src={Github}
                    className="integration-card-image"
                  />
                  <Card.Body>
                    <div className="integration-card-body">
                      <Card.Title className="integration-card-title">
                        Github
                      </Card.Title>
                      <Card.Text className="integration-card-tag">
                        Source Control
                      </Card.Text>
                      <Button
                        variant="primary"
                        className="integration-card-button"
                      >
                        Add to Donut
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
                <Card className="integration-card">
                  <Card.Img
                    variant="top"
                    src={Jitsi}
                    className="integration-card-image"
                  />
                  <Card.Body>
                    <div className="integration-card-body">
                      <Card.Title className="integration-card-title">
                        Jitsi Meet
                      </Card.Title>
                      <Card.Text className="integration-card-tag">
                        Communication
                      </Card.Text>
                      <Button
                        variant="primary"
                        className="integration-card-button"
                      >
                        Add to Donut
                      </Button>
                    </div>
                  </Card.Body>
                </Card>

                <Card className="integration-card">
                  <Card.Img
                    variant="top"
                    src={SimplePoll}
                    className="integration-card-image"
                  />
                  <Card.Body>
                    <div className="integration-card-body">
                      <Card.Title className="integration-card-title">
                        Simple Poll
                      </Card.Title>
                      <Card.Text className="integration-card-tag">
                        Productivity
                      </Card.Text>
                      <Button
                        className="integration-card-button-remove"
                      >
                        Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
                <Card className="integration-card">
                  <Card.Img
                    variant="top"
                    src={Trello}
                    className="integration-card-image"
                  />
                  <Card.Body>
                    <div className="integration-card-body">
                      <Card.Title className="integration-card-title">
                        Trello
                      </Card.Title>
                      <Card.Text className="integration-card-tag">
                        Communication
                      </Card.Text>
                      <Button
                        variant="primary"
                        className="integration-card-button"
                      >
                        Add to Donut
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default IntegrationsPage;
