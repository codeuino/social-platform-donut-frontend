import React, { Component } from "react";
import "./ReactionsElement.scss";
import { motion } from "framer-motion";
import Like from "../../../images/Like.png";
import Heart from "../../../images/Heart.png";
import Happy from "../../../images/Happy.png";
import DonutReaction from "../../../images/DonutReaction.png";
import { connect } from "react-redux";
import { upVotePost, removeReaction } from "../../../actions/postAction";

const reactionVariant = {
  hover: {
    scale: 1.3,
    rotate: [0, 10, 0, -10, 0],
  },
};

class ReactionsElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reacted: this.props.reacted,
      count: this.props.count || 0,
      reaction: "like",
      reactionType: this.props.reactionType,
    };
  }

  componentDidMount() {}

  handleReaction = (reaction) => {
    const { count } = this.state;
    const type = {
      reactionType: reaction,
    };
    this.setState({
      reacted: true,
      reactionType: reaction,
      count: count + 1,
    });
    this.onUpVote(this.props.postId, type);
  };

  handleNoReaction = (reaction) => {
    let { count } = this.state;

    const type = {
      reactionType: reaction,
      reacted: false,
    };

    this.setState({
      reacted: false,
      count: count - 1,
    });

    this.props.removeReaction(this.props.postId, type);
  };

  onUpVote = (postId, type) => {
    this.props.upVotePost(postId, type);
  };

  render() {
    const { reacted, count, reaction } = this.state;
    const { votes, openModal, reactionType } = this.props;
    return (
      <div className="reactions-container">
        {reacted ? (
          <div className="reaction-element">
            {reactionType === "like" && (
              <motion.img
                src={Like}
                alt="like-reaction"
                variants={reactionVariant}
                whileHover="hover"
                onClick={() => this.handleNoReaction("like")}
              ></motion.img>
            )}
            {reactionType === "happy" && (
              <motion.img
                src={Happy}
                alt="like-reaction"
                variants={reactionVariant}
                whileHover="hover"
                onClick={() => this.handleNoReaction("happy")}
              ></motion.img>
            )}
            {reactionType === "heart" && (
              <motion.img
                src={Heart}
                alt="like-reaction"
                variants={reactionVariant}
                whileHover="hover"
                onClick={() => this.handleNoReaction("heart")}
              ></motion.img>
            )}
            {reactionType === "donut" && (
              <motion.img
                src={DonutReaction}
                alt="like-reaction"
                variants={reactionVariant}
                whileHover="hover"
                onClick={() => this.handleNoReaction("donut")}
              ></motion.img>
            )}
            {count === 1 && (
              <span className="reaction-text">{`You reacted`}</span>
            )}
            {count > 1 && (
              <span
                className="reaction-text"
                onClick={() => openModal(votes)}
              >{`You and ${count - 1} others reacted.`}</span>
            )}
          </div>
        ) : (
          <motion.div className="reactions-holder">
            <div
              className="reaction-element"
              onClick={() => this.handleReaction("like")}
            >
              <motion.img
                src={Like}
                alt="like-reaction"
                variants={reactionVariant}
                whileHover="hover"
              ></motion.img>
            </div>
            <div
              className="reaction-element"
              onClick={() => this.handleReaction("happy")}
            >
              <motion.img
                src={Happy}
                alt="happy-reaction"
                variants={reactionVariant}
                whileHover="hover"
              ></motion.img>
            </div>
            <div
              className="reaction-element"
              onClick={() => this.handleReaction("heart")}
            >
              <motion.img
                src={Heart}
                alt="heart-reaction"
                variants={reactionVariant}
                whileHover="hover"
              ></motion.img>
            </div>
            <div
              className="reaction-element"
              onClick={() => this.handleReaction("donut")}
            >
              <motion.img
                src={DonutReaction}
                alt="donut-reaction"
                variants={reactionVariant}
                whileHover="hover"
              ></motion.img>
            </div>

            {count == 0 && (
              <span className="reaction-text">{`${count} reactions`}</span>
            )}
            {count > 0 && (
              <span
                className="reaction-text"
                onClick={() => openModal(votes)}
              >{`${count} reactions`}</span>
            )}
          </motion.div>
        )}
      </div>
    );
  }
}

export default connect(null, { upVotePost, removeReaction })(ReactionsElement);
