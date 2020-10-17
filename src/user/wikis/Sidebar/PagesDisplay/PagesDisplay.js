import React, { Component } from "react";
import "./PagesDisplay.scss";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

class PagesDisplay extends Component {
  constructor(props) {
    super(props);
    const { pages } = this.props;
    this.state = {
      results: pages,
      allWikis: pages,
    };
  }
  changeResults = (evt) => {
    const { allWikis } = this.state;
    this.setState({
      results: allWikis.filter(
        (page) => page.title.indexOf(evt.target.value) !== -1
      ),
    });
  };
  render() {
    const { allWikis, results } = this.state;
    const { setView } = this.props;
    return (
      <div className="PagesDisplay">
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <span>
              Pages
              <span className="PagesDisplay-couter">{allWikis.length}</span>
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Form className="PagesDisplay-searchbar">
              <span className="form-search-icon">
                <SearchOutlinedIcon />
              </span>
              <Form.Control
                as="input"
                name="pageTitle"
                autoComplete="off"
                className="searchbar"
                onChange={this.changeResults}
              />
            </Form>
            {results.map((page, index) => (
              <Dropdown.Item key={index} onClick={() => setView(page.title)}>
                {page.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default PagesDisplay;
