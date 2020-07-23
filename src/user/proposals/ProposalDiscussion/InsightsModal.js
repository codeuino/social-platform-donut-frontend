import React, { useState, useEffect } from "react";
import { Modal, Form, Col, Tabs, Tab } from "react-bootstrap";
import { renderButton, checkSignedIn } from "../../../utils/insightUtils";
import Report from "../../../utils/report";
import PageviewsReport from "./InsightsComponents/PageviewsReport";
import ProposalViewsReport from "./InsightsComponents/ProposalViewsReport";
import BrowserReport from "./InsightsComponents/BrowserReport";
import DeviceReport from "./InsightsComponents/DeviceReport";
import CountriesReport from "./InsightsComponents/CountriesReport";

const InsightsModal = (props) => {
  const [content, setContent] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleEditorClose = () => {
    setContent("");
    props.handleClose();
  };

  const updateSignin = (signedIn) => {
    console.log(signedIn);
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };

  const init = () => {
    checkSignedIn()
      .then((signedIn) => {
        updateSignin(signedIn);
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignin);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    window.gapi.load("auth2", init); //(1)
  });

  return (
    <Modal
      show={props.show}
      onHide={handleEditorClose}
      animation={true}
      className="modal"
      centered
      size="lg"
    >
      <Modal.Header closeButton className="modal__header">
        <Modal.Title className="modal__title" style={props.borderStyle}>
          <div className="modal__main-title">Insights</div>
          <div className="modal__mini-title">Proposal Insights</div>
        </Modal.Title>
      </Modal.Header>
      {!isSignedIn ? (
        <div
          id="signin-button"
          style={{ margin: "0 auto", padding: "20px" }}
        ></div>
      ) : (
        <Tabs defaultActiveKey="proposal views" style={{ marginTop: "10px" }}>
          <Tab eventKey="proposal views" title="Proposal Views ">
            <Modal.Body className="modal__body" style={props.borderStyle}>
              <ProposalViewsReport proposalId={props.proposalId} />
            </Modal.Body>
          </Tab>
          <Tab eventKey="browser" title="Browser Used">
            <Modal.Body className="modal__body" style={props.borderStyle}>
              <BrowserReport proposalId={props.proposalId} />
            </Modal.Body>
          </Tab>
          <Tab eventKey="device" title="Device Used">
            <Modal.Body className="modal__body" style={props.borderStyle}>
              <DeviceReport proposalId={props.proposalId} />
            </Modal.Body>
          </Tab>
          <Tab eventKey="Country" title="Countries">
            <Modal.Body className="modal__body" style={props.borderStyle}>
              <CountriesReport proposalId={props.proposalId} />
            </Modal.Body>
          </Tab>
          <Tab eventKey="top" title="Top Proposals ">
            <Modal.Body className="modal__body" style={props.borderStyle}>
              <PageviewsReport />
            </Modal.Body>
          </Tab>
        </Tabs>
      )}

      <div className="modal__buttons"></div>
    </Modal>
  );
};

export default InsightsModal;
