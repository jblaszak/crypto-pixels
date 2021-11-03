import React from "react";
import Community from "../components/Community";
import Hero from "../components/Hero";
import Minting from "../components/Minting";
import OpenSea from "../components/OpenSea";
import Overview from "../components/Overview";
import Roadmap from "../components/Roadmap";

const Home = () => {
  return (
    <React.Fragment>
      <Hero />
      <Overview />
      <Minting />
      <Community />
      <OpenSea />
      <Roadmap />
    </React.Fragment>
  );
};

export default Home;
