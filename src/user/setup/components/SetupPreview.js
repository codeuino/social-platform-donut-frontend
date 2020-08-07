import React, { Component } from 'react'
import { Form , Button } from 'react-bootstrap'
import DonutPreview from '../../../assets/images/preview.jpg'
import UploadPreview from '../../../assets/images/upload.jpg'
import ShadowPreview from '../../../assets/images/shadowDonut.png'
import CommunityPreview from '../../../assets/images/community.png'
import './preview.scss'
let donutPreviewImage = DonutPreview

class SetupPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'aqua',
      error: ''
    }
  }

  onFinish = (event) => {
    event.preventDefault();
    console.log('finishing the setup!');
    // set theme in localStorage 
    localStorage.setItem('theme', JSON.stringify(this.state.color))
    this.props.onFinish();
  }
  
  onPrev = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }
  
  onChangeColor = (e) => {
    console.log('color changed ', e.target.value);
    console.log(this.props)
    this.setState({ color: e.target.value }, this.switchPreview(e.target.value))
  }
  
  switchPreview = (color) => {
    console.log('Color in switch preview ', color)
    switch(color) {
      case 'aqua': {
        donutPreviewImage = DonutPreview
        break;
      }
      case 'red': {
        donutPreviewImage = UploadPreview
        break;
      }
      case 'orange': {
        donutPreviewImage = CommunityPreview
        break;
      }
      case 'green' : {
        donutPreviewImage = ShadowPreview
        break;
      }
      default: {
        donutPreviewImage = DonutPreview
      }
    }
  }
  render() {
    const { values } = this.props;
    return (
      <div className="setup_form_main_content">
        <div className="setup_header">
          <h3 className="community_text">Community Setup </h3>
          {values.error ? <p style={{ color: "red" }}>{values.error}</p> : null}
          <p>2 / 2</p>
        </div>
        <div className="setup_content">
          <div className="row form_content">
            <div className="col-md-6">
              <Form>
                <p className="setup_title">THEME</p>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Default theme"
                    defaultChecked={true}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="label_text" className="label_text mt-0">
                    Community Color
                  </Form.Label>
                  <Form.Control
                    as="select"
                    onChange={this.onChangeColor}
                    style={{ color: this.state.color }}
                  >
                    <option value="aqua">
                      Blue
                    </option>
                    <option value="red" style={{ color: "red" }}>
                      Red
                    </option>
                    <option value="orange" style={{ color: "orange" }}>
                      Orange
                    </option>
                    <option value="green" style={{ color: "green" }}>
                      Green
                    </option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            <div className="col-md-6 preview_section">
              <div>
                <p className="setup_title">PREVIEW</p>
                <img
                  src={donutPreviewImage}
                  alt="preview"
                  className="dashboard_preview"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="switch_step">
          <Button className="finish_btn" onClick={this.onFinish}>
            Finish
          </Button>
          <Button className="prev_btn" onClick={this.onPrev}>
            Prev
          </Button>
        </div>
      </div>
    );
  }
}
export default SetupPreview;