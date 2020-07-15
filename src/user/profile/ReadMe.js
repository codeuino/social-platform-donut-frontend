import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./ReadMe.scss";
import { Editor } from "@tinymce/tinymce-react";
import { updateProfile, getProfile } from "../../actions/usersAction";
import { connect } from "react-redux";

class ReadMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longDescription: true,
      displayEditor: false,
      currentText: "",
      firstName: "",
      lastName: "",
      shortDesc: "",
      location: "",
      github: "",
      fb: "",
      linkedIn: "",
      designation: "",
      website: "",
      longDesc: "",
      canChangeName: "",
    };
  }

  componentDidMount() {
    this.props.getProfile();
  }

  componentWillReceiveProps(nextProps) {
    const { userProfile } = nextProps.user;
    const about = userProfile.info?.about;
    let longDescription = true;
    if (!about.hasOwnProperty("longDescription")) {
      longDescription = false;
    }

    this.setState({
      firstName: userProfile.name?.firstName,
      lastName: userProfile.name?.lastName,
      website: about?.website,
      designation: about?.designation,
      longDesc: about?.longDescription,
      shortDesc: about?.shortDescription,
      location: about?.location,
      longDescription: longDescription,
    });
  }

  handleCreateReadMe = () => {
    this.setState({
      displayEditor: true,
    });
  };

  handleEditorChange = (content, editor) => {
    this.setState({
      currentText: content,
    });
  };

  handleSave = () => {
    const {
      firstName,
      lastName,
      designation,
      location,
      website,
      shortDesc,
      currentText,
    } = this.state;
    const info = {
      name: {
        firstName,
        lastName,
      },
      info: {
        about: {
          shortDescription: shortDesc,
          longDescription: currentText,
          designation,
          location,
          website,
        },
      },
    };

    this.props.updateProfile(info);
    this.setState(
      {
        displayEditor: false,
      },
      () => {
        this.setState({ longDescription: true });
      }
    );
  };

  handleEdit = () => {
    this.setState(
      {
        longDescription: false,
      },
      () => {
        this.setState({
          displayEditor: true,
        });
      }
    );
  };

  render() {
    const { displayEditor, longDescription } = this.state;

    return (
      <div>
        {longDescription ? (
          <div className="editorContainer">
            <Card className="readmeCard" style={{ backgroundColor: "#E8F1FD" }}>
              <Card.Body>
                ReadMe available.
                <Button
                  variant="primary"
                  className="readmeCard__button"
                  onClick={this.handleEdit}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
            <Editor
              value={this.state.longDesc}
              disabled={true}
              apiKey="lvp9xf6bvvm3nkaupm67ffzf50ve8femuaztgg7rkgkmsws3"
              init={{
                height: "100%",
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
          </div>
        ) : displayEditor ? (
          <div className="editorContainer">
            <Card className="readmeCard" style={{ backgroundColor: "#E8F1FD" }}>
              <Card.Body>
                Editing ReadMe.
                <Button
                  variant="primary"
                  className="readmeCard__button"
                  onClick={this.handleSave}
                >
                  Save
                </Button>
              </Card.Body>
            </Card>
            <Editor
              value={this.state.longDesc}
              apiKey="lvp9xf6bvvm3nkaupm67ffzf50ve8femuaztgg7rkgkmsws3"
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
              onEditorChange={this.handleEditorChange}
            />
          </div>
        ) : (
          <Card className="readmeCard" style={{ backgroundColor: "#E8F1FD" }}>
            <Card.Body>
              There doesn't appear to be a read me for this profile.
              <Button
                variant="primary"
                className="readmeCard__button"
                onClick={this.handleCreateReadMe}
              >
                Create ReadMe
              </Button>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateProfile, getProfile })(ReadMe);
