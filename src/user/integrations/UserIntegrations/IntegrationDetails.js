import React from "react";
import { Card, Button } from "react-bootstrap";

const IntegrationDetails = (props) => {
  const { integration } = props;

  return (
    <div className="integrations-content">
      <div className="title-content">
        <div className="integrations-title">Integrations</div>
        <div className="integrations-subtitle"></div>
      </div>
      <div className="integration-content">
        <Card className="details-card">
          <div className="details-top">
            <img src={integration?.image} />
            <div className="details-name">{integration?.integrationName}</div>
            <div className="button-container">
              <Button
                variant="primary"
                onClick={props.back}
                className="details-button-back"
              >
                Back to Integrations
              </Button>
              <Button
                variant="primary"
                onClick={props.back}
                className="details-button"
              >
                Add to Donut
              </Button>
            </div>
          </div>
          <div className="details-bottom">
            <div className="details-usage">Usage Guide</div>
            <div className="details-usagetext">{integration.description}</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IntegrationDetails;
