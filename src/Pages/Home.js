import React from "react";
import Hero from "../components/Hero";
import Overview from "../components/Overview";
import Roadmap from "../components/Roadmap";

const Home = () => {
  return (
    <React.Fragment>
      <Hero />
      <Overview />
      <Roadmap />
    </React.Fragment>
  );
};

export default Home;
