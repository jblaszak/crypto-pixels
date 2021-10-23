import React, { useState } from "react";
import { useSelector } from "react-redux";

import Card from "./UI/Card";
import PixelAttributeList from "./PixelAttributeList";

import * as CONSTANTS from "../constants";
import classes from "./PixelInfo.module.css";
import ReactTooltip from "react-tooltip";

const initTooltip = "Copy address to clipboard";

const PixelInfo = (props) => {
  const [tooltip, setTooltip] = useState(initTooltip);
  const [tooltipVisible, setTooltipVisible] = useState(true);

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

  let copySVG = (
    <svg viewBox="0 0 130 145" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="5"
        y="35"
        width="90"
        height="105"
        rx="5"
        stroke="white"
        stroke-width="10"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M40 10H120V105H100V115H120C125.523 115 130 110.523 130 105V10C130 4.47715 125.523 0 120 0H40C34.4772 0 30 4.47715 30 10V30H40V10Z"
        fill="white"
      />
    </svg>
  );

  const copyHandler = () => {
    navigator.clipboard.writeText(pixelStats.address).then(
      async () => {
        setTooltipVisible(false);
        setTooltip("Copied");
        setTooltipVisible(true);
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

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
          <p className={classes.addressContainer}>
            <div className={classes.address}>
              {`Owner Address: ${pixelStats.address}`}
            </div>
            <div
              className={classes.copy}
              data-tip={tooltip}
              data-for="copy"
              onClick={copyHandler}
            >
              {copySVG}
            </div>
            {tooltipVisible && (
              <ReactTooltip
                id="copy"
                getContent={(dataTip) => tooltip}
                place="top"
              />
            )}
          </p>
        </div>
      </div>
      <div className={classes.attributes}>
        <PixelAttributeList attributes={pixelAttributes} />
      </div>
    </Card>
  );
};

export default PixelInfo;
