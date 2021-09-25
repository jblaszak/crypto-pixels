import ReactTooltip from "react-tooltip";

import classes from "./PixelMapImage.module.css";
import InfoTooltip from "./InfoTooltip";

const PixelMapImage = (props) => {
  const xCount = props.x;
  const yCount = props.y;
  const squareSize = props.size + props.gap;
  const viewBox = `0 0 ${squareSize * xCount} ${squareSize * yCount}`;

  const tooltipId = "tooltip";

  const createRect = (x, y) => {
    const index = y * 100 + x;

    const fillColor = props.colorData[index];

    const dataString = JSON.stringify({
      name: `NAME #${index + 1}`,
      x: x,
      y: y,
      fillColor: fillColor,
      timesSold: 1,
      lastPrice: "30 ETH",
      ownerUsername: "Bob",
      ownerAddress: "0xf8cc874fe4696131725018138fc4bb44866433e0",
    });

    return (
      <rect
        width={props.size}
        height={props.size}
        x={x * squareSize}
        y={y * squareSize}
        rx={1}
        ry={1}
        fill={fillColor}
        data-for={tooltipId}
        data-tip={dataString}
      />
    );
  };

  return (
    <div>
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
      />
    </div>
  );
};

export default PixelMapImage;
