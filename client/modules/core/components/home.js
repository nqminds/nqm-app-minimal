import React from "react";

const Home = ({title, style}) => {
  return <div style={style}>{title}</div>;
};

Home.propTypes = {
  style: React.PropTypes.object,
  title: React.PropTypes.string,
};

export default Home;
