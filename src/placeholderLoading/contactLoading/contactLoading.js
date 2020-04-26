import React from "react"
import ContentLoader from "react-content-loader" 

const contactLoading = () => (
  <ContentLoader 
    speed={2}
    width={465}
    height={272}
    viewBox="0 0 465 272"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="24" y="13" rx="6" ry="6" width="138" height="28" /> 
    <rect x="22" y="55" rx="10" ry="10" width="419" height="205" />
  </ContentLoader>
)

export default contactLoading