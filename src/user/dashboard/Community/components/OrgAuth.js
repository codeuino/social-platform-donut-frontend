import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateSettings, getOrgProfile } from '../../../../actions/orgAction'
import './auth.scss'

class OrgAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: true,
      google: true,
      github: true,
      gitlab: true,
      error: ''
    }
  }

  toggleRadio = (e) => {
    const { name, checked } = e.target
    this.setState({ [name]: checked }, () => {
      console.log("state ", this.state);
    });
  };

  onSaveClick = () => {
    const { email, google, github, gitlab } = this.state
    const info = {
      authentication: {
        email,
        google,
        github,
        gitlab
      }
    }
    console.log('updating auth settings ', info);
    this.props.updateSettings(info)
  }

  componentDidMount() {
    this.props.getOrgProfile()
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps)
    const { authentication } = nextProps.org.org.options;
    console.log("authentication ", authentication);
    const { email, google, github, gitlab } = authentication;
    this.setState({
          email,
          google,
          github,
          gitlab,
          error: nextProps.error.msg
        }, () => {
      console.log("updated state", this.state);
    });
  }

  render() {
    const { 
      email, 
      github, 
      gitlab, 
      google, 
      // error
     } = this.state
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
                  checked={email}
                  name="email"
                  onChange={this.toggleRadio}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Github"
                  checked={github}
                  name="github"
                  onChange={this.toggleRadio}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Google"
                  name="google"
                  checked={google}
                  onChange={this.toggleRadio}
                />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Gitlab"
                  name="gitlab"
                  checked={gitlab}
                  onChange={this.toggleRadio}
                />
              </Form.Group>
              <Form.Group>
                 {/* <p>{Boolean(error !== null) ? (
                  <span style={{ color: "red" }}>{error}</span>
                ) : null}</p> */}
                <Button className="save_btn mr-3" onClick={this.onSaveClick}>
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
// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  org: state.org
})
export default connect(mapStateToProps, { updateSettings, getOrgProfile })(OrgAuth);