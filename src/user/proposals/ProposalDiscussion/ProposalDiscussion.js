import React, { Component } from "react";
import "./ProposalDiscussion.scss";
import Navigation from "../../dashboard/navigation/navigation";
import DiscussionContent from "./DiscussionContent/DiscussionContent";

class ProposalDiscussion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Navigation dashboard={this.state.dashboard} />
        <div className="discussion">
          <div className="discussion__content">
            <DiscussionContent />
          </div>
        </div>
      </>
    );
  }
}

export default ProposalDiscussion;
