import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { dataMapActions } from "../store/dataMap-slice";

import PixelMapImage from "./PixelMapImage";
import PixelInfo from "./PixelInfo";

import classes from "./PixelMap.module.css";

const PixelMap = () => {
  const [isHeatMap, setIsHeatMap] = useState(false);
  const dispatch = useDispatch();

  const xRef = useRef();
  const yRef = useRef();
  const numRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const index = +xRef.current.value + +yRef.current.value * 100;
    dispatch(dataMapActions.updateSelectedPixel(index));
  };

  const submitHandler2 = (event) => {
    event.preventDefault();
    const index = +numRef.current.value - 1;
    dispatch(dataMapActions.updateSelectedPixel(index));
  };

  return (
    <section>
      <div className={classes.pixelMapController}>
        <div className={classes.pixelMapTargets}>
          <form onSubmit={submitHandler} className={classes.positionFinder}>
            <label htmlFor="x">X Pos:</label>
            <input ref={xRef} id="x" type="number" min="0" max="99" />
            <label htmlFor="y">Y Pos:</label>
            <input ref={yRef} id="y" type="number" min="0" max="99" />
            <button type="submit" className={classes.findPixel}>
              Find Pixel
            </button>
          </form>
          <form onSubmit={submitHandler2} className={classes.numberFinder}>
            <label htmlFor="number">Pixel #:</label>
            <input ref={numRef} id="number" type="number" min="1" max="10000" />
            <button type="submit" className={classes.findPixel}>
              Find Pixel
            </button>
          </form>
          <div className={classes.pixelMapSettings}>
            <button onClick={() => setIsHeatMap(false)}>Color Pixels</button>
            <button onClick={() => setIsHeatMap(true)}>Sales Heatmap</button>
          </div>
        </div>
        <PixelInfo className={classes.pixelInfo} />
      </div>
      <PixelMapImage
        size={7}
        gap={0.5}
        isHeatMap={isHeatMap}
        className={classes.pixelMapImage}
      />
    </section>
  );
};

export default PixelMap;
