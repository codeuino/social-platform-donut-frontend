import React, { Component } from 'react'
import { Form, Button } from "react-bootstrap";
import UploadImg from '../../../../assets/images/upload.jpg'
import { connect } from 'react-redux'
import { getOrgProfile, updateOrgProfile, deactivateOrg } from '../../../../actions/orgAction'
import './profile.scss'

class OrgProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDeactivated: false,
      logo: null,
      orgName: "",
      shortDesc: "",
      longDesc: "",
      error: ''
    }
  }

  // fetch data on page load 
  componentDidMount() {
    this.props.getOrgProfile()
  }

  componentWillReceiveProps(nextProps) {
    const { name, description } = nextProps.org.org;
    const { isDeactivated } = nextProps.org
    this.setState({ 
      orgName: name, 
      shortDesc: description?.shortDescription, 
      longDesc: description?.longDescription,
      isDeactivated: isDeactivated, 
    }, () => {
      console.log('org info ', this.state)
    })
    const { msg } = nextProps.error
    this.setState({ error: msg })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name] : value }, () => {
      console.log('state ', this.state)
    })
  }

  deactivateOrg = () => {
    console.log('Org deactivate clicked!');
    this.props.deactivateOrg()
  }

  updateInfo = () => {
    console.log('Update info clicked!');
    const { orgName, shortDesc, longDesc } = this.state
    const info = {
      description: {
        shortDescription: shortDesc,
        longDescription: longDesc,
      },
      name: orgName
    };
    console.log('updatedInfo ', info)
    this.props.updateOrgProfile(info)
  }

  onFileChange = (e) => {
    console.log('Upload logo clicked!', e.target.files[0])
    this.setState({ logo: URL.createObjectURL(e.target.files[0]) }, () => {
      console.log("logo set ", this.state);
    });
  }

  render() {
    const { 
      logo, 
      orgName, 
      shortDesc, 
      longDesc, 
      // error, 
      isDeactivated,
     } = this.state;
    return (
      <div className="container">
        <div className="profile_content">
          <div className="container">
            <p className="org_profile_text">Organization Profile</p>
            {/* {Boolean(error !== null) ? (<p style={{color: "red"}}>{error}</p>): null } */}
            <Form className="form">
              <Form.Group>
                <Form.Label htmlFor="label_text" className="label_text">
                  LOGO
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <div className="box">
                  <img
                    src={logo || UploadImg}
                    alt="Upload"
                    className="upload_img img-fluid"
                  />
                  <input
                    type="file"
                    name="logo"
                    onChange={this.onFileChange}
                    className="default__input__file"
                    id="selectFile"
                  />
                  <Button
                    className="upload_btn"
                    onClick={() => {
                      document.getElementById("selectFile").click();
                    }}
                  >
                    Upload new
                  </Button>
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="label_text" className="label_text mt-0">
                  ABOUT
                </Form.Label>
                <Form.Control
                  type="text"
                  name="orgName"
                  id="exampleText"
                  placeholder="Organization name"
                  className="placeholder_text"
                  defaultValue={orgName}
                  onChange={this.handleChange}
                  required={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="label_text" className="label_text">
                  SHORT DESCRIPTION
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="shortDesc"
                  id="exampleText"
                  placeholder="Short description"
                  className="placeholder_text"
                  required={true}
                  onChange={this.handleChange}
                  defaultValue={shortDesc}
                  rows="1"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="exampleText" className="label_text">
                  LONG DESCRIPTION
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Long description"
                  required={true}
                  className="placeholder_text"
                  defaultValue={longDesc}
                  onChange={this.handleChange}
                  name="longDesc"
                />
              </Form.Group>
              <Form.Group>
                <Button className="save_btn" onClick={this.updateInfo}>
                  Save
                </Button>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="deactivate" className="label_text">
                  Do you want to deactivate ?
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Button
                  className={
                    isDeactivated
                      ? "deactivated_btn"
                      : "btn-danger button-outline-danger deactivate_btn"
                  }
                  onClick={this.deactivateOrg}
                >
                  {isDeactivated ? (
                    <span>Deactivated</span>
                  ) : (
                    <span>Deactivate</span>
                  )}
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  org: state.org
})

export default connect(mapStateToProps, {
   getOrgProfile, 
   updateOrgProfile, 
   deactivateOrg
})(OrgProfile);
