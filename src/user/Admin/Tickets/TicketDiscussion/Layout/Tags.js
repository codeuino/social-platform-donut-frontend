import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import CancelButton from "@material-ui/icons/ClearOutlined";

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addTag = (evt) => {
    evt.preventDefault();
    this.props.addTag(evt.target[0].value);
    console.log(evt.target[0].value);
    evt.target[0].value = ""
  };
  render() {
    console.log(this.props.data);
    return (
      <Card className="info-card">
        <div className="info-title">
          <span>Tags</span>
        </div>
        <div className="info-details">
          <div className="data-element">
            <span className="data-desc">
              {this.props.data.map((ele, index) => (
                <Badge pill variant="info" style={{ fontSize: "13px", margin: "2px" }}>
                  <span style={{ verticalAlign: "middle" }}>{ele}</span>
                  <CancelButton onClick={() => this.props.removeTag(ele)}/>
                </Badge>
              ))}
            </span>
            <span className="data-desc">
              <Form
                onSubmit={this.addTag}
                style={{ display: "flex", marginTop: "10px" }}
              >
                <Form.Group>
                  <Form.Control type="text" placeholder="Tag Name" />
                </Form.Group>
                <Button variant="light" type="submit">
                  Add
                </Button>
              </Form>
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default Tags;
