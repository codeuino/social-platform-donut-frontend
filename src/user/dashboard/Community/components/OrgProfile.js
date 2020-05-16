import React, { Component } from 'react'
import { Form, Button } from "react-bootstrap";
import UploadImg from '../../../../images/upload.jpg'
import './profile.scss'

class OrgProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      logo: UploadImg,
      orgName: "",
      desc: {
        short: "",
        long: ""
      }
    }
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name] : value })
  }
  deactivateOrg = () => {
    console.log('Org deactivate clicked!');
  }
  updateInfo = () => {
    console.log('Update info clicked!');
  }
  UploadNewLogo = () => {
    console.log('Upload logo clicked!')
  }
  render() {
    const { logo, orgName, desc } = this.state;
    return (
      <div className="container">
        <div className="profile_content">
          <div className="container">
             <p className="org_profile_text">Organization Profile</p>
            <Form className="form">
              <Form.Group>
                <Form.Label htmlFor="label_text" className="label_text">
                  Logo
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <div className="box">
                  <img src={logo || UploadImg} alt="Upload" className="upload_img"/>
                  <Button 
                    className="upload_btn"
                    onChange={this.UploadNewLogo}
                    >Upload new
                  </Button>
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="label_text" className="label_text mt-0">
                  About
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
                  Short description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="shortDescription"
                  id="exampleText"
                  placeholder="Short description"
                  className="placeholder_text"
                  required={true}
                  onChange={this.handleChange}
                  defaultValue={desc.short}
                  rows="1"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="exampleText" className="label_text">
                  Long description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Long description"
                  required={true}
                  className="placeholder_text"
                  defaultValue={desc.long}
                  onChange={this.handleChange}
                  name="longDesc"
                />
              </Form.Group>
              <Form.Group>
                <Button className="save_btn" onClick={this.updateInfo}>Save</Button>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="deactivate" className="label_text">
                  Deactivation
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Button className="btn-secondary button-outline-danger deactivate_btn" onClick={this.deactivateOrg}>
                  Deactivate
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default  OrgProfile;