import React, { useRef, Suspense } from "react";
import { useDispatch } from "react-redux";
import useReponsive from "../hooks/useResponsive";
import { dataMapActions } from "../store/dataMap-slice";

import LoadingSpinner from "../components/UI/LoadingSpinner";
import Community from "../components/Community";
import Hero from "../components/Hero";
import Minting from "../components/Minting";
import OpenSea from "../components/OpenSea";
import Overview from "../components/Overview";
import PixelInfo from "../components/PixelInfo";
import Card from "../components/UI/Card";
import Section from "../components/Layout/Section";
import PixelMap from "../components/PixelMap/PixelMap";
import Story from "../components/Story";
import PixelTypes from "../components/PixelTypes";
import Roadmap from "../components/Roadmap";

import classes from "./Home.module.css";

const Home = () => {
  const isSmallScreen = useReponsive("(max-width: 475px)");

  const dispatch = useDispatch();

  const xRef = useRef();
  const yRef = useRef();
  const numRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const index = +xRef.current.value + 1 + +yRef.current.value * 100;
    dispatch(dataMapActions.updateSelectedPixel(index));
  };

  const submitHandler2 = (event) => {
    event.preventDefault();
    const index = +numRef.current.value;
    dispatch(dataMapActions.updateSelectedPixel(index));
  };
  return (
    <React.Fragment>
      <Hero />
      <Minting />
      <Section>
        <p className={classes.usageDescription}>
          Enter information below or click on pixel to get more information
          about it! Best viewed on desktop.
        </p>
        <Card>
          <div className={classes.pixelSelector}>
            <div className={classes.pixelNumber}>
              <form onSubmit={submitHandler2}>
                <div className={classes.formEntry}>
                  <input
                    ref={numRef}
                    id="number"
                    type="number"
                    min="1"
                    max="10000"
                    placeholder=" "
                    autoComplete="off"
                  />
                  <label htmlFor="number">Pixel Number</label>
                </div>
                <button type="submit" className={classes.findPixel}>
                  Find Pixel
                </button>
              </form>
            </div>
            <button type="submit" className={classes.showMyPixels} disabled>
              Show My Pixels
            </button>
          </div>
        </Card>
      </Section>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Section>
          <PixelMap />
        </Section>
        <Section>
          <PixelInfo className={classes.pixelInfo} />
        </Section>
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
