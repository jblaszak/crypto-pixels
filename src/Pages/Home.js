import React, { Suspense } from "react";

import Hero from "../components/Hero";
import Minting from "../components/Minting";
const PixelSection = React.lazy(() => import("../components/PixelSection"));
import LoadingSpinner from "../components/UI/LoadingSpinner";
// import PixelSection from "../components/PixelSection";
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
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <PixelSection />
      </Suspense>
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
