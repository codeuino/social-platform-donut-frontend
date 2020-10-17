import React, { Component } from "react";
import "./UserIntegrations.scss";
import Navigation from "../../dashboard/navigation/navigation";
import { Button, Form, Card } from "react-bootstrap";
import integrationsList from "../../../assets/jsonData/integrations";
import IntegrationDetails from "./IntegrationDetails";

class UserIntegrations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      integrations: true,
      integrationSelected: false,
      selectedIntegration: {},
    };
  }

  handleSelection = (integration) => {
    this.setState({
      selectedIntegration: integration,
      integrationSelected: true,
    });
  };

  handleBackClick = () => {
    this.setState({
      selectedIntegration: {},
      integrationSelected: false,
    });
  };

  render() {
    const { integrationSelected, selectedIntegration } = this.state;

    return (
      <div className="integrations">
        <div className="navigation">
          <Navigation org={this.state.org}></Navigation>
        </div>
        {integrationSelected ? (
          <IntegrationDetails
            back={this.handleBackClick}
            integration={selectedIntegration}
          />
        ) : (
          <div className="integrations-content">
            <div className="title-content">
              <div className="integrations-title">Integrations</div>
              <div className="integrations-subtitle">
                These are the present integrations for the donut application.
                More cool integrations are on their way
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
              {integrationsList.map((integration, index) => {
                return (
                  <Card className="integration-card">
                    <Card.Img
                      variant="top"
                      src={integration?.image}
                      className="integration-card-image"
                    />
                    <Card.Body>
                      <div className="integration-card-body">
                        <Card.Title className="integration-card-title">
                          {integration?.integrationName}
                        </Card.Title>
                        <Card.Text className="integration-card-tag">
                          {integration?.tag}
                        </Card.Text>
                        <Button
                          variant="primary"
                          className="integration-card-button"
                          onClick={() => this.handleSelection(integration)}
                        >
                          Learn More
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UserIntegrations;
