import React from "react"
import ContentLoader from "react-content-loader" 

const cardLoading = () => (
  <ContentLoader 
    speed={2}
    width={787}
    height={828}
    viewBox="0 0 787 828"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="14" y="11" rx="25" ry="25" width="103" height="44" /> 
    <rect x="16" y="80" rx="25" ry="25" width="121" height="44" /> 
    <rect x="25" y="157" rx="10" ry="10" width="713" height="656" /> 
    <rect x="155" y="80" rx="25" ry="25" width="121" height="44" /> 
    <rect x="294" y="79" rx="25" ry="25" width="121" height="44" /> 
    <rect x="436" y="78" rx="25" ry="25" width="121" height="44" />
  </ContentLoader>
)

export default cardLoading