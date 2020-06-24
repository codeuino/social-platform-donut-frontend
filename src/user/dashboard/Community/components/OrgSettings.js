import React, { Component } from 'react'
import { Form, Button } from "react-bootstrap";
import { connect } from 'react-redux'
import { updateSettings, getOrgProfile } from '../../../../actions/orgAction'
import './settings.scss'

class OrgSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgName: "",
      editing: true,
      enableEmail: true,
      language: "",
      time: "",
      error: ''
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log("state ", this.state);
    });
  };

  toggleRadio = (e) => {
    this.setState({ [e.target.name]: e.target.checked }, () => {
      console.log("state ", this.state);
    });
  };

  updateInfo = () => {
    const { enableEmail, language, time } = this.state
    const info = {
      settings: {
        enableEmail,
        language,
        time
      }
    };
    this.props.updateSettings(info)
  }

  componentWillMount() {
    this.props.getOrgProfile()
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps)
    const { settings } = nextProps.org.org.options
    console.log('settings ', settings)
    const { enableEmail, language, timeFormat } = settings
    this.setState({ enableEmail: enableEmail, language: language, time: timeFormat }, () => {
      console.log('updated state', this.state)
    })
    this.setState({ error: nextProps.error.msg }, () => {
      console.log('state ', this.state)
    })
  }

  render() {
    const { enableEmail, language, time, error } = this.state;
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
                <Form.Control
                  as="select"
                  className="select_option"
                  name="editing"
                  onChange={this.onChange}
                >
                  <option value="10">Upto 10 min after posting</option>
                  <option value="20">Upto 20 min after posting</option>
                  <option value="30">Upto 30 min after posting</option>
                  <option value="45">Upto 45 min after posting</option>
                  <option value="always">Always</option>
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
                <Form.Label
                  htmlFor="header_text"
                  className="header_text margin_header"
                >
                  MESSAGE EDITING
                </Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Send emails introducing Donut to new users"
                  checked={enableEmail}
                  name="enableEmail"
                  onChange={this.toggleRadio}
                />
              </Form.Group>
              {/* <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Send weekly digest emails to inactive users"
                  defaultChecked={true}
                />
              </Form.Group> */}
              <Form.Group>
                <Form.Label
                  htmlFor="header_text"
                  className="header_text margin_header"
                >
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
                <Form.Control
                  as="select"
                  name="language"
                  className="select_option"
                  onChange={this.onChange}
                >
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label
                  htmlFor="sub_header_text"
                  className="sub_header_text"
                >
                  Time Format
                </Form.Label>
                <Form.Control
                  as="select"
                  name="time"
                  className="select_option"
                  onChange={this.onChange}
                >
                  <option value="12">12 hr clock (05:00 PM)</option>
                  <option value="24">24 hr clock (13:00)</option>
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

export default connect(mapStateToProps, { updateSettings, getOrgProfile })(OrgSettings);