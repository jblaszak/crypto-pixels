import { useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from "react-redux";

import classes from "./PixelMapImage.module.css";
import InfoTooltip from "./InfoTooltip";
import { loadPixelData } from "../store/dataMap-actions";

const PixelMapImage = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dataMap.pixelData);

  useEffect(() => {
    const timedLoad = setTimeout(() => {
      dispatch(loadPixelData());
    }, 500);

    return () => {
      clearTimeout(timedLoad);
    };
  }, [dispatch]);

  const xCount = Math.sqrt(data.length);
  const yCount = xCount;
  const squareSize = props.size + props.gap;
  const viewBox = `0 0 ${squareSize * xCount} ${squareSize * yCount}`;

  const tooltipId = "tooltip";

  const fadeClasses = [
    classes.fader1,
    classes.fader2,
    classes.fader3,
    classes.fader4,
    classes.fader5,
  ];

  const maxTimesSold = Math.max.apply(
    Math,
    data.map((pixel) => pixel.timesSold)
  );

  const getHeatMapColor = (timesSold) => {
    const level = timesSold / maxTimesSold;
    if (level < 0.1) {
      return "#000000";
    } else if (level < 0.2) {
      return "#03045E";
    } else if (level < 0.3) {
      return "#023E8A";
    } else if (level < 0.4) {
      return "#0077B6";
    } else if (level < 0.5) {
      return "#0096C7";
    } else if (level < 0.6) {
      return "#00B4D8";
    } else if (level < 0.7) {
      return "#48CAE4";
    } else if (level < 0.8) {
      return "#90E0EF";
    } else if (level < 0.9) {
      return "#ADE8F4";
    } else {
      return "#CAF0F8";
    }
  };

  const createRect = (x, y) => {
    const index = y * xCount + x;
    const pixel = data[index];
    const name = `NAME #${index + 1}`;

    const dataString = JSON.stringify({
      name: name,
      x: x,
      y: y,
      fillColor: pixel.color,
      timesSold: pixel.timesSold,
      lastPrice: `${pixel.lastPrice} ${pixel.priceUnit}`,
      ownerUsername: pixel.ownerUsername,
      ownerAddress: pixel.ownerAddress,
    });

    return (
      <rect
        key={`${index + 1}`}
        id={`${index + 1}`}
        className={fadeClasses[Math.floor(Math.random() * 5)]}
        width={props.size}
        height={props.size}
        x={x * squareSize}
        y={y * squareSize}
        rx={1}
        ry={1}
        fill={props.isHeatMap ? getHeatMapColor(pixel.timesSold) : pixel.color}
        data-for={tooltipId}
        data-tip={dataString}
        data-event="click"
      />
    );
  };

  return (
    <div className={classes.pixelMap}>
      <svg viewBox={viewBox}>
        {[...Array(xCount)].map((i, x) => {
          return [...Array(yCount)].map((j, y) => {
            return createRect(x, y);
          });
        })}
      </svg>
      <ReactTooltip
        id={tooltipId}
        effect="solid"
        className={classes.tooltip}
        type="light"
        border={true}
        getContent={(dataTip) => <InfoTooltip {...JSON.parse(dataTip)} />}
        clickable={true}
      />
    </div>
  );
};

export default PixelMapImage;
