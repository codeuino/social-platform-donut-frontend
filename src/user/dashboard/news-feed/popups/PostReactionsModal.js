import React, { Component } from "react";
import { Button, Modal, Row, Image } from "react-bootstrap";
import Like from "../../../../images/Like.png";
import Happy from "../../../../images/Happy.png";
import Heart from "../../../../images/Heart.png";
import DonutReaction from "../../../../images/DonutReaction.png";
import userIcon2 from "../../../../assets/images/userIcon2.jpg";

class PostReactionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "All",
      reactions: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      reactions: nextProps.votes,
    });
  }

  handleClick = (atrb) => () => {
    console.log(this.props);
    this.setState({
      type: atrb,
    });
  };

  render() {
    const { type } = this.state;

    const upvotes = this.state.reactions?.upVotes?.user.map((user, index) => {
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
            <span className="modal__memberDescription">{user}</span>
          </div>
        </Row>
      );
    });

    const hearts = this.state.reactions?.heart?.user.map((user, index) => {
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
            <span className="modal__memberDescription">{user}</span>
          </div>
        </Row>
      );
    });

    const happy = this.state.reactions?.happy?.user.map((user, index) => {
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
            <span className="modal__memberDescription">{user}</span>
          </div>
        </Row>
      );
    });

    const donut = this.state.reactions?.donut?.user.map((user, index) => {
      return (
        <Row className="modal__member" id="p1" key={index}>
          <span className="modal__memberDescription">{user}</span>
          <div className="member__image">
            <Image className="modal__memberPhoto" src={userIcon2} alt="I" />
          </div>
          <div className="member__content">
            <span className="modal__memberName">Majorie Alexander</span>
            <span className="modal__memberDescription">{user}</span>
          </div>
        </Row>
      );
    });

    const all = [upvotes, donut, hearts, happy];

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        animation={true}
        className="modal"
        centered
      >
        <Modal.Header closeButton className="modal__header">
          <Modal.Title className="modal__title">
            <div className="modal__main-title">Reactions</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div className="tabs__container">
            <span className="nav__tab container" style={{ width: "100%" }}>
              <ul className="nav__list__container">
                <li
                  className={
                    type === "All"
                      ? "nav__single__tab selected"
                      : "nav__single__tab"
                  }
                  onClick={this.handleClick("All")}
                >
                  All
                </li>
                <li
                  className={
                    type === "Like"
                      ? "nav__single__tab selected"
                      : "nav__single__tab"
                  }
                  onClick={this.handleClick("Like")}
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
                  onClick={this.handleClick("Happy")}
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
                  onClick={this.handleClick("Heart")}
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
                  onClick={this.handleClick("Donut")}
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
          {type === "All" && all}
          {type === "Like" && upvotes}
          {type === "Heart" && hearts}
          {type === "Happy" && happy}
          {type === "Donut" && donut}
        </Modal.Body>
        <div className="modal__buttons">
          <Button onClick={this.props.onHide} className="modal__save">
            <span className="modal__buttontext">Exit</span>
          </Button>
        </div>
      </Modal>
    );
  }
}

// map state to props
export default PostReactionModal;
