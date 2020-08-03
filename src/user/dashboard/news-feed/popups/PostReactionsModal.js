import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Col, Row, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import Like from "../../../../images/Like.png";
import Happy from "../../../../images/Happy.png";
import Heart from "../../../../images/Heart.png";
import DonutReaction from "../../../../images/DonutReaction.png";
import userIcon2 from "../../../../images/userIcon2.jpg";

const PostReactionModal = (props) => {
  const [type, changeType] = useState("All");
  const [reactions, setVotes] = useState([]);

  let handleClick = (atrb) => () => {
    console.log("attr ", atrb);
    changeType(atrb);
    console.log(reactions)
  };

  useEffect(() => {
    setVotes(props?.votes?.upvotes?.user);
    console.log('use effect from post-reactions', props)
  }, [props.votes, props]);



  let userInfo = reactions?.map((user, index) => {
    return (
      <Row className="modal__member" id="p1" key={index}>
        <div className="member__image">
          <Image
            className="modal__memberPhoto"
            src={userIcon2}
            alt="I"
            rounded
          />
        </div>
        <div className="member__content">
          <span className="modal__memberName">Majorie Alexander</span>
          {/* <span className="modal__memberDescription">{item.desc}</span> */}
        </div>
      </Row>

    );
  });

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      animation={true}
      className="modal"
      centered
    >
      <Modal.Header
        closeButton
        className="modal__header"
        style={props.borderStyle}
      >
        <Modal.Title className="modal__title" style={props.borderStyle}>
          <div className="modal__main-title">Reactions</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body" style={props.borderStyle}>
        <div className="tabs__container">
          <span className="nav__tab container" style={{ width: "100%" }}>
            <ul className="nav__list__container">
              <li
                className={
                  type === "All"
                    ? "nav__single__tab selected"
                    : "nav__single__tab"
                }
                onClick={handleClick("All")}
              >
                All
              </li>
              <li
                className={
                  type === "Like"
                    ? "nav__single__tab selected"
                    : "nav__single__tab"
                }
                onClick={handleClick("Like")}
              >
                <img
                  src={Like}
                  alt="like-reaction"
                  style={{ padding: "0px 5px 0px 5px" }}
                />
              </li>
              <li
                className={
                  type === "Happy"
                    ? "nav__single__tab selected"
                    : "nav__single__tab"
                }
                onClick={handleClick("Happy")}
              >
                <img
                  src={Happy}
                  alt="happy-reaction"
                  style={{ padding: "0px 5px 0px 5px" }}
                />
              </li>
              <li
                className={
                  type === "Heart"
                    ? "nav__single__tab selected"
                    : "nav__single__tab"
                }
                onClick={handleClick("Heart")}
              >
                <img
                  src={Heart}
                  alt="heart-reaction"
                  style={{ padding: "0px 5px 0px 5px" }}
                />
              </li>
              <li
                className={
                  type === "Donut"
                    ? "nav__single__tab selected"
                    : "nav__single__tab"
                }
                onClick={handleClick("Donut")}
              >
                <img
                  src={DonutReaction}
                  alt="donut-reaction"
                  style={{ padding: "0px 5px 0px 5px" }}
                />
              </li>
            </ul>
          </span>
        </div>
        {type==='All' ? (userInfo): (<div>not all</div>)}
      </Modal.Body>
      <div className="modal__buttons">
        <Button onClick={props.onHide} className="modal__save">
          <span className="modal__buttontext">Exit</span>
        </Button>
      </div>
    </Modal>
  );
};
PostReactionModal.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.bool,
  style: PropTypes.object,
};

// map state to props
export default PostReactionModal;
