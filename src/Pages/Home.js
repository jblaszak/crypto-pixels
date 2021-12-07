import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import useReponsive from "../hooks/useResponsive";
import { dataMapActions } from "../store/dataMap-slice";

import Community from "../components/Community";
import Hero from "../components/Hero";
import Minting from "../components/Minting";
import OpenSea from "../components/OpenSea";
import Overview from "../components/Overview";
import PixelInfo from "../components/PixelInfo";
import Card from "../components/UI/Card";
import Section from "../components/Layout/Section";
import PixelMap from "../components/PixelMap/PixelMap";
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
          <div className={classes.bothForms}>
            <div className={classes.positionFinder}>
              <form onSubmit={submitHandler}>
                <div className={classes.formEntry}>
                  <input
                    ref={xRef}
                    id="x"
                    type="number"
                    min="0"
                    max="99"
                    placeholder=" "
                    autoComplete="off"
                  />
                  <label htmlFor="x">
                    {isSmallScreen ? "X Pos" : "X Position"}
                  </label>
                </div>
                <div className={classes.formEntry}>
                  <input
                    ref={yRef}
                    id="y"
                    type="number"
                    min="0"
                    max="99"
                    placeholder=" "
                    autoComplete="off"
                  />
                  <label htmlFor="y">
                    {isSmallScreen ? "Y Pos" : "Y Position"}
                  </label>
                </div>
                <button type="submit" className={classes.findPixel}>
                  Find Pixel
                </button>
              </form>
            </div>
            <div className={classes.numberFinder}>
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
          </div>
        </Card>
      </Section>
      <Section>
        <PixelInfo className={classes.pixelInfo} />
      </Section>
      <Section>
        <PixelMap />
      </Section>
      <Overview />
      <Community />
      <OpenSea />
      <Roadmap />
    </React.Fragment>
  );
};

export default Home;
