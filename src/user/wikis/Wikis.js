import React, { Component } from "react";
import { connect } from "react-redux";
import "./wikis.scss";
import axios from 'axios';
import Page from "./Page/Page";
import Layout from "./Layout/Layout";
import Editor from "./Editor/Editor";
import Sidebar from "./Sidebar/Sidebar";
import { BASE_URL } from "../../actions/baseApi";
import { getWikis } from "../../actions/wikisAction";
import { ToastContainer, toast } from "react-toastify";
import { fetchPage, saveChangesToPage, deletePageRequest, viewPageFromHistory } from "../../utils/wikis";

class Wikis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wikis: true,
      allWikis: [],
      currentPage: 1,
      editorMode: false,
      historyMode: false,
      viewHistory: false,
      newPageEditor: false,
      sidebarEditor: false,
      spinner: "Loading...",
    };
    this.axiosCancel = axios.CancelToken.source();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      allWikis: nextProps.wikis.wikis,
      spinner: "",
    });
  }

  componentDidMount() {
    const { getWikis } = this.props
    setTimeout(() => {
      getWikis();
    });
  }

  handleEditorMode = (newPage = false, sidebar = false) => {
    this.setState({
      editorMode: true,
      newPageEditor: !!newPage,
      sidebarEditor: !!sidebar,
    });
  };

  cancelEditor = () => {
    this.setState({
      editorMode: false,
      newPageEditor: false,
    });
  };

  setView = async (page, ref) => {
    let pos = 0;
    const { allWikis } = this.state
    allWikis.forEach((ele, index) => {
      if (ele.title === page) pos = index;
    });
    if (pos) {
      this.setState(
        {
          spinner: "Switing Page.... ",
        },
        fetchPage.bind(this, page, pos)
      );
    } else {
      this.handleEditorMode(true);
    }
  };

  handleSave = async (page, newPage = false, sidebar = false) => {
    const { allWikis } = this.state;
    if (!newPage && !sidebar) {
      this.setState(
        {
          spinner: "Saving... ",
        },
        saveChangesToPage.bind(this, page, newPage, sidebar)
      );
    } else if (sidebar) {
      this.setState(
        {
          spinner: "Saving...",
        },
        saveChangesToPage.bind(this, page, newPage, sidebar)
      );
    } else {
      if (allWikis.filter((ele) => ele.title === page.title).length === 0) {
        this.setState(
          {
            spinner: "Creating New Page...",
          },
          saveChangesToPage.bind(this, page, newPage, sidebar)
        );
      } else {
        toast.error("Page with that title already exsits!");
      }
    }
  };

  deletePage = async () => {
    const { allWikis, currentPage } = this.state;
    this.setState(
      {
        spinner: "Deleting Page...",
      },
      deletePageRequest.bind(this, allWikis, currentPage)
    );
  };

  handleViewHistory = () => {
    this.setState({
      historyMode: true,
      viewHistory: true,
    });
  };

  oauthCheck = async () => {
    try {
      this.setState({
        spinner: "Connecting to GitHub..."
      }, async ()=>{
        const check = (await axios.get(`${BASE_URL}/wikis/oauth-check`)).data
        if (check.redirect){
          window.location = check.redirect_url;
        } else {
          this.setState({
            spinner: ""
          })
        }
      })
    } catch (err) {
      toast.error('Oops! Something went wrong!, could not connect!')
      console.log(err.message);
    }
  };

  handleViewHistoryItem = async (commit) => {
    const { allWikis, currentPage } = this.state
    const title = allWikis[currentPage].title;
    this.setState(
      {
        spinner: "Time Travelling...",
      },
      viewPageFromHistory.bind(this, title, commit)
    );
  };

  render() {
    const {
      wikis,
      spinner,
      allWikis,
      editorMode,
      viewHistory,
      historyMode,
      currentPage,
      sidebarEditor,
      newPageEditor,
    } = this.state;
    const isAdmin = localStorage.getItem("admin");

    return (
      <div className="wikis">
        <Layout
          isAdmin={isAdmin}
          allWikis={allWikis}
          wikis={wikis}
          spinner={spinner}
          oauthCheck={this.oauthCheck}
        >
          <React.Fragment>
            {!editorMode && allWikis.length !== 0 && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Page
                  isAdmin={isAdmin}
                  allWikis={allWikis}
                  currentPage={currentPage}
                  viewHistory={viewHistory}
                  historyMode={historyMode}
                  handleEditorMode={this.handleEditorMode}
                  handleViewHistory={this.handleViewHistory}
                  handleViewHistoryItem={this.handleViewHistoryItem}
                />
                <Sidebar
                  pages={allWikis}
                  isAdmin={isAdmin}
                  setView={this.setView}
                  edit={this.handleEditorMode}
                  content={allWikis[0].content}
                />
              </div>
            )}
            {editorMode && (
              <Editor
                save={this.handleSave}
                newPage={newPageEditor}
                sidebar={sidebarEditor}
                deletePage={this.deletePage}
                cancel={this.cancelEditor}
                page={
                  newPageEditor
                    ? {}
                    : sidebarEditor
                    ? allWikis[0]
                    : allWikis[currentPage]
                }
              />
            )}
            <ToastContainer
              draggable
              rtl={false}
              pauseOnHover
              closeOnClick
              pauseOnFocusLoss
              autoClose={5000}
              position="top-right"
              newestOnTop={false}
              hideProgressBar={false}
            />
          </React.Fragment>
        </Layout>
      </div>
    );
  }

  componentWillUnmount() {
    this.axiosCancel.cancel("axios request cancelled - Component Unmounted");
  }
}

// map state to props
const mapStateToProps = (state) => ({
  wikis: state.wikis,
});

export default connect(mapStateToProps, { getWikis })(Wikis);
