import React from "react"
import ContentLoader from "react-content-loader" 

const portfolioLoading = () => (
  <ContentLoader
    speed={2}
    width={425}
    height={280}
    viewBox="0 0 425 280"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="14" ry="14" width="425" height="277" />
  </ContentLoader>
)

export default portfolioLoading