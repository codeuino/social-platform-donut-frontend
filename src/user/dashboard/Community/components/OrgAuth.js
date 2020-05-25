import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import './auth.scss'

class OrgAuth extends Component {
  render() {
    return (
      <div className="container">
        <div className="auth_content">
          <div className="container">
            <p className="auth_text">Authentication</p>
            <Form className="form">
              <Form.Group>
                <Form.Label htmlFor="header_text" className="header_text">
                  AUTHENTICATION METHODS
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Email"
                  defaultChecked={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Github"
                  defaultChecked={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Google"
                  defaultChecked={true}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Gitlab"
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
    )
  }
}
export default  OrgAuth;