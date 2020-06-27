import React, { Component } from "react";
import { Button, Form, Badge } from "react-bootstrap";
import "./EditorContent.scss";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import { withRouter } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StyledDropzone from "./DropZone";
import { Link } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

//Separately importing styles related to the markdown editor
import "./index.css";

const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

class EditorContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentText: "",
      lastText: "",

      newProposal: false,

      //hard coding values for demo
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRjYjE4ZjIxNWRhNzRjMThkM2YyNzQiLCJpYXQiOjE1OTE1MjE2Nzl9.q3g5Ah_rtjPIrH7z183fVmUBTv_A4OjEoL673zeG250",
      userId: "5edcb18f215da74c18d3f274",

      proposalTitle: "",
      proposalId: "",
      markdownString: "",
      proposalDescription: "",

      startSave: false,
      isSaving: false,
      lastSaved: new Date().toTimeString().substring(0, 8),
    };
  }

  componentDidMount() {
    //This means proposal is previosuly saved
    if (this.props.location.state.proposalId !== "new") {
      let idVar = setInterval(this.saveProposal, 20000);
      this.setState(
        {
          idVar: idVar,
          proposalId: this.props.location.state.proposalId,
        },
        () => {
          this.getData();
        }
      );
    }
    //New proposal
    else {
      this.setState({
        newProposal: true,
      });
    }
  }

  //Obtain proposal data from the server
  getData = () => {
    fetch("http://localhost:5000/proposal/" + this.state.proposalId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          proposalTitle: resData.proposal.title,
          markdownString: resData.proposal.content,
          proposalDescription: resData.proposal.proposalDescription,
          lastText: resData.proposal.content,
          currentText: resData.proposal.content,
          startSave: true,
        });
      });
  };

  //Update the content of the proposal
  saveProposal = () => {
    let { lastText, currentText } = this.state;

    if (lastText !== currentText) {
      this.setState({ isSaving: true });
      setTimeout(() => {
        fetch(`http://localhost:5000/proposal/${this.state.proposalId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.state.token,
          },
          body: JSON.stringify({
            title: this.state.proposalTitle,
            description: this.state.proposalDescription,
            content: this.state.currentText,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((resData) => {
            this.setState({
              lastText: currentText,
              isSaving: false,
              lastSaved: new Date().toTimeString().substring(0, 8),
            });
          });
      }, 2000);
    }
  };

  createProposal = () => {
    this.setState({ isSaving: true });
    setTimeout(() => {
      fetch("http://localhost:5000/proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.state.token,
        },
        body: JSON.stringify({
          title: this.state.proposalTitle,
          content: this.state.currentText,
          proposalStatus: "DRAFT",
          creator: this.state.userId,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          this.setState(
            {
              newProposal: false,
              proposalId: resData.proposal._id,
              isSaving: false,
              lastSaved: new Date().toTimeString().substring(0, 8),
            },
            () => {
              toast.success("Proposal Drafted Successfully!");
              let idVar = setInterval(this.saveProposal, 20000);
              this.setState({
                idVar: idVar,
                startSave: true,
              });
            }
          );
        });
    }, 2000);
  };

  submitProposal = () => {
    fetch("http://localhost:5000/proposal/change/" + this.state.proposalId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.token,
      },
      body: JSON.stringify({
        proposalStatus: "SUBMITTED",
      }),
    }).then((res) => {
      setTimeout(() => {
        this.props.history.push("/proposal");
      }, 3000);
      toast.success(
        "Proposal Successfully Submitted! Redirecting to dashboard"
      );
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      draftEnabled: true,
      currentText: html,
    });
  };

  handleDraftClick = () => {
    if (this.state.newProposal) {
      this.createProposal();
    }
  };

  onSubmitHandler = () => {
    this.submitProposal();
  };

  handleChange = (evt) => {
    const value = evt.target.value;

    this.setState({
      ...this.state,
      [evt.target.name]: value,
    });
  };

  handleDeleteProposal = () => {
    fetch("http://localhost:5000/proposal/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.token,
      },
      body: JSON.stringify({
        proposalId: this.state.proposalId,
      }),
    }).then((res) => {
      setTimeout(() => {
        this.props.history.push("/proposal");
      }, 3000);
      toast.error("Proposal Deleted Successfully. Redirecting to dashboard");
    });
  };

  componentWillUnmount() {
    clearInterval(this.state.idVar);
  }
  handleTinyEditorChange = (content, editor) => {
    this.setState({
      draftEnabled: true,
      currentText: content,
    });
  };

  render() {
    return (
      <div className="editor-content">
        <div className="editor-toppanel">
          <div className="editor-title">
            <span className="title-text">Write your Proposal</span>
            <div className="form-container">
              <Form>
                <Form.Label>Proposal Title</Form.Label>
                <Form.Control
                  as="input"
                  name="proposalTitle"
                  className="searchbar"
                  onChange={this.handleChange}
                  value={this.state.proposalTitle}
                />
                <Form.Label>Short Description</Form.Label>
                <Form.Control
                  name="proposalDescription"
                  as="textarea"
                  className="searchbar"
                  onChange={this.handleChange}
                  value={this.state.proposalDescription}
                />
              </Form>
            </div>
          </div>
          <div className="editor-buttons">
            {this.state.newProposal ? (
              <Button
                variant="primary"
                className="option-btn"
                size="sm"
                onClick={this.handleDraftClick}
              >
                <span className="option-text">Save Draft</span>
              </Button>
            ) : (
              <React.Fragment>
                <Button
                  variant="primary"
                  className="option-btn"
                  size="sm"
                  onClick={this.handleDeleteProposal}
                >
                  <span className="option-text">Delete Proposal</span>
                </Button>
                <Link to="/proposal">
                  <Button variant="primary" className="option-btn" size="sm">
                    <span className="option-text">Save and Exit</span>
                  </Button>
                </Link>
              </React.Fragment>
            )}
            <Button variant="primary" className="option-btn" size="sm">
              <span className="option-text">Send For Review</span>
            </Button>
            <Button
              active
              variant="primary"
              className="option-btn"
              size="sm"
              active
              onClick={this.onSubmitHandler}
            >
              <span className="option-text">Submit</span>
            </Button>
            <div>
              {!this.state.newProposal ? (
                <StyledDropzone
                  idContent={this.props.location.state.proposalId}
                  token={this.state.token}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="proposal-bottompanel">
          <Editor
            apiKey="lvp9xf6bvvm3nkaupm67ffzf50ve8femuaztgg7rkgkmsws3"
            value={this.state.markdownString}
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
              height: "100%",
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
            onEditorChange={this.handleTinyEditorChange}
          />
        </div>
        {this.state.startSave ? (
          <div className="save-container">
            {this.state.isSaving ? (
              <div className="container-outer">
                <div className="save-spinner">
                  <BeatLoader
                    size={10}
                    color={"#123abc"}
                    loading={this.state.isSaving}
                  ></BeatLoader>
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontWeight: "400",
                    display: "inline-block",
                  }}
                >
                  Saving
                </div>
              </div>
            ) : (
              <div
                style={{
                  margin: "10px",
                  order: 4,
                  fontFamily: "Inter",
                  fontSize: "12px",
                  fontWeight: "400",
                  display: "inline-block",
                }}
              >
                Last saved at {this.state.lastSaved}
              </div>
            )}
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <ToastContainer position="bottom-right" />
      </div>
    );
  }
}

export default withRouter(EditorContent);
