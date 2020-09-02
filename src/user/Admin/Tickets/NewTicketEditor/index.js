import React, { Component } from "react";
import CancelButton from "@material-ui/icons/ClearOutlined";
import SaveButton from "@material-ui/icons/SaveOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-mde/lib/styles/css/react-mde-all.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Showdown from "showdown";
import ReactMde from "react-mde";
import "./Editor.scss";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "write",
      title: "",
      content: "",
      shortDescription: "",
    };
  }

    // handleSave = () => {
    //   const { title, content, shortDescription } = this.state;
    //   const { save } = this.props;
    //   save(
    //     {
    //       title,
    //       content,
    //       shortDescription,
    //       status: "OPEN"
    //     }
    //   );
    // };

  setContent = (content) => this.setState({ content });

  setTitle = (evt) => this.setState({ title: evt.target.value });

  setSelectedTab = (selectedTab) => this.setState({ selectedTab });

  setShortDescription = (evt) => {
    const value = evt.target.value;
    this.setState({ shortDescription: value });
  };

  render() {
    const converter = new Showdown.Converter({
      tables: true,
      tasklists: true,
      strikethrough: true,
      simplifiedAutoLink: true,
    });
    const { title, content, selectedTab } = this.state;
    const { cancel } = this.props;
    return (
      <div className="new-ticket-editor">
        <div className="top-controls">
          <Button onClick={cancel} variant="light">
            <span className="vc">
              <CancelButton />
              Cancel
            </span>
          </Button>
        </div>
        <Form>
          <Form.Label className="field-title">Title</Form.Label>
          <Form.Control
            as="input"
            name="ticketTitle"
            className="searchbar"
            value={title}
            onChange={this.setTitle}
            maxlength="50"
            isInvalid={this.state.shortDescription.length >= 50}
          />
        </Form>
        <Form>
          <Form.Label className="field-title">Description</Form.Label>
          <Form.Control
            as="textarea"
            name="ticketDescription"
            maxlength="100"
            className="searchbar"
            value={this.state.shortDescription}
            onChange={this.setShortDescription}
            isInvalid={this.state.shortDescription.length >= 100}
          />
        </Form>
        <Form>
        </Form>
        <ReactMde
          onChange={this.setContent}
          value={content}
          onTabChange={this.setSelectedTab}
          selectedTab={selectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
        <div className="top-controls">
          <Button
            // onClick={this.handleSave}
            variant="primary"
          >
            <span className="vc">
              <SaveButton /> Save
            </span>
          </Button>
        </div>
      </div>
    );
  }
}

export default Editor;
