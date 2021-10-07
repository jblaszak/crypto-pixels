import { useSelector } from "react-redux";

import * as CONSTANTS from "../constants";
import classes from "./PixelInfo.module.css";

const PixelInfo = (props) => {
  const selectedPixel = useSelector((state) => state.dataMap.selectedPixel);
  let pixelAttributes = useSelector((state) => state.dataMap.pixelAttributes);
  pixelAttributes = pixelAttributes[selectedPixel];
  let pixelStats = useSelector((state) => state.dataMap.pixelStats);
  pixelStats = pixelStats[selectedPixel];
  const color = `rgb(${pixelAttributes.r}, ${pixelAttributes.g}, ${pixelAttributes.b})`;

  return (
    <div className={props.className}>
      <div className={classes.topRow}>
        <div
          className={classes.pixelLarge}
          style={{ backgroundColor: color }}
        />
        <div className={classes.name}>
          {CONSTANTS.NAME} #{selectedPixel}
        </div>
        <div className={classes.position}>
          Position:{" "}
          <span>{`(${(selectedPixel - 1) % CONSTANTS.MAX_WIDTH},${Math.floor(
            (selectedPixel - 1) / CONSTANTS.MAX_WIDTH
          )})`}</span>
        </div>
      </div>
      <div className={classes.sales}>
        <div>
          Last Price: <span>{`${pixelStats.price}`}</span>
        </div>
        <div>
          Times Sold: <span>{`${pixelStats.timesSold}`}</span>
        </div>
      </div>
      <div className={classes.owner}>
        <div>
          Owner Username: <span>{pixelStats.username}</span>
        </div>
        <div>{`Owner Address: ${pixelStats.address}`}</div>
      </div>
    </div>
  );
};

export default PixelInfo;
