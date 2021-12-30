import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataMapActions } from "../store/dataMap-slice";
import { getAttributeData, getAttributes, getAttributeCounts } from "../data/";

import PixelInfo from "../components/PixelInfo";
import Card from "../components/UI/Card";
import Section from "../components/Layout/Section";
import PixelMap from "../components/PixelMap/PixelMap";

import classes from "./PixelSection.module.css";

const PixelSection = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const dispatch = useDispatch();
  const selectedPixel = useSelector((state) => state.dataMap.selectedPixel);

  const numRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const index = +numRef.current.value;
    dispatch(dataMapActions.updateSelectedPixel(index));
  };

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  useEffect(async () => {
    if (!firstLoad) {
      const attributeData = await getAttributeData();
      // console.log(attributeData);
      dispatch(
        dataMapActions.updateAttributes({
          pixelAttributes: getAttributes(attributeData),
          pixelAttributeCounts: getAttributeCounts(attributeData),
        })
      );
    }
  }, [firstLoad]);

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
          Note: Collection Viewer can take ~10 seconds to load on some mobile
          devices.
        </p>
        <Card>
          <div className={classes.pixelSelector}>
            <div className={classes.controlsDescription}>
              <h1>Controls</h1>
              <p>Click/Tap - Select Pixel</p>
              <p>Scroll/Pinch - Zoom</p>
              <p>Click/Tap & Drag - Pan</p>
            </div>
            <div className={classes.controlsDescription}>
              <h1>Flashing</h1>
              <p>Blue - Selected Pixel</p>
              <p>Red - Boosted By Pixel</p>
              <p>Green - Boosting Pixels</p>
            </div>
            <div className={classes.pixelNumber}>
              <h1>Select a Pixel</h1>
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
          </div>
        </Card>
      </Section>
      <Section className={classes.pixelContainer}>
        <PixelMap className={classes.pixelMap} />
        {pixelInfoDisplay}
      </Section>
    </React.Fragment>
  );
};

export default PixelSection;
