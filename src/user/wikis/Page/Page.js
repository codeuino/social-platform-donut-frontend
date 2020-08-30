import React from "react";
import "./Page.scss";
import Moment from 'react-moment'
import History from "../History/History";
import ReactMarkdown from "react-markdown";
import Button from "react-bootstrap/Button";
import HistoryIcon from "@material-ui/icons/History";
import EditButton from "@material-ui/icons/EditOutlined";
import NewPageButton from "@material-ui/icons/DescriptionOutlined";

const Page = (props) => {
  const {
    isAdmin,
    allWikis,
    historyMode,
    currentPage,
    viewHistory,
    handleEditorMode,
    handleViewHistory,
    handleViewHistoryItem,
  } = props;
  return (
    <div className="page">
      <div className="page-header">
        {isAdmin && (
          <div className="wikis-top-controls">
            <Button
              variant="light"
              disabled={historyMode}
              onClick={() => handleEditorMode()}
            >
              <EditButton />
              Edit
            </Button>
            <Button
              variant="primary"
              onClick={() => handleEditorMode(true, false)}
            >
              <NewPageButton />
              New Page
            </Button>
          </div>
        )}
        <h1>{allWikis[currentPage].title}</h1>
        <div className="last-edited">
          <span>
            Last Edited by {allWikis[currentPage]?.history[0]?.user?.login} at{" "}
            <Moment format="DD MMM YYYY">{allWikis[currentPage]?.history[0]?.created_at}</Moment>
          </span>
          <Button variant="light" onClick={handleViewHistory}>
            <HistoryIcon />
            <span>History</span>
          </Button>
        </div>
      </div>
      {!viewHistory && <ReactMarkdown source={allWikis[currentPage].content} />}
      {viewHistory && (
        <History view={handleViewHistoryItem} page={allWikis[currentPage]} />
      )}
    </div>
  );
};

export default Page;
