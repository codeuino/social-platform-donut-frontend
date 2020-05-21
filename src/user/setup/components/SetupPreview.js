import React, { Component } from 'react'
import { Form , Button } from 'react-bootstrap'
import DonutPreview from '../../../images/preview.jpg'
import Dashboard from '../../dashboard/dashboard'
import './preview.scss'

class SetupPreview extends Component {
  onFinish = (event) => {
    event.preventDefault();
    console.log('finishing the setup!');
    this.props.onFinish();
  }
  onPrev = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }
  
  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="setup_form_main_content">
        <div className="setup_header">
          <h3 className="community_text">Community Setup </h3>
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
                    type="text"
                    name="theme"
                    id="exampleText"
                    placeholder="Enter the hex code"
                    className="placeholder_text"
                    defaultValue={values.theme}
                    onChange={handleChange('theme')}
                    required={false}
                  />
                 </Form.Group>
              </Form>
            </div>
            <div className = "col-md-6 preview_section">
              <div>
                <p className="setup_title">PREVIEW</p>
                <img src={DonutPreview} alt="preview" className="dashboard_preview" />
                {/* <Dashboard className="dashboard_preview"/> */}
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
    )
  }
}
export default SetupPreview