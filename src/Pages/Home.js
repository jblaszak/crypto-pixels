import React from "react";
import Callout from "../components/Callout";
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
      <Callout />
      <Overview />
      <Minting />
      <Community />
      <OpenSea />
      <Roadmap />
      <Callout />
    </React.Fragment>
  );
};

export default Home;
