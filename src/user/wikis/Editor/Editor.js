import React, { Component } from "react";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CancelButton from "@material-ui/icons/ClearOutlined";
import SaveButton from "@material-ui/icons/SaveOutlined";
import "react-mde/lib/styles/css/react-mde-all.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Showdown from "showdown";
import ReactMde from "react-mde";
import "./Editor.scss";

class Editor extends Component {
  constructor(props) {
    super(props);
    const { page } = this.props;
    this.state = {
      comments: "",
      selectedTab: "write",
      title: page?.title,
      content: page?.content,
    };
  }

  handleSave = () => {
    const { title, content, comments } = this.state;
    const { page, newPage, sidebar, save } = this.props;
    save(
      {
        title,
        content,
        comments,
        history: page?.history,
      },
      newPage,
      sidebar
    );
  };

  setContent = (content) => this.setState({ content });

  setTitle = (evt) => this.setState({ title: evt.target.value });

  setSelectedTab = (selectedTab) => this.setState({ selectedTab });

  setComments = (evt) => this.setState({ comments: evt.target.value });

  render() {
    const converter = new Showdown.Converter({
      tables: true,
      tasklists: true,
      strikethrough: true,
      simplifiedAutoLink: true,
    });
    const { title, content, selectedTab, comments } = this.state;
    const { deletePage, sidebar, newPage, page, cancel } = this.props;
    return (
      <div className="wiki-editor">
        <div className="wikis-top-controls">
          <Button
            variant="outline-danger"
            onClick={deletePage}
            disabled={sidebar || newPage || page.title === "Home"}
          >
            <span className="vc">
              <DeleteOutlinedIcon />
              Delete
            </span>
          </Button>
          <Button onClick={cancel} variant="light">
            <span className="vc">
              <CancelButton />
              Cancel
            </span>
          </Button>
        </div>
        <Form>
          <Form.Label className="field-title">Page Title</Form.Label>
          <Form.Control
            as="input"
            name="pageTitle"
            className="searchbar"
            value={title}
            onChange={this.setTitle}
            readOnly={!newPage}
          />
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
        <Form>
          <Form.Label className="field-title">Comments</Form.Label>
          <Form.Control
            as="input"
            name="comments"
            className="searchbar"
            value={comments}
            onChange={this.setComments}
          />
        </Form>
        <div className="wikis-top-controls">
          <Button variant="primary" onClick={this.handleSave}>
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
