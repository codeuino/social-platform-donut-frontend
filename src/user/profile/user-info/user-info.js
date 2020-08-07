import React, { Component } from "react";
import "./user-info.scss";
import { Button } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import EditProfile from "./../popups/EditProfile";
import { FaFacebookSquare, FaGithubSquare, FaLinkedin, FaThumbtack, FaBook, FaComments } from 'react-icons/fa'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProfile } from '../../../actions/usersAction'

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editProfile: false,
      followersList: false,
      name: '',
      designation: '',
      location: '',
      shortDesc: '',
      website: '',
      userId: '',
      github: '',
      twitter: '',
      linkedin: '',
      facebook: ''
    }
  }

  componentDidMount() {
    const userId = this.props.match.params.id;
    console.log('user-info props ', userId)
    this.props.getProfile(userId)
  }

  componentWillReceiveProps(nextProps) {
    // console.log('userId ', this.props.match.params.id)
    console.log('userInfo nextProps ', nextProps.user.userProfile)
    const name = nextProps.user.userProfile?.name || "NA"
    const about = nextProps.user.userProfile?.info?.about;
    const { socialMedia } = nextProps.userProfile
    this.setState({ 
      name: `${name?.firstName + " " + name?.lastName}`,
      designation: about?.designation,
      shortDesc: about?.shortDescription,
      location: about?.location,
      website: about?.website,
      userId: nextProps.userProfile?._id,
      github: socialMedia?.github,
      twitter: socialMedia?.twitter,
      linkedin: socialMedia?.linkedin,
      facebook: socialMedia?.facebook
    })
  }

  onFbClick = () => {
    // this.props.history.push()
    this.state.facebook 
      ? window.open(`${this.state.facebook}`, '_blank')
      : window.location.href = `/profile/${this.state.userId}`
  }

  onLinkedInClick = () => {
    this.state.linkedin 
      ? window.open(`${this.state.linkedin}`, '_blank')
      : window.location.href = `/profile/${this.state.userId}`
  }

  onGithubClick = () => {
    this.state.github 
      ? window.open(`${this.state.github}`, '_blank')
      : window.location.href = `/profile/${this.state.userId}`
  }

  render() {
    const { designation, location, shortDesc, name, userId } = this.state
    let cancel = () =>
      this.setState({
        editProfile: false,
      });
    return (
      <div className="user-detail">
        <div className="user-image">
          <div className="user-pic">
            <Avatar className="userpic"></Avatar>
          </div>
          <div className="edit-option">
            {Boolean(userId === localStorage.getItem('userId')) 
              ? (<Button
                  className="useredit"
                  onClick={() => this.setState({ editProfile: true })}
                >
                  User Edit
                </Button>)
              : null
            }
            <EditProfile show={this.state.editProfile} onHide={cancel} />
          </div>
        </div>
        <div className="user-data">
          <div className="fa_icon__container">
            <span>
              <FaFacebookSquare
                color="#4457a5"
                className="fa__icon"
                onClick={this.onFbClick}
              />
            </span>
            <span>
              <FaGithubSquare
                color="#24292e"
                className="fa__icon"
                onClick={this.onGithubClick}
              />
            </span>
            <span>
              <FaLinkedin
                color="#1a73e8"
                className="fa__icon"
                onClick={this.onLinkedInClick}
              />
            </span>
          </div>
          <div className="user__infos">
            <h1>{name || "NA"} </h1>
            <p className="profession">{designation || "NA"}</p>
            <p className="place">{location || "NA"}</p>
            <p className="desc">{shortDesc || "Short description"}</p>
            <div className="social-icons">
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// map state to props 
const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, { getProfile })(withRouter(UserInfo));
