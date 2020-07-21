import React, { Component } from 'react'
import { Timeline } from "antd";
import "antd/dist/antd.css";
import './activity.scss'
import Navigation from '../dashboard/navigation/navigation';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { getEventById } from '../../actions/eventAction'
// import { getProjectById } from '../../actions/projectAction'
import { getPostById } from '../../actions/postAction'
import PostPopup from './Popups/PostPopup';
import EventPopup from './Popups/EventPopup';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org: true,
      showEvent: false,
      showPost: false,
      showProject: false,
      eventId: '',
      postId: ''
    }
  }

  showPopup = (modalType, id) => {
    console.log('type ', modalType, this.state)
    
    if (Boolean(modalType === "Event")) {
      // CHANGE HARD CODED DATA TO ID
      this.props.getEventById("5ef76594201b3f2dec2acf20");
      this.setState({
        showEvent: true,
        eventId: '5ef76594201b3f2dec2acf20'
      })
    }

    if (Boolean(modalType === "Project")) {
      // CHANGE HARD CODED DATA TO ID
      this.props.history.push(`/5efca0d9081c631ed098944b/proj-info`)
    }

    if (Boolean(modalType === "Post")) {
      // CHANGE HARD CODED DATA TO ID
      this.props.getPostById("5efd836db08e9e369050cca1");
      this.setState({
        showEvent: false,
        showPost: true,
        postId: "5efd836db08e9e369050cca1",
      });
    }
  }
  
  handleClose = () => {
    this.setState({ 
      showEvent: false, 
      showPost: false
    })
  }

  render() {
    const { dashboard, showEvent, showPost, showProject, eventId, postId } = this.state
    const activity = [
      {
        type: 'Post',
        text: "User X created a post!",
      },
      {
        type: 'Project',
        text: "User X created a Project!",
      },
      {
        type: 'Event',
        text: "User X created an Event!",
      },
      {
        type: 'Comment',
        text: "User X commented on GSOC !",
      },
      {
        type: 'Post',
        text: "User X created a post!",
      },
      {
        type: 'Event',
        text: "User X created an Event!",
      },
      {
        type: 'Comment',
        text: "User X commented on GSOC !",
      },
      {
        type: 'Post',
        text: "User X created a post!",
      },
      {
        type: 'Event',
        text: "User X created an Event!",
      },
      {
        type: 'Comment',
        text: "User X commented on GSOC !",
      },
      {
        type: 'Post',
        text: "User X created a post!",
      },
      {
        type: 'Event',
        text: "User X created an Event!",
      },
      {
        type: 'Comment',
        text: "User X commented on GSOC !",
      },
    ];

    return (
      <div className="overall_container">
        <div className="main_navigation">
          <Navigation orgSettings={this.state.org} />
        </div>
        <div className="user_activity_view">
          <div className="main_section">
            <div className="timelines__container">
              <p className="activity__header">User activity</p>
              <Timeline mode="alternate">
                  {activity.map((act, index) => (
                    <Timeline.Item 
                      key={index}
                      onClick={this.showPopup.bind(this, act.type, index)}
                    >
                      <p className="activity__link">{act.text}</p>
                    </Timeline.Item>
                  ))}
              </Timeline>
            </div>
          </div>
        </div>
        <EventPopup 
          show={showEvent} 
          onHide={this.handleClose} 
          eventId={eventId}
        />
        <PostPopup 
          show={showPost}
          onHide={this.handleClose}
          postId={postId}
        />
      </div>
    );
  }
}
// map state to props 
const mapStateToProps = (state) => ({
  event: state.event,
  project: state.project,
  post: state.post
})

export default connect(mapStateToProps, { getEventById, getPostById })(withRouter(Activity));