import React, { Component } from "react";
import { Modal, Button, Row, Image, Form } from "react-bootstrap";
import { connect } from 'react-redux'
import { removeAdmin } from '../../../actions/orgAction'
import logo from "../../../assets/svgs/logo-image.jpg";
import { getMember } from '../../../actions/insightAction'
import { getInviteLink } from '../../../actions/usersAction'
import { getOrgProfile } from '../../../actions/orgAction'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Admins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Follow',
      admins: [],
      query: '',
      inviteLink: '',
      whoCanSendInvite: ''
    }
  }

  onRemoveClick = (userId) => {
    console.log('Removing admin!', userId);
    // SEND REQUEST TO REMOVE USER WITH ID = INDEX FROM ADMINISTRATORs LIST
    this.props.removeAdmin(userId)
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps)
    const { query } = this.state;
    const { insight, org } = nextProps
    const permissions = org?.org?.options?.permissions
    let res = [];
    if (query) {
      let allMembers = insight.member;
      console.log("allmembers ", allMembers);
      let allAdmins = []
      for(let i in allMembers) {
        if(allMembers[i].isAdmin === true) {
          allAdmins.push(allMembers[i]);
        }
      }
      res = this.mapHelper(allAdmins);
    } else {
      let allAdmins = nextProps.admins;
      res = this.mapHelper(allAdmins);
    }
    this.setState({
      admins: res,
      inviteLink: nextProps.user?.inviteLink,
      whoCanSendInvite: permissions?.sendInvite
    });
  }

   mapHelper = (allAdmins) => {
     let adminInfo = []
     if (allAdmins.length > 0) {
      allAdmins.forEach((admin) => {
        adminInfo.push({ name: admin.name.firstName + ' ' + admin.name.lastName, desc: admin.info.about?.designation, _id: admin._id, isRemoved: admin?.isRemoved || false })
      })
     }
    return adminInfo
  }

  onChange = (e) => {
    this.setState({ query: e.target.value })
  }

  onKeyPress = (e) => {
    const { query } = this.state
    if(e.key === 'Enter') {
      this.props.getMember(query)
    }
  }

  onSearchClick = () => {
    const { query } = this.state
    this.props.getMember(query)
  }

  onGetInviteLink = () => {
    this.props.getInviteLink('admin')
  }

  copyToClipBoard = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      if (link) {
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.log('error ', error)
    }
  }

  render() {
    const { onHide, show } = this.props
    const { inviteLink, whoCanSendInvite } = this.state
    const adminList = [...this.state.admins] 
    let admins = adminList.map((item) => (
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
            className="btn-danger modal__remove__followButton"
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
            <div className="modal__main-title">Administrators</div>
            <Row style={{ marginLeft: "0px" }}>
              <input
                type="text"
                placeholder="Search"
                className="modal__search"
                value={this.state.query}
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
              />
              <Button className="search_btn" onClick={this.onSearchClick}>
                Search
              </Button>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <div className="modal__mini-title">COMMUNITY ADMINISTRATORS</div>
          {admins}
          <div className="add__member">
            <h3 className="modal__mini-title">ADD ADMINISTRATOR</h3>
            <div className="add__member__form">
              <Form.Label htmlFor="email" className="email__header">
                Get invite link
              </Form.Label>
              <div className="add__member__input__container">
                <Form.Control
                  as="input"
                  defaultValue={inviteLink}
                  readOnly={true}
                  placeholder="Get invite link"
                ></Form.Control>
                <Button
                  className="invite__btn"
                  onClick = {
                    Boolean(inviteLink.length === 0) 
                    ? this.onGetInviteLink 
                    : this.copyToClipBoard.bind(this, inviteLink)
                  }
                  disabled={Boolean(
                    whoCanSendInvite !== "ADMINS" || whoCanSendInvite !== "BOTH"
                  ) ? false : true }
                >
                  {Boolean(inviteLink.length === 0) ? <>Get Link</> : <>Copy</>}
                </Button>
              </div>
              {/* <div className="share__btn__container">
                <p className="share__text">or share invite on</p>
                <Button className="invite__btn">Facebook</Button>
                <Button className="invite__btn">LinkedIn</Button>
                <Button className="invite__btn">Twitter</Button>
              </div> */}
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Modal.Body>
      </Modal>
    );
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  insight: state.insight,
  user: state.user,
  status: state.status,
  org: state.org
})

export default connect(mapStateToProps, { removeAdmin, getMember, getInviteLink, getOrgProfile })(Admins)