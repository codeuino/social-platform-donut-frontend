import React, { Component } from 'react'
import { Form, Button } from "react-bootstrap";
import './settings.scss'

class OrgSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgName: "",

    }
  }
  render() {
    return (
      <div className="container">
        <div className="settings_content">
          <div className="container">
            <p className="org_setting_text">Organization Settings</p>
            <Form className="form">
              <Form.Group>
                <Form.Label htmlFor="header_text" className="header_text">
                  ORGANIZATION EDITING
                </Form.Label>
                <Form.Control as="select" className="select_option">
                  <option>Upto 10 min after posting</option>
                  <option>Upto 20 min after posting</option>
                  <option>Upto 30 min after posting</option>
                  <option>Upto 45 min after posting</option>
                  <option>Always</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Users can edit the topic of any message"
                  defaultChecked={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Enable message edit history"
                  defaultChecked={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="header_text" className="header_text margin_header">
                  MESSAGE EDITING
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Send emails introducing Donut to new users"
                  defaultChecked={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Send weekly digest emails to inactive users"
                  defaultChecked={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="header_text" className="header_text margin_header">
                  DEFAULT USER SETTINGS
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label
                  htmlFor="sub_header_text"
                  className="sub_header_text"
                >
                  Default Language
                </Form.Label>
                <Form.Control as="select" className="select_option">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>French</option>
                  <option>German</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="sub_header_text" className="sub_header_text">
                  Time Format
                </Form.Label>
                <Form.Control as="select" className="select_option">
                  <option>12 hr clock (05:00 PM)</option>
                  <option>24 hr clock (13:00)</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Allow message content in missed message emails "
                  defaultChecked={true}
                />
              </Form.Group>
              <Form.Group>
                <Button className="save_btn mr-3" onClick={this.updateInfo}>
                  Save
                </Button>
                <Button className="discard_btn" onClick={this.disCardChanges}>
                  Discard
                </Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default  OrgSettings;