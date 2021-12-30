import React from "react";
import { useSelector } from "react-redux";

import Card from "./UI/Card";
import PixelAttributeList from "./PixelAttributeList";

import * as CONSTANTS from "../constants";
import classes from "./PixelInfo.module.css";

const PixelInfo = (props) => {
  const selectedPixel = useSelector((state) => state.dataMap.selectedPixel);
  let pixelAttributes = useSelector((state) => state.dataMap.pixelAttributes);

  // const attributesLoaded = pixelAttributes.length > 0;
  let styles = {};
  let pixelClass = "";
  let position = "";

  pixelAttributes = pixelAttributes[selectedPixel];

  const color = `rgb(${pixelAttributes.r}, ${pixelAttributes.g}, ${pixelAttributes.b})`;
  position = (
    <span>{` (${(selectedPixel - 1) % CONSTANTS.MAX_WIDTH},${Math.floor(
      (selectedPixel - 1) / CONSTANTS.MAX_WIDTH
    )})`}</span>
  );

  styles = { backgroundColor: color };
  pixelClass = classes.pixelLarge;
  if (pixelAttributes?.["f"]) {
    pixelClass = `${pixelClass} ${classes.flashy}`;
    styles = {};
  }
  if (pixelAttributes?.["d"]) {
    pixelClass = `${pixelClass} ${classes.dead}`;
    styles = {};
  }

  return (
    <Card className={classes.card}>
      <div className={classes.infoHeader}>
        <div className={pixelClass} style={styles} />
        <h3 className={classes.name}>CFP #{selectedPixel}</h3>
        {/* <h3 className={classes.position}>Position:{position}</h3> */}
      </div>
      <div className={classes.attributes}>
        <PixelAttributeList attributes={pixelAttributes} />
      </div>
    </Card>
  );
};

export default PixelInfo;
