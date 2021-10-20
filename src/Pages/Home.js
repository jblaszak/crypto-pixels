import React from "react";
import Community from "../components/Community";
import Hero from "../components/Hero";
import Overview from "../components/Overview";
import Roadmap from "../components/Roadmap";

const Home = () => {
  return (
    <React.Fragment>
      <Hero />
      <Overview />
      <Community />
      <Roadmap />
    </React.Fragment>
  );
};

export default Home;
