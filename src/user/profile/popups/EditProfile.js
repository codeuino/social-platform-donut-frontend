import React, { Component } from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { updateProfile } from "../../../actions/usersAction";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      shortDesc: '',
      location: '',
      github: '',
      fb: '',
      linkedin: '',
      twitter: '',
      designation: '',
      website: '',
      longDesc: '',
      canChangeName: '',
      // canChangeEmail: '',
      userId: ''
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSave = (e) => {
    e.preventDefault();
    const { 
      firstName, 
      lastName, 
      designation, 
      location, 
      website, 
      shortDesc, 
      longDesc,
      github,
      linkedin,
      twitter,
      userId
     } = this.state
    const info = {
      name: {
        firstName,
        lastName
      },
      info: {
        about: {
          shortDescription: shortDesc,
          longDescription: longDesc,
          designation,
          location,
          website
        }
      },
      socialMedia: {
        github,
        linkedin,
        twitter
      }
    }
    let id = userId || localStorage.getItem('userId')
    console.log('Updating data!', this.state)
    this.props.updateProfile(id, info)
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps)
    const { userProfile } = nextProps.user
    const permissions = nextProps?.org?.org?.options?.permissions
    const about = userProfile?.info?.about
    const { socialMedia } = userProfile
    this.setState({ 
      firstName: userProfile?.name?.firstName,
      lastName: userProfile?.name?.lastName,
      website: about?.website,
      designation: about?.designation, 
      longDesc: about?.longDescription, 
      shortDesc: about?.shortDescription,
      location: about?.location,
      // canChangeEmail: permissions?.canChangeEmail,
      canChangeName: permissions?.canChangeName,
      userId: userProfile?._id,
      github: socialMedia?.github,
      twitter: socialMedia?.twitter,
      linkedin: socialMedia?.linkedin
     }, () => {
      console.log('updated state ', this.state)
    })
  }

  render() {
    const { borderStyle, onHide, show } = this.props
    const { 
      firstName, 
      lastName, 
      shortDesc, 
      location, 
      designation, 
      website, 
      longDesc, 
      canChangeName,
      // canChangeEmail,
      github,
      linkedin,
     } = this.state
     return (
       <Modal onHide={onHide} show={show} className="modal">
         <Modal.Header
           closeButton
           className="modal__header"
           aria-labelledby="contained-modal-title-vcenter"
           style={borderStyle}
           centered="true"
         >
           <Modal.Title className="modal__title" style={borderStyle}>
             <div className="modal__main-title">Edit Profile</div>
             <div className="modal__mini-title">PERSONAL INFORMATION</div>
           </Modal.Title>
         </Modal.Header>
         <Modal.Body className="modal__body" style={borderStyle}>
           <Form className="modal__form" style={borderStyle}>
             <Form.Row className="modal__row">
               <Form.Group
                 as={Col}
                 controlId="formGridFirstName"
                 className="modal__group"
               >
                 <Form.Label className="modal__label">First Name</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="First name.."
                   defaultValue={firstName}
                   name="firstName"
                   onChange={this.onChange}
                   readOnly={!canChangeName}
                 />
               </Form.Group>

               <Form.Group
                 as={Col}
                 controlId="formGridLastName"
                 className="modal__group"
               >
                 <Form.Label className="modal__label">Last Name</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="First name.."
                   defaultValue={lastName}
                   name="lastName"
                   onChange={this.onChange}
                   readOnly={!canChangeName}
                 />
               </Form.Group>
             </Form.Row>
             <Form.Row className="modal__row">
               <Form.Group
                 as={Col}
                 controlId="formGridDesignation"
                 className="modal__group"
               >
                 <Form.Label className="modal__label">Designation</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="Designation"
                   defaultValue={designation}
                   name="designation"
                   onChange={this.onChange}
                 />
               </Form.Group>

               <Form.Group
                 as={Col}
                 controlId="formGridLocation"
                 className="modal__group"
               >
                 <Form.Label className="modal__label">Location</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="Location"
                   defaultValue={location}
                   name="location"
                   onChange={this.onChange}
                 />
               </Form.Group>
             </Form.Row>
             <Form.Row className="modal__row">
               <Form.Group
                 as={Col}
                 controlId="formGridAbout"
                 className="modal__group"
               >
                 <Form.Label className="modal__label">About</Form.Label>
                 <Form.Control
                   as="textarea"
                   className="modal__post"
                   placeholder="Write a few lines about yourself.."
                   rows={1}
                   defaultValue={shortDesc}
                   name="shortDesc"
                   onChange={this.onChange}
                 />
                 <br />
                 <Form.Control
                   as="textarea"
                   className="modal__post"
                   placeholder="Long Bio.."
                   rows={2}
                   defaultValue={longDesc}
                   name="longDesc"
                   onChange={this.onChange}
                 />
               </Form.Group>
             </Form.Row>
             <div className="modal__secondary-title">PROFILE</div>
             <Form.Row className="modal__row">
               <Form.Group
                 as={Col}
                 controlId="formGridGithub"
                 className="modal__group"
               >
                 <Form.Label className="modal__label">Github URL</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="Github URL"
                   defaultValue={github}
                   name="github"
                   onChange={this.onChange}
                 />
               </Form.Group>

               <Form.Group
                 as={Col}
                 controlId="formGridLinkedIn"
                 className="modal__group"
               >
                 <Form.Label className="modal__label">LinkedIn URL</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="LinkedIn URL"
                   defaultValue={linkedin}
                   name="linkedIn"
                   onChange={this.onChange}
                 />
               </Form.Group>
             </Form.Row>
             <Form.Row className="modal__row">
               <Form.Group
                 as={Col}
                 controlId="formGridFacebook"
                 className="modal__group"
               >
                 <Form.Label className="modal__label">Website</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="Portfolio URL"
                   defaultValue={website}
                   name="website"
                   onChange={this.onChange}
                 />
               </Form.Group>
             </Form.Row>
           </Form>
         </Modal.Body>
         <div className="modal__buttons">
           <Button onClick={this.onSave} className="modal__save">
             <span className="modal__buttontext">Save</span>
           </Button>
           <Button onClick={onHide} className="modal__cancel">
             <span className="modal__buttontext">Cancel</span>
           </Button>
         </div>
       </Modal>
     );
  }
}

EditProfile.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
  style: PropTypes.object,
};

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  user: state.user,
  org: state.org
})

export default connect(mapStateToProps, { updateProfile })(EditProfile);
