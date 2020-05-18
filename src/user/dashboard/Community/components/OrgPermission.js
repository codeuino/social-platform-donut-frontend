import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import './permission.scss'

class OrgPermission extends Component {
  render() {
    return (
      <div className="container">
        <div className="permission_content">
          <div className="container">
             <p className="org_permission_text">Organization Permission</p>
            <Form className="form">
              <Form.Group>
                <Form.Label htmlFor="header_text" className="header_text">
                  JOINING THE ORGANIZATION
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="label_text" className="sub_header_text">
                  Are invitations required for joining the organization?
                </Form.Label>
                <Form.Control as="select" className="select_option">
                  <option>Yes. Admins and Members can send invitations</option>
                  <option>Yes. Only Admins can send invitations</option>
                  <option>No one can send invitations</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="label_text" className="sub_header_text">
                  Restrict email domains of new users ?
                </Form.Label>
                <Form.Control as="select" className="select_option">
                  <option>No Restrictions </option>
                  <option>Restrictions </option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label
                  htmlFor="header_text"
                  className="header_text margin_header"
                >
                  USER IDENTITY
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Prevent users from changing their name"
                  defaultChecked={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Prevent users from changing their email address "
                  defaultChecked={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label
                  htmlFor="header_text"
                  className="header_text margin_header"
                >
                  OTHER PERMISSIONS
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label
                  htmlFor="sub_header_text"
                  className="sub_header_text"
                >
                  Who can create and manage user groups
                </Form.Label>
                <Form.Control as="select" className="select_option">
                  <option>Admins and Members </option>
                  <option>Only Admins</option>
                  <option>Only Members </option>
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

export default  OrgPermission;