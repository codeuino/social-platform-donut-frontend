import React, { Component } from "react";
import { Modal, Button, Row, Image } from "react-bootstrap";
import PropTypes from 'prop-types';
import logo from "../../../assets/svgs/logo-image.jpg";
import { connect } from 'react-redux'
import { followUser, unFollowUser } from '../../../actions/usersAction'
import { getMember } from '../../../actions/insightAction'

class Followers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Follow",
      followings: [],
      status: false,
      query: "",
    };
  }

  follow = (userId) => {
    console.log("started following user ", userId);
    this.props.followUser(userId);
  };

  unFollow = (userId) => {
    console.log("started unfollowing ", userId);
    this.props.unFollowUser(userId);
  };

  checkFollowing = (userId = 0) => {
    let followingArray = this.state.followings.map((follow) => follow._id);
    let isFollowing = followingArray.includes(userId) ? true : false;
    console.log("isFollowing ", isFollowing);
    return isFollowing;
  };

  onFollowUnFollowClick = (userId, text) => {
    console.log("userId text ", userId + " " + text);
    if (text === "Follow") {
      this.follow(userId);
    }
    if (text === "UnFollow") {
      this.unFollow(userId);
    }
  };

  onChange = (e) => {
    this.setState({ query: e.target.value });
  };

  // onKeyPress = (e) => {
  //   console.log("event ", e.key);
  //   if (e.key === "Enter") {
  //     this.onSearchClick();
  //   }
  // };

  // onSearchClick = () => {
  //   const { query } = this.state;
  //   console.log("query ", query);
  //   this.props.getMember(query);
  // };

  componentWillReceiveProps(nextProps) {
    console.log("followers nextProps ", nextProps);
    this.setState({ followings: nextProps.followings });
  }

  render() {
    const { borderStyle, onHide, followers, show } = this.props;
    // const { query } = this.state;
    let followersList = [];

    if (followers && followers.length > 0) {
      for (const follower in followers) {
        let tempObj = {};
        tempObj.name =
          followers[follower]?.name?.firstName +
          " " +
          followers[follower]?.name?.lastName;
        tempObj.desg = followers[follower]?.info?.about?.designation || "NA";
        tempObj._id = followers[follower]._id;
        this.checkFollowing(tempObj._id)
          ? (tempObj.text = "UnFollow")
          : (tempObj.text = "Follow");
        followersList.push(tempObj);
      }
    }

    let followersContent = followersList.map((item) => (
      <Row className="modal__follower" id="p1" key={item._id}>
        <div className="follower__image">
          <Image className="modal__followerPhoto" src={logo} alt="I" rounded />
        </div>
        <div className="follower__content">
          <span className="modal__followerName">{item.name}</span>
          <span className="modal__followerDescription">{item.desg}</span>
        </div>
        <div className="follower__btn__container">
          <Button
            className={
              Boolean(item.text === "Follow")
                ? "modal__followButton"
                : "modal__unFollowButton"
            }
            variant="outline-primary"
            onClick={this.onFollowUnFollowClick.bind(this, item._id, item.text)}
          >
            <span
              className={
                Boolean(item.text === "Follow")
                  ? "modal__followText"
                  : "modal__unFollowText"
              }
            >
              {item.text}
            </span>
          </Button>
        </div>
      </Row>
    ));
    return (
      <Modal
        onHide={onHide}
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        className="modal"
        style={borderStyle}
        centered
      >
        <Modal.Header closeButton className="modal__header">
          <Modal.Title className="modal__title">
            <div className="modal__main-title">Followers</div>
            {/* <input
              type="text"
              placeholder="Search"
              className="modal__search"
              value={query}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
            />
            <Button className="search_btn" onClick={this.onSearchClick}>
              Search
            </Button> */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div className="modal__mini-title">PEOPLE WHO FOLLOW YOU</div>
          {followersContent}
        </Modal.Body>
      </Modal>
    );
  }
}

Followers.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
  borderStyle: PropTypes.object,
  followers: PropTypes.array,
  followings: PropTypes.array
}

// map state to props 
const mapStateToProps = (state) => ({ 
  auth: state.auth,
  error: state.error,
  user: state.user,
  insight: state.insight,
  status: state.status
})

export default connect(mapStateToProps, { followUser, unFollowUser, getMember })(Followers);