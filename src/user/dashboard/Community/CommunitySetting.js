import React, { Component } from 'react'
import { Modal, Button} from 'react-bootstrap'
import LeftNav from './LeftNav'
import './community.scss'
import OrgProfile from './components/OrgProfile';
import OrgPermission from './components/OrgPermission'
import OrgSetting from './components/OrgSettings'
import OrgAuth from './components/OrgAuth'

class CommunitySetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {
        profile: false,
        settings: false,
        permission: false,
        authentication: false
      }
    };
  }
  componentDidMount() {
    this.setState({ view: 'profile' })
  }
  changeOption = (name) => {
   const keys = Object.keys(this.state.option)
   let item = keys.filter(k => k === name)
   console.log('item ', item)
   this.setState({ option: { [name]: true }})
   this.setState({ view: name })
  }
  render() {
    const { view } = this.state;
    return (
      <Modal
        {...this.props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="modal-90w"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <p className="header_text">Community Settings</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="main_section">
            <div className="left_nav">
              <LeftNav
                data={{
                  option: this.state.option,
                  changeOption: this.changeOption.bind(this),
                }}
              />
            </div>
            <div className="right_section">
              {view === "profile" ? <OrgProfile /> : null}
              {view === "permission" ? <OrgPermission /> : null}
              {view === "settings" ? <OrgSetting /> : null}
              {view === "authentication" ? <OrgAuth /> : null}
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }
}
export default CommunitySetting;