import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./ReadMe.scss";
import { updateProfile, getProfile } from "../../actions/usersAction";
import { connect } from "react-redux";
import ReadMeEditor from './ReadMeEditor'
import ReadMePreview from './ReadMePreview'

class ReadMe extends Component {
  constructor(props) {
    super(props);
    const  userProfile  = this.props.userProfile;
    const about = userProfile.info?.about;
    let longDescription = true;
    if (!about.hasOwnProperty("longDescription")) {
      longDescription = false;
    }

    this.state = {
      longDescription: true,
      displayEditor: false,
      currentText: "",
      firstName: userProfile.name?.firstName,
      lastName: userProfile.name?.lastName,
      website: about?.website,
      designation: about?.designation,
      longDesc: about?.longDescription,
      shortDesc: about?.shortDescription,
      location: about?.location,
      longDescription: longDescription,
    };
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
            <ReadMePreview longDesc={this.state.longDesc} />
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
            <ReadMeEditor longDesc={this.state.longDesc} onEditorChange={this.handleEditorChange}/>    
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
