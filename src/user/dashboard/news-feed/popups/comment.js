import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { connect } from 'react-redux';
import { createComment, deleteComment } from '../../../../actions/commentAction'
import "./comment.scss";
// import comments from "../../../../jsonData/comments";
import profile_img from '../../../../assets/svgs/profile-icon.svg'
import { MdDelete } from "react-icons/md";
import { checkDeleteRights } from '../../../dashboard/utils/checkDeleteRights'

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      allComments: [],
      postId: '',
      userId: '',
      count: 0
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onPost = (e) => {
    e.preventDefault();
    const { content, postId } = this.state;
    const commentInfo = {
      content: content
    }
    this.props.createComment(postId, commentInfo)
    console.log('submitting comment ', content, postId);
    this.setState({ content: " "})
    this.props.onHide()
  }

  onDelete = (commentId) => {
    console.log('deleting comment ', commentId)
    this.props.deleteComment(commentId)
  }

  componentDidMount() {
     const userId = JSON.stringify(localStorage.getItem("userId"));
     console.log("checking rights ", userId);
     this.setState({ userId: userId })
  }

  componentWillReceiveProps(nextProps) {
    console.log('comment state', nextProps)
    const { postId, comment } = nextProps
    this.setState({ postId: postId, allComments: comment?.allComments }, () => {
      console.log('updated comment state ', this.state)
    })
  }

  render() {
    const { show, onHide } = this.props
    const { allComments, content } = this.state
    var all_comments = allComments.map((comment) => (
      <Row className="user_comment" id={comment._id}>
        <Col md={2}>
          <img class="photo" src={profile_img || comment.userId?.image } alt="I"></img>
        </Col>
        <Col md={10}>
          <div className="contain">
            <p className="user">
              {comment?.userId?.name?.firstName + " " + comment?.userId?.name?.lastName || "User name"}</p>
            <p className="comment">
              {comment.content || "Comment content"}
              {checkDeleteRights(comment.userId?._id) 
                ? (<MdDelete size={20} className="delete__icon" onClick={this.onDelete.bind(this, comment._id)}
              />) 
                : null}
            </p>
          </div>
        </Col>
      </Row>
    ));

    return (
      <Modal
        show={show}
        onHide={onHide}
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
                  name="content"
                  value={content}
                  onChange={this.onChange}
                  placeholder="Write your mind here...."
                  size="sm"
                />
              </Row>

              <div className="form-footer">
                <Button
                  onClick={this.onPost}
                  type="submit"
                  className="savebtn"
                >
                  Post
                </Button>
              </div>
            </Form>
            <div className="about">Other people who commented</div>
            {Boolean(allComments?.length > 0) ? all_comments : "Be the first to comment!"}
          </Modal.Body>
        </div>
      </Modal>
    );
  }
}

// map state to props 
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  comment: state.comment,
  post: state.post
})

export default connect(mapStateToProps, {createComment, deleteComment })(Comment);
