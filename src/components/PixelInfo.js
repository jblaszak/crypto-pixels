import { useSelector } from "react-redux";

import classes from "./PixelInfo.module.css";

const PixelInfo = (props) => {
  const selectedPixel = useSelector((state) => state.dataMap.selectedPixel);
  const allPixelData = useSelector((state) => state.dataMap.pixelData);
  const pixelData = allPixelData[selectedPixel];

  return (
    <div className={props.className}>
      <div className={classes.topRow}>
        <div
          className={classes.pixelLarge}
          style={{ backgroundColor: pixelData.color }}
        />
        <div className={classes.name}>{`NAME #${selectedPixel + 1}`}</div>
        <div className={classes.position}>
          Position:{" "}
          <span>{`(${selectedPixel % 100},${Math.floor(
            selectedPixel / 100
          )})`}</span>
        </div>
      </div>
      <div className={classes.sales}>
        <div>
          Last Price: <span>{`${pixelData.lastPrice}`}</span>
        </div>
        <div>
          Times Sold: <span>{`${pixelData.timesSold}`}</span>
        </div>
      </div>
      <div className={classes.owner}>
        <div>
          Owner Username: <span>{`${pixelData.ownerUsername}`}</span>
        </div>
        <div>{`Owner Address: ${pixelData.ownerAddress}`}</div>
      </div>
    </div>
  );
};

export default PixelInfo;
