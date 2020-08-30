import axios from "axios";
import { BASE_URL } from "../actions/baseApi";

export const fetchPage = async function (page, pos) {
  try {
    console.log(this.state);
    let wikis = (
      await axios.get(`${BASE_URL}/wikis/pages?title=${page}`, {
        cancelToken: this.axiosCancel.token,
      })
    ).data.wikis;
    wikis.forEach((ele, index) => {
      if (ele.title === page.title) pos = index;
    });
    this.setState({
      spinner: "",
      allWikis: wikis,
      currentPage: pos,
      viewHistory: false,
      historyMode: false,
    });
    return { page, pos };
  } catch (err) {
    console.log(err.message);
  }
};

export const saveChangesToPage = async function (page, newPage, sidebar) {
  const endpoint = `${BASE_URL}/wikis/pages`;
  const findIndexOfPage = (arr, page) => {
    let pos = 0;
    arr.forEach((ele, index) => {
      if (ele.title === page.title) pos = index;
    });
    return pos;
  };
  const data = {
    title: page.title,
    content: page.content,
    comments: page.comments,
  };
  try {
    let wikis = null;
    if (newPage) {
      wikis = (
        await axios.post(endpoint, data, {
          cancelToken: this.axiosCancel.token,
        })
      ).data.wikis;
    } else {
      wikis = (
        await axios.put(endpoint, data, {
          cancelToken: this.axiosCancel.token,
        })
      ).data.wikis;
    }
    const index = findIndexOfPage(wikis, page);
    let newState = {};
    if (!newPage && !sidebar) {
      newState = {
        spinner: "",
        editorMode: false,
        currentPage: index,
        allWikis: [...wikis],
      };
    } else if (sidebar) {
      newState = {
        spinner: "",
        currentPage: 1,
        editorMode: false,
        allWikis: [...wikis],
        sidebarEditor: false,
      };
    } else {
      newState = {
        spinner: "",
        editorMode: false,
        currentPage: index,
        allWikis: [...wikis],
        newPageEditor: false,
      };
    }
    this.setState(newState);
  } catch (err) {
    console.log(err.message);
  }
};

export const deletePageRequest = async function (allWikis, currentPage) {
  try {
    const wikis = (
      await axios.delete(`${BASE_URL}/wikis/pages`, {
        data: { title: allWikis[currentPage].title },
        cancelToken: this.axiosCancel.token,
      })
    ).data.wikis;
    this.setState({
      spinner: "",
      currentPage: 1,
      editorMode: false,
      allWikis: [...wikis],
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const viewPageFromHistory = async function (title, commit) {
  try {
    this.setState({
      spinner: "",
      viewHistory: false,
      allWikis: (
        await axios.get(
          `${BASE_URL}/wikis/pages?title=${title}&ref=${commit}`,
          { cancelToken: this.axiosCancel.token }
        )
      ).data.wikis,
    });
  } catch (err) {
    console.log(err.message);
  }
};
