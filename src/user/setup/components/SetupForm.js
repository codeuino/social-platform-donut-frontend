import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import './setupform.scss'

class SetupForm extends Component {
  onNext = (e) => {
    e.preventDefault();
    console.log('Going from step 1 to step 2');
    this.props.nextStep();
  }

  onPrev = (e) => {
    e.preventDefault();
    console.log('Going from step 1 to step 0');
    this.props.prevStep();
  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="setup_form_main_content">
        <div className="setup_header">
          <h3 className="community_text">Community Setup </h3>
          <p>1 / 2</p>
        </div>
        <div className="setup_content">
          <div className="row form_content">
            <div className="col-md-6">
              <Form>
                <p className="setup_title">ABOUT</p>
                 <Form.Group>
                   <Form.Label htmlFor="label_text" className="label_text mt-0">
                    Community Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="communityName"
                    id="exampleText"
                    placeholder="Community name"
                    className="placeholder_text"
                    defaultValue={values.communityName}
                    onChange={handleChange('communityName')}
                    required={true}
                  />
                 </Form.Group>
                 <Form.Group>
                   <Form.Label htmlFor="label_text" className="label_text mt-0">
                    Short Description
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="shortDesc"
                    id="exampleText"
                    placeholder="Short description"
                    className="placeholder_text"
                    defaultValue={values.shortDesc}
                    onChange={handleChange('shortDesc')}
                    required={true}
                  />
                 </Form.Group>
                 <Form.Group>
                   <Form.Label htmlFor="label_text" className="label_text mt-0">
                    Long Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="longDesc"
                    id="exampleText"
                    placeholder="Long description"
                    className="placeholder_text"
                    defaultValue={values.longDesc}
                    onChange={handleChange('longDesc')}
                    required={true}
                    rows="3"
                  />
                 </Form.Group>
              </Form>
            </div>
            <div className="col-md-6">
              <Form>
                <p className="setup_title">LINKS</p>
                <Form.Group>
                   <Form.Label htmlFor="label_text" className="label_text mt-0">
                    Website Link
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="website"
                    id="exampleText"
                    placeholder="Website link"
                    className="placeholder_text"
                    defaultValue={values.website}
                    onChange={handleChange('website')}
                    required={true}
                  />
                </Form.Group>
                 <Form.Group>
                   <Form.Label htmlFor="label_text" className="label_text mt-0">
                    Facebook link
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="fb"
                    id="exampleText"
                    placeholder="Facebook link"
                    className="placeholder_text"
                    defaultValue={values.fb}
                    onChange={handleChange('fb')}
                    required={true}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="label_text" className="label_text mt-0">
                    Github link
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="github"
                    id="exampleText"
                    placeholder="Github link"
                    className="placeholder_text"
                    defaultValue={values.github}
                    onChange={handleChange('github')}
                    required={true}
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
        <div className="switch_step">
          <Button className="next_btn" onClick={this.onNext}>
            Next
          </Button>
          <Button className="prev_btn" onClick={this.onPrev}>
            Prev
          </Button>
        </div>
      </div>
    );
  }
}
export default SetupForm;