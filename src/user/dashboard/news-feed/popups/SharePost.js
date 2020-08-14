import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";

const SharePostModal = (props) => {
  useEffect(() => {
    console.log("useEffect from share-post ", props);
  }, [props]);

  const url = "https://donut.codeuino.org/";

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.handleClose();
      }}
      animation={true}
      className="modal"
      centered
      size="lg"
    >
      <Modal.Header closeButton className="modal__header">
        <Modal.Title className="modal__title">
          <div className="modal__main-title">Share Post</div>
          <div className="modal__mini-title">
            Share the Post on Other Platforms
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal__body" style={{ textAlign: "center" }}>
        <div>
          <FacebookShareButton
            quote={props?.sharableContent}
            url={url}
            className="modal__body-sharebutton"
          >
            <FacebookIcon size={64} borderRadius={5} />
          </FacebookShareButton>
          <LinkedinShareButton
            title={props?.sharableContent}
            url={url}
            className="modal__body-sharebutton"
          >
            <LinkedinIcon size={64} borderRadius={5} />
          </LinkedinShareButton>
          <TwitterShareButton
            title={props?.sharableContent}
            url={url}
            className="modal__body-sharebutton"
          >
            <TwitterIcon size={64} borderRadius={5} />
          </TwitterShareButton>
          <WhatsappShareButton
            title={props?.sharableContent}
            url={url}
            className="modal__body-sharebutton"
          >
            <WhatsappIcon size={64} borderRadius={5} />
          </WhatsappShareButton>
          <TelegramShareButton
            url={url}
            title={props?.sharableContent}
            className="modal__body-sharebutton"
          >
            <TelegramIcon size={64} borderRadius={5} />
          </TelegramShareButton>
          <RedditShareButton
            url={url}
            title={props?.sharableContent}
            className="modal__body-sharebutton"
          >
            <RedditIcon size={64} borderRadius={5} />
          </RedditShareButton>
        </div>
      </Modal.Body>

      <div className="modal__buttons">
        <Button
          onClick={() => {
            props.handleClose();
          }}
          className="modal__save"
        >
          <span className="modal__buttontext">Exit</span>
        </Button>
      </div>
    </Modal>
  );
};

SharePostModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  style: PropTypes.object,
};

export default SharePostModal;
