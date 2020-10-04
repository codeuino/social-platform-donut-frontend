import React, { useEffect } from "react";
import "./Sidebar.scss";
import ReactMarkdown from "react-markdown";
import PagesDisplay from "./PagesDisplay/PagesDisplay";
import EditButton from "@material-ui/icons/EditOutlined";

const Sidebar = (props) => {
  const { pages, setView, isAdmin, edit, content } = props;
  useEffect(() => {
    const allLinks = document.querySelectorAll(".wiki-sidebar a");
    Array.prototype.forEach.call(allLinks, (link) => {
      let text = link.textContent;
      if (text[0] === "$") {
        text = text.substring(1, text.lastIndexOf("$"));
        link.textContent = text;
        if (pages.filter((page) => page.title === text).length === 0)
          link.style.color = "red";
        link.addEventListener("click", (evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          setView(link.textContent);
        });
      } else {
        link.innerHTML = `<span>🔗</span>${link.textContent}`;
      }
    });
  }, []);
  return (
    <div className="wiki-sidebar">
      <PagesDisplay pages={pages.slice(1)} setView={setView} />
      <div className="wiki-sidebar-navigator">
        {isAdmin && (
          <EditButton
            onClick={() => edit(false, true)}
            className="edit-button"
          />
        )}
        <ReactMarkdown source={content} />
      </div>
    </div>
  );
};

export default Sidebar;
