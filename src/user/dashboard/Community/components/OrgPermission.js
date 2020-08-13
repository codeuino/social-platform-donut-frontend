import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateSettings, getOrgProfile } from '../../../../actions/orgAction'
import './permission.scss'

class OrgPermission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendInvite: "ADMINS",
      canCreateManage: "BOTH",
      canChangeEmail: true,
      canChangeName: true,
      error: ''
    }
  }

  onChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value }, () => {
      console.log('state ', this.state)
    })
  }

  toggleRadio = (e) => {
    this.setState({ [e.target.name]: !e.target.checked }, () => {
      console.log("state ", this.state);
    });
  };

  componentDidMount() {
    this.props.getOrgProfile()
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps)
    const { permissions } = nextProps.org?.org?.options;
    console.log('permissions ', permissions)
    this.setState({ 
      canChangeEmail: permissions?.canChangeEmail, 
      canChangeName: permissions?.canChangeName, 
      canCreateManage: permissions?.canCreateManage, 
      sendInvite: permissions?.sendInvite
      
    }, () => {
      console.log('updated state', this.state)
    })
    this.setState({ error: nextProps.error.msg }, () => {
      console.log('state ', this.state)
    })
  }

  updateInfo = () => {
    const { sendInvite, canCreateManage, canChangeEmail, canChangeName } = this.state
    const info = {
      permissions: {
        sendInvite,
        canCreateManage,
        canChangeEmail,
        canChangeName
      }
    }
    this.props.updateSettings(info)
  }

  render() {
    const { 
      canChangeEmail, 
      canChangeName, 
      sendInvite, 
      canCreateManage, 
      // error
     } = this.state
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
                <Form.Control
                  as="select"
                  className="select_option"
                  name="sendInvite"
                  value={sendInvite}
                  onChange={this.onChange}
                >
                  <option value="BOTH">
                    Yes. Admins and Members can send invitations
                  </option>
                  <option value="ADMINS">
                    Yes. Only Admins can send invitations
                  </option>
                  <option value="NONE">No one can send invitations</option>
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
                  checked={canChangeName === false}
                  name="canChangeName"
                  onChange={this.toggleRadio}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Prevent users from changing their email address "
                  checked={canChangeEmail === false}
                  name="canChangeEmail"
                  onChange={this.toggleRadio}
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
                <Form.Control
                  as="select"
                  name="canCreateManage"
                  className="select_option"
                  value={canCreateManage}
                  onChange={this.onChange}
                >
                  <option
                    value="BOTH"
                  >
                    BOTH
                  </option>
                  <option
                    value="ADMINS"
                  >
                    Only Admins
                  </option>
                  <option
                    value="MEMBERS"
                  >
                    Only Members
                  </option>
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
                {/* <p>{Boolean(error !== null) ? (
                  <span style={{ color: "red" }}>{error}</span>
                ) : null}</p> */}
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

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  org: state.org
})

export default connect(mapStateToProps, { updateSettings, getOrgProfile })(OrgPermission);