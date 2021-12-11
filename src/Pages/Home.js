import React from "react";

import Hero from "../components/Hero";
import Minting from "../components/Minting";
import PixelSection from "../components/PixelSection";
import Overview from "../components/Overview";
import Story from "../components/Story";
import PixelTypes from "../components/PixelTypes";
import Community from "../components/Community";
import OpenSea from "../components/OpenSea";
import Roadmap from "../components/Roadmap";

const Home = () => {
  return (
    <React.Fragment>
      <Hero />
      <Minting />
      <PixelSection />
      <Overview />
      <Story />
      <PixelTypes />
      <Community />
      <Minting />
      <OpenSea />
      <Roadmap />
      <Minting />
    </React.Fragment>
  );
};

export default Home;
