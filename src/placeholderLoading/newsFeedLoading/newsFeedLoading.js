import React from "react"
import ContentLoader from "react-content-loader" 
import "./newsFeedLoading.scss"

const newsFeedLoading = () => (
  <ContentLoader className="newsFeedLoading" 
    speed={2}
    width={840}
    height={400}
    viewBox="0 0 840 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="5" ry="5" width="524" height="60" /> 
    <rect x="552" y="1" rx="5" ry="5" width="284" height="60" /> 
    <rect x="164" y="92" rx="8" ry="8" width="110" height="45" /> 
    <rect x="304" y="91" rx="8" ry="8" width="110" height="45" /> 
    <rect x="439" y="91" rx="8" ry="8" width="110" height="45" /> 
    <rect x="580" y="91" rx="8" ry="8" width="110" height="45" /> 
    <rect x="0" y="183" rx="0" ry="0" width="427" height="169" /> 
    <rect x="437" y="181" rx="0" ry="0" width="397" height="169" />
  </ContentLoader>
)

export default newsFeedLoading