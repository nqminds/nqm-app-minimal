import React from "react";

const Home = ({route, style}) => {
  return <div style={style}>{route.title}</div>;
};

Home.propTypes = {
  route: React.PropTypes.object,
  style: React.PropTypes.object,
};

export default Home;
