import React, { Component } from "react";
import { Modal, Button, Row, Col, Image, Form } from "react-bootstrap";
import { connect } from 'react-redux';
import { removeUser } from '../../../actions/usersAction'
import { getMember } from '../../../actions/insightAction'
import logo from "../../../svgs/logo-image.jpg";

class Members extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Follow',
      members: [],
      query: ''
    }
  }

  onRemoveClick = (userId) => {
    console.log('Removing !', userId);
    // SEND REQUEST TO REMOVE USER WITH ID = INDEX
    this.props.removeUser(userId)
  }

  onChange = (e) => {
    this.setState({ query: e.target.value })
  }

  onKeyPress = (e) => {
    console.log('event ', e.key)
    if(e.key === 'Enter') {
      this.onSearchClick()
    }
  }

  onSearchClick = () => {
    const { query } = this.state;
    console.log('')
    this.props.getMember(query);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps)
    const { query } = this.state
    let res = []
    if(query) {
      let allMembers = nextProps.insight.member;
      res = this.mapHelper(allMembers)
    } else {
      let allMembers = nextProps.insight.allMembers
      res = this.mapHelper(allMembers)
    }
    this.setState({ members: res }, () => {
      console.log("members ", this.state);
    });
  }

  mapHelper = (allMembers) => {
    let membersInfo = [] 
    if(allMembers.length > 0) {
      allMembers.forEach((member) => {
        membersInfo.push({ name: member.name.firstName + ' ' + member.name.lastName, desc: member.info.about.designation || 'UI/UX' , _id: member._id, isRemoved: member?.isRemoved || false })
      })
    }
    return membersInfo
  }

  render() {
    const { onHide, show } = this.props
    const membersList = [ ...this.state.members] 
    let members = membersList.map((item) => (
      <Row className="modal__member" id="p1" key={item._id}>
        <div className="member__image">
          <Image className="modal__memberPhoto" src={logo} alt="I" rounded />
        </div>
        <div className="member__content">
          <span className="modal__memberName">{item.name}</span>
          <span className="modal__memberDescription">{item.desc}</span>
        </div>
        <div className="member__btn__container">
          <Button
            className = {
              Boolean(item.isRemoved === true) ? 'modal__removed__followButton' :
              'modal__remove__followButton'
            }
            onClick={this.onRemoveClick.bind(this, item._id)}
          >
            <span className="remove_followText">
              {Boolean(item.isRemoved === true) ? (<span>Removed</span>) : (<span>Remove</span>)}
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
        centered
      >
        <Modal.Header closeButton className="modal__header">
          <Modal.Title className="modal__title">
            <div className="modal__main-title">Members</div>
            <input 
              type="text"
              placeholder="Search"
              className="modal__search"
              name="query"
              value={this.state.query}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div className="modal__mini-title">COMMUNITY MEMBERS</div>
          {members}
          <div className="add__member">
            <h3 className="modal__mini-title">ADD MEMBER</h3>
            <div className="add__member__form">
              <Form.Label htmlFor="email" className="email__header">
                Email
              </Form.Label>
              <div className="add__member__input__container">
                <Form.Control
                  as="input"
                  placeholder=" Enter their email"
                ></Form.Control>
                <Button className="invite__btn">Invite</Button>
              </div>
              <div className="share__btn__container">
                <p className="share__text">or share invite on</p>
                <Button className="invite__btn">Facebook</Button>
                <Button className="invite__btn">LinkedIn</Button>
                <Button className="invite__btn">Twitter</Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  user: state.user,
  insight: state.insight,
  status: state.status
})

export default connect(mapStateToProps, { removeUser, getMember })(Members);