import React, { useEffect, useRef, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataMapActions } from "../store/dataMap-slice";
import { getAttributes, getAttributeCounts } from "../data/";

import LoadingSpinner from "../components/UI/LoadingSpinner";
import PixelInfo from "../components/PixelInfo";
import Card from "../components/UI/Card";
import Section from "../components/Layout/Section";
import PixelMap from "../components/PixelMap/PixelMap";

import classes from "./PixelSection.module.css";

const PixelSection = () => {
  const dispatch = useDispatch();
  const selectedPixel = useSelector((state) => state.dataMap.selectedPixel);

  const numRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const index = +numRef.current.value;
    dispatch(dataMapActions.updateSelectedPixel(index));
  };

  useEffect(() => {
    dispatch(
      dataMapActions.updateAttributes({
        pixelAttributes: getAttributes(),
        pixelAttributeCounts: getAttributeCounts(),
      })
    );
  }, []);

  let pixelInfoDisplay = (
    <Card>
      <p className={classes.pixelInfoDisplay}>Select a pixel to see stats.</p>
    </Card>
  );

  if (selectedPixel !== -1) {
    pixelInfoDisplay = <PixelInfo className={classes.pixelInfo} />;
  }

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
        <Section>{pixelInfoDisplay}</Section>
      </Suspense>
    </React.Fragment>
  );
};

export default PixelSection;
