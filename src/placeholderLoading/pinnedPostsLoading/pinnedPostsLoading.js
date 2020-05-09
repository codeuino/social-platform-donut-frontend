import React from "react"
import ContentLoader from "react-content-loader" 
import "./pinnedPostsLoading.scss"

const pinnedPostsLoading = () => (
  <ContentLoader className="loader"
    speed={2}
    width={820}
    height={380}
    viewBox="0 0 820 380"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="2" y="9" rx="28" ry="28" width="210" height="51" /> 
    <rect x="6" y="84" rx="28" ry="28" width="130" height="48" /> 
    <rect x="157" y="83" rx="28" ry="28" width="130" height="48" /> 
    <rect x="311" y="82" rx="28" ry="28" width="130" height="48" /> 
    <rect x="463" y="83" rx="28" ry="28" width="130" height="48" /> 
    <rect x="8" y="156" rx="10" ry="10" width="395" height="204" /> 
    <rect x="414" y="178" rx="10" ry="10" width="395" height="204" />
  </ContentLoader>
)

export default pinnedPostsLoading