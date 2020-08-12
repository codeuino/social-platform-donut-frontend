import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Col, Tabs, Tab } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatePost } from "../../../../actions/postAction";
import { Editor } from "@tinymce/tinymce-react";
import showdown from "showdown";
import { FaPen, FaEye } from "react-icons/fa";

const EditPostModal = (props) => {
  const [content, setContent] = useState("");
  const [type, changeType] = useState("Write");
  const [postInfo, setPostInfo] = useState({});

  let converter = new showdown.Converter();

  const handleEditPostClick = () => {
    let postId = postInfo._id;
    let postContent = {
      content: content,
    };

    props.updatePost(postId, postContent);
    props.handleClose("edit");
  };

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  const handleEditorClose = () => {
    setContent("");
    props.handleClose("edit");
  };

  let handleClick = (atrb) => () => {
    console.log("attr ", atrb);
    changeType(atrb);
  };

  useEffect(() => {
    console.log("useEffect from edit-post ", props);
    setPostInfo(props?.postInfo);
    setContent(props?.postInfo?.content);
  }, [props.postInfo]);

  return (
    <Modal
      show={props.show}
      onHide={handleEditorClose}
      animation={true}
      className="modal"
      centered
      size="lg"
    >
      <Modal.Header closeButton className="modal__header">
        <Modal.Title className="modal__title" style={props.borderStyle}>
          <div className="modal__main-title">Edit Post</div>
          <div className="modal__mini-title">POST DETAILS</div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal__body" style={props.borderStyle}>
        <div className="tabs__container">
          <span className="nav__tab container" style={{ width: "100%" }}>
            <ul className="nav__list__container">
              <li
                className={
                  type === "Write"
                    ? "nav__single__tab selected"
                    : "nav__single__tab"
                }
                onClick={handleClick("Write")}
              >
                <FaPen className="tab__icon" />
                Write
              </li>
              <li
                className={
                  type === "Preview"
                    ? "nav__single__tab selected"
                    : "nav__single__tab"
                }
                onClick={handleClick("Preview")}
              >
                <FaEye className="tab__icon" />
                Preview
              </li>
            </ul>
          </span>
        </div>
        {type === "Write" ? (
          <Form className="modal__form" style={{ marginTop: "-20px" }}>
            <Form.Row className="modal__row">
              <Form.Group
                as={Col}
                controlId="formGridEmail"
                className="modal__group"
              >
                <Editor
                  value={postInfo?.content}
                  apiKey="lvp9xf6bvvm3nkaupm67ffzf50ve8femuaztgg7rkgkmsws3"
                  initialValue="Write a post..."
                  init={{
                    height: 250,
                    width: "100%",
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                      "textpattern",
                    ],
                    textpattern_patterns: [
                      { start: "#", format: "h1" },
                      { start: "##", format: "h2" },
                      { start: "###", format: "h3" },
                      { start: "####", format: "h4" },
                      { start: "#####", format: "h5" },
                      { start: "######", format: "h6" },
                      { start: "* ", cmd: "InsertUnorderedList" },
                      { start: "- ", cmd: "InsertUnorderedList" },
                      {
                        start: "1. ",
                        cmd: "InsertOrderedList",
                        value: { "list-style-type": "decimal" },
                      },
                      {
                        start: "1) ",
                        cmd: "InsertOrderedList",
                        value: { "list-style-type": "decimal" },
                      },
                      {
                        start: "a. ",
                        cmd: "InsertOrderedList",
                        value: { "list-style-type": "lower-alpha" },
                      },
                      {
                        start: "a) ",
                        cmd: "InsertOrderedList",
                        value: { "list-style-type": "lower-alpha" },
                      },
                      {
                        start: "i. ",
                        cmd: "InsertOrderedList",
                        value: { "list-style-type": "lower-roman" },
                      },
                      {
                        start: "i) ",
                        cmd: "InsertOrderedList",
                        value: { "list-style-type": "lower-roman" },
                      },
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                  }}
                  onEditorChange={handleEditorChange}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        ) : (
          <></>
        )}
        {type === "Preview" ? (
          <Form className="modal__form" style={{ marginTop: "-20px" }}>
            <Form.Row className="modal__row">
              <Form.Group
                as={Col}
                controlId="formGridEmail"
                className="modal__group"
              >
                <Editor
                  disabled={true}
                  value={converter.makeHtml(content)}
                  apiKey="lvp9xf6bvvm3nkaupm67ffzf50ve8femuaztgg7rkgkmsws3"
                  init={{
                    height: 250,
                    width: "100%",
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar: false,
                  }}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        ) : (
          <></>
        )}
      </Modal.Body>

      <div className="modal__buttons">
        <Button onClick={() => handleEditPostClick()} className="modal__save">
          <span className="modal__buttontext">Save</span>
        </Button>
        <Button
          onClick={() => props.handleClose("edit")}
          className="modal__cancel"
        >
          <span className="modal__buttontext">Cancel</span>
        </Button>
      </div>
    </Modal>
  );
};

EditPostModal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  style: PropTypes.object,
};

// map state to props
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, { updatePost })(EditPostModal);
