import React from "react";
import ContentLoader from "react-content-loader";
import "./notifyUsersLoading.scss"

const notifyUsersLoading = () => (
  <ContentLoader className="notifyUsersLoading"
    speed={2}
    width={871}
    height={310}
    viewBox="0 0 871 310"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="39" y="10" rx="14" ry="14" width="829" height="277" />
  </ContentLoader>
);

export default notifyUsersLoading;
