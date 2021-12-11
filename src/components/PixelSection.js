import React, { useRef, Suspense } from "react";
import { useDispatch } from "react-redux";
import { dataMapActions } from "../store/dataMap-slice";

import LoadingSpinner from "./UI/LoadingSpinner";
import PixelInfo from "./PixelInfo";
import Card from "./UI/Card";
import Section from "./Layout/Section";
import PixelMap from "./PixelMap/PixelMap";

import classes from "./PixelSection.module.css";

const PixelSection = () => {
  const dispatch = useDispatch();

  const numRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const index = +numRef.current.value;
    dispatch(dataMapActions.updateSelectedPixel(index));
  };

  return (
    <React.Fragment>
      <Section>
        <p className={classes.usageDescription}>
          Enter information below or click on pixel to get more information
          about it! Best viewed on desktop.
        </p>
        <Card>
          <div className={classes.pixelSelector}>
            <div className={classes.pixelNumber}>
              <form onSubmit={submitHandler}>
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
    </React.Fragment>
  );
};

export default PixelSection;
