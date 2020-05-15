import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import "./comment.scss";

import comments from "../../../../jsonData/comments";
export class Comment extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const comment = this.state;

    console.log(comment);
  }
  render() {
    var all_comments = comments.map((comment) => (
      <Row className="user_comment" id={comment._id}>
        <Col md={2}>
          <img class="photo" src={comment.logo} alt="I"></img>
        </Col>
        <Col md={10}>
          <div className="contain">
            <p className="user">{comment.name}</p>
            <p className="comment">{comment.comment}</p>
          </div>
        </Col>
      </Row>
    ));

    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="container">
          <Modal.Header closeButton className="heading border border-0 p-0">
            <Modal.Title id="contained-modal-title-vcenter">
              <div className="title">Comment</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.onSubmit}>
              <Row className="form-content">
                <Form.Control
                  className="form-input"
                  as="textarea"
                  name="comment"
                  value={this.state.comment}
                  onChange={this.onChange}
                  placeholder="Write your mind here...."
                  size="sm"
                />
              </Row>

              <div className="form-footer">
                <Button
                  onClick={this.props.onHide}
                  type="submit"
                  className="savebtn"
                >
                  Post
                </Button>
              </div>
            </Form>
            <div className="about">Other people who commented</div>
            {all_comments}
          </Modal.Body>
        </div>
      </Modal>
    );
  }
}
