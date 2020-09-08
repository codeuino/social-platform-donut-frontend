import React, { Component } from "react";

class TicketStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="news__feed__container">
        <div className="tabs__container" style={isTop ? navStyles : {}}>
          <span className="nav__tab container">
            <ul
              className="nav__list__container"
              style={isTop ? { marginBottom: "0px" } : {}}
            >
              <li
                className={
                  type === "All"
                    ? "nav__single__tab selected"
                    : "nav__single__tab"
                }
                onClick={handleClick("All")}
              >
                All
              </li>
              <li
                className={
                  type === "Post"
                    ? "nav__single__tab selected"
                    : "nav__single__tab"
                }
                onClick={handleClick("Post")}
              >
                Posts
              </li>
              <li
                className={
                  type === "Event"
                    ? "nav__single__tab selected"
                    : "nav__single__tab"
                }
                onClick={handleClick("Event")}
              >
                Events
              </li>
              <li
                className={
                  type === "Project"
                    ? "nav__single__tab selected"
                    : "nav__single__tab"
                }
                onClick={handleClick("Project")}
              >
                Projects
              </li>
            </ul>
          </span>
        </div>
        <div className="post">
          {Boolean(type !== "All") ? (
            content
          ) : (
            <>
              {postContent}
              {eventsContent}
              {projectsContent}
              <PostReactionModal
                show={showReactions}
                onHide={closeReactionsModal}
                votes={votes}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default TicketStatus;
