import React, { Component } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import '../../events/popups/popup.scss'
import { upVotePost, updatePost, deletePost } from '../../../actions/postAction'

class PostPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postContent: "",
      postId: "",
      upVotes: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps ', nextProps);
    const post = nextProps?.post?.singlePost
    this.setState({
      postContent: post?.content || "",
      postId: nextProps.postId || "",
      upVotes: post?.votes?.upVotes?.length || 0
    });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  updatePost = () => {
    const { postId, postContent } = this.state
    const obj = {
      content: postContent
    }
    this.props.updatePost(postId, obj)
    this.props.onHide();
  }

  deletePost = () => {
    const { postId } = this.state
    this.props.deletePost(postId)
    this.props.onHide();
  }

  render() {
    const { show, onHide, borderStyle  } = this.props
    const { postContent } = this.state
    return (
      <Modal
        show={show}
        onHide={onHide}
        className="modal"
        animation={true}
        centered
      >
        <Modal.Header closeButton className="modal__header" style={borderStyle}>
          <Modal.Title className="modal__title" style={borderStyle}>
            <div className="modal__main-title">Post Information</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal__body">
          <Form className="modal__form">
            <Form.Row className="modal__row">
              <Form.Group className="modal__group" as={Col}>
                <Form.Label className="modal__label">
                  Post content
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Post description"
                  name="postContent"
                  defaultValue={postContent}
                  onChange={this.onChange}
                  required={true}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <div className="modal__buttons">
          <Button onClick={this.updatePost} className="modal__save">
            <span className="modal__buttontext">Update</span>
          </Button>
          <Button className="modal__delete" onClick={this.deletePost}>
            <span className="modal__buttontext">Delete</span>
          </Button>
        </div>
      </Modal>
    )
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  post: state.post
})

export default connect(mapStateToProps, { updatePost, deletePost })(PostPopup);

