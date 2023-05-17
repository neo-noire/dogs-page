import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={"100%"}
    viewBox="0 0 100 120"
    backgroundColor="#2a2727"
    foregroundColor="#3a3232"
  >
    <rect x="0" y="0" rx="16" ry="16" width="100%" height="100%" />
  </ContentLoader>
);

export default MyLoader;
