import React, { Component } from "react";
import Navigation from "../../dashboard/navigation/navigation";
import EditorContent from "./EditorContent/EditorContent";
import "./ProposalEditor.scss";

class ProposalEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Navigation dashboard={this.state.dashboard} />
        <div className="editor">
          <div className="editor__content">
            <EditorContent />
          </div>
        </div>
      </>
    );
  }
}

export default ProposalEditor;
