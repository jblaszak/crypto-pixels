import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { dataMapActions } from "../store/dataMap-slice";

import PixelInfo from "../components/PixelInfo";
import Card from "../components/UI/Card";
import Section from "../components/Layout/Section";
import PixelMap from "../components/PixelMap/PixelMap";

import classes from "./CollectionViewer.module.css";

const CollectionViewer = () => {
  const [isHeatMap, setIsHeatMap] = useState(false);
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
      <Section>
        <p className={classes.usageDescription}>
          Enter information below or click on pixel to get more information
          about it!
        </p>
        <Card>
          <div className={classes.bothForms}>
            <form onSubmit={submitHandler} className={classes.positionFinder}>
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
                <label htmlFor="x">X Position</label>
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
                <label htmlFor="y">Y Position</label>
              </div>
              <button type="submit" className={classes.findPixel}>
                Find Pixel
              </button>
            </form>
            <form onSubmit={submitHandler2} className={classes.numberFinder}>
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
          {/* <div className={classes.pixelMapSettings}>
            <button onClick={() => setIsHeatMap(false)}>Color Pixels</button>
            <button onClick={() => setIsHeatMap(true)}>Sales Heatmap</button>
          </div> */}
        </Card>
      </Section>
      <Section>
        <PixelInfo className={classes.pixelInfo} />
      </Section>
      <Section>
        <PixelMap />
      </Section>
    </React.Fragment>
  );
};

export default CollectionViewer;