import React from "react"
import ContentLoader from "react-content-loader" 

const topBarLoading = () => (
    <ContentLoader className="loader"
    speed={2}
    width={1300}
    height={310}
    viewBox="0 0 1300 310"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="9" y="0" rx="10" ry="10" width="1183" height="270" />

  </ContentLoader>
)

export default topBarLoading