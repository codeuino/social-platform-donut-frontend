import React, { Component } from "react";
import Navigation from "../../dashboard/navigation/navigation";
import EditorContent from "./EditorContent/EditorContent";
import "./ProposalEditor.scss";

class ProposalEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { sideBarOpen: true };
  }
  handleViewSidebar = () => {
    console.log(this.state.sideBarOpen);
    this.setState({ sideBarOpen: !this.state.sideBarOpen });
  };
  render() {
    var sideBarClass = this.state.sideBarOpen ? "sidebar-open" : "sidebar";
    return (
      <div className="editor">
        <div className={sideBarClass}>
          <Navigation dashboard={this.state.dashboard} />
        </div>
        <button
          onClick={this.handleViewSidebar}
          className="sidebar-toggle"
          style={
            sideBarClass === "sidebar-open"
              ? { marginLeft: "13vw" }
              : { marginLeft: 0 }
          }
        >
          <div />
          <div />
          <div />
        </button>
        <div className="editor__content">
          <EditorContent />
        </div>
      </div>
    );
  }
}

export default ProposalEditor;
