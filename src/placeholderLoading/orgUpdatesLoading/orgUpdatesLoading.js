import React from "react"
import ContentLoader from "react-content-loader" 
import "./orgUpdatesLoading.scss"

const orgUpdatesLoading = () => (
    <ContentLoader 
    speed={2}
    width={400}
    height={600}
    viewBox="0 0 400 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="11" y="46" rx="20" ry="20" width="194" height="43" /> 
    <rect x="12" y="115" rx="10" ry="10" width="356" height="435" />
  </ContentLoader>
)

export default orgUpdatesLoading