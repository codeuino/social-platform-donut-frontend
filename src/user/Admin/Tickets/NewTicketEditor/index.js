import React, { Component } from "react";
import CancelButton from "@material-ui/icons/ClearOutlined";
import SaveButton from "@material-ui/icons/SaveOutlined";
import "react-mde/lib/styles/css/react-mde-all.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Showdown from "showdown";
import ReactMde from "react-mde";
import "./Editor.scss";
import { ToastContainer, toast } from "react-toastify";

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

  handleSave = () => {
    const { title, content, shortDescription } = this.state;
    const { save } = this.props;
    const newTicket = {
      title,
      content,
      shortDescription,
    };
    if (newTicket.shortDescription.length < 10) {
      toast.error("Short description should be atleast 10 characters long");
    } else if (newTicket.content.length < 10) {
      toast.error("Ticket content should be atleast 10 characters long");
    } else if (newTicket.title.length < 10) {
      toast.error("Title should be atleast 10 characters long");
    } else {
      save(newTicket);
    }
  };

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
            value={title}
            maxLength="50"
            required={true}
            name="ticketTitle"
            className="searchbar"
            onChange={this.setTitle}
            isInvalid={this.state.title.length >= 50}
          />
        </Form>
        <Form>
          <Form.Label className="field-title">Description</Form.Label>
          <Form.Control
            as="textarea"
            maxLength="100"
            className="searchbar"
            name="ticketDescription"
            value={this.state.shortDescription}
            onChange={this.setShortDescription}
            isInvalid={this.state.shortDescription.length >= 100}
          />
        </Form>
        <Form></Form>
        <ReactMde
          value={content}
          selectedTab={selectedTab}
          onChange={this.setContent}
          onTabChange={this.setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
        <div className="top-controls">
          <Button onClick={this.handleSave} variant="primary">
            <span className="vc">
              <SaveButton /> Save
            </span>
          </Button>
        </div>
        <ToastContainer
          draggable
          rtl={false}
          pauseOnHover
          closeOnClick
          autoClose={5000}
          pauseOnFocusLoss
          newestOnTop={false}
          position="top-right"
          hideProgressBar={false}
        />
      </div>
    );
  }
}

export default Editor;
