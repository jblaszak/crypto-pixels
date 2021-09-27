import React, { useState, useRef } from "react";
import PixelMapImage from "./PixelMapImage";

import classes from "./PixelMap.module.css";

const PixelMap = () => {
  const [isHeatMap, setIsHeatMap] = useState(false);
  const xRef = useRef();
  const yRef = useRef();
  const numRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const pos = +xRef.current.value + 1 + +yRef.current.value * 100;
    const element = document.getElementById(`${pos}`);
    element.dispatchEvent(new MouseEvent("click"));
  };

  const submitHandler2 = (event) => {
    event.preventDefault();
    const element = document.getElementById(`${numRef.current.value}`);
    element.dispatchEvent(new MouseEvent("click"));
  };

  return (
    <section>
      <div className={classes.pixelMapControls}>
        <form onSubmit={submitHandler}>
          <label htmlFor="x">X Pos:</label>
          <input ref={xRef} id="x" type="number" min="0" max="99" />
          <label htmlFor="y">Y Pos:</label>
          <input ref={yRef} id="y" type="number" min="0" max="99" />
          <button type="submit" className={classes.findPixel}>
            Find Pixel
          </button>
        </form>
        <form onSubmit={submitHandler2}>
          <label htmlFor="number">Pixel #:</label>
          <input ref={numRef} id="number" type="number" min="1" max="10000" />
          <button type="submit" className={classes.findPixel}>
            Find Pixel
          </button>
        </form>
      </div>
      <div className={classes.pixelMapControls}>
        <button onClick={() => setIsHeatMap(false)}>Color Pixels</button>
        <button onClick={() => setIsHeatMap(true)}>Sales Heatmap</button>
      </div>
      <PixelMapImage size={7} gap={1} isHeatMap={isHeatMap} />
    </section>
  );
};

export default PixelMap;
