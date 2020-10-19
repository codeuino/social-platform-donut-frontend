import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SaveButton from "@material-ui/icons/SaveOutlined";
import EditButton from "@material-ui/icons/EditOutlined";
import CancelButton from "@material-ui/icons/ClearOutlined";
import { saveTicketSummary } from '../../../../../utils/ticket';

class EditableCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      editor: false,
    };
  }

  toggleEditor = () => {
    this.setState({
      editor: !this.state.editor,
    });
  };

  setData = (evt) => {
    this.setState({ data: evt.target.value });
  };

  save = () => {
    this.setState({ editor: false }, saveTicketSummary.bind(this));
  };

  render() {
    const { editor, data } = this.state;
    return (
      <Card className="info-card">
        <div className="info-title">
          <span>{this.props.heading}</span>
          {!editor && this.props.editsAllowed && (
            <EditButton onClick={this.toggleEditor} />
          )}
          {editor && (
            <div className="buttons">
              <CancelButton
                style={{ marginRight: "10px" }}
                onClick={this.toggleEditor}
              />
              <Button
                disabled={this.props.data === data}
                variant="light"
                onClick={this.save}
              >
                <SaveButton />
              </Button>
            </div>
          )}
        </div>
        <div className="info-details">
          <div className="data-element">
            <span className="data-desc">
              {!editor && this.props.data}
              {editor && (
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    maxLength="100"
                    value={data}
                    onChange={this.setData}
                    isInvalid={data.length >= 100}
                  />
                </Form.Group>
              )}
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default EditableCard;
