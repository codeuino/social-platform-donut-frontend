import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import EditButton from "@material-ui/icons/EditOutlined";
import SaveButton from "@material-ui/icons/SaveOutlined";
import BadgeElement from "../../TicketContent/BadgeElement";
import CancelButton from "@material-ui/icons/ClearOutlined";
import { saveTicketTitle } from "../../../../../utils/ticket";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: false,
      title: this.props.ticket.title,
    };
  }

  toggleEditor = () => {
    this.setState({
      editor: !this.state.editor,
    });
  };

  setTitle = (evt) => {
    this.setState({
      title: evt.target.value,
    });
  };

  handleSave = () => {
    this.setState({ editor: false }, saveTicketTitle.bind(this));
  };

  render() {
    const { editor, title } = this.state;
    const { ticket, handleBack, editsAllowed, deleteAllowed, deleteTicket } = this.props;
    return (
      <div className="discussion-title">
        <div className="back-icon" onClick={handleBack}>
          <FaArrowLeft className="fa-icon" />
        </div>
        <div className="ticket-title">
          {!editor && (
            <React.Fragment>
              <div style={{ display: "flex", alignItems: "center" }}>
                <BadgeElement ticketState={ticket.status} />
                <span style={{ marginLeft: "16px" }} className="title-text">
                  {ticket.title}
                  <span
                    style={{ color: "rgba(0,0,0,0.5)", marginLeft: "5px" }}
                  >{`#${ticket.number}`}</span>
                </span>
              </div>
              <div>
                {editsAllowed && (
                  <EditButton onClick={this.toggleEditor} />
                )}
                {deleteAllowed && (
                  <DeleteOutlineOutlinedIcon
                    onClick={() =>
                      deleteTicket(ticket._id)
                    }
                  />
                )}
              </div>
            </React.Fragment>
          )}
          {editor && (
            <Form style={{ display: "flex", width: "100%" }}>
              <Form.Control
                type="text"
                onChange={this.setTitle}
                value={title}
              />
              <Button
                variant="light"
                onClick={this.toggleEditor}
                style={{ display: "flex", margin: "0px 16px" }}
              >
                <CancelButton />
                Cancel
              </Button>
              <Button
                disabled={ticket.title === title}
                style={{ display: "flex" }}
              >
                <SaveButton onClick={this.handleSave} />
                Save
              </Button>
            </Form>
          )}
        </div>
      </div>
    );
  }
}

export default Title;
