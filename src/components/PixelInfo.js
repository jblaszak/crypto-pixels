import { useSelector } from "react-redux";

import Card from "./UI/Card";
import PixelAttributeList from "./PixelAttributeList";
import * as CONSTANTS from "../constants";
import classes from "./PixelInfo.module.css";

const PixelInfo = (props) => {
  const selectedPixel = useSelector((state) => state.dataMap.selectedPixel);
  let pixelAttributes = useSelector((state) => state.dataMap.pixelAttributes);
  let pixelStats = useSelector((state) => state.dataMap.pixelStats);

  pixelAttributes = pixelAttributes[selectedPixel];
  pixelStats = pixelStats[selectedPixel];

  const color = `rgb(${pixelAttributes.r}, ${pixelAttributes.g}, ${pixelAttributes.b})`;
  const position = (
    <span>{` (${(selectedPixel - 1) % CONSTANTS.MAX_WIDTH},${Math.floor(
      (selectedPixel - 1) / CONSTANTS.MAX_WIDTH
    )})`}</span>
  );

  let styles = { backgroundColor: color };
  let pixelClass = classes.pixelLarge;
  if (pixelAttributes["f"]) {
    pixelClass = `${pixelClass} ${classes.flashy}`;
    styles = {};
  }
  if (pixelAttributes["d"]) {
    pixelClass = `${pixelClass} ${classes.dead}`;
    styles = {};
  }

  return (
    <Card>
      <div className={classes.infoHeader}>
        <div className={pixelClass} style={styles} />
        <h3 className={classes.name}>
          {CONSTANTS.NAME} #{selectedPixel}
        </h3>
        <h3 className={classes.position}>Position:{position}</h3>
      </div>
      <div className={classes.stats}>
        <div className={classes.sales}>
          <p>
            Last Price: <span>{`${pixelStats.price} ${pixelStats.coin}`}</span>
          </p>
          <p>
            Times Sold: <span>{`${pixelStats.timesSold}`}</span>
          </p>
        </div>
        <div className={classes.owner}>
          <p>
            Owner Username: <span>{pixelStats.username}</span>
          </p>
          <p>{`Owner Address: ${pixelStats.address}`}</p>
        </div>
      </div>
      <div className={classes.attributes}>
        <PixelAttributeList attributes={pixelAttributes} />
      </div>
    </Card>
  );
};

export default PixelInfo;
