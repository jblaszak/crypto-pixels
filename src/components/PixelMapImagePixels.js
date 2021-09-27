import { useEffect } from "react";
import { useDispatch } from "react-redux";

import classes from "./PixelMapImagePixels.module.css";
import { loadPixelData } from "../store/dataMap-actions";
import { dataMapActions } from "../store/dataMap-slice";

const PixelMapImagePixels = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timedLoad = setTimeout(() => {
      dispatch(loadPixelData());
    }, 500);

    return () => {
      clearTimeout(timedLoad);
    };
  }, [dispatch]);

  const fadeClasses = [
    classes.fader1,
    classes.fader2,
    classes.fader3,
    classes.fader4,
    classes.fader5,
  ];

  const maxTimesSold = Math.max.apply(
    Math,
    props.data.map((pixel) => pixel.timesSold)
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

  const mouseOverHandler = (index) => {
    dispatch(dataMapActions.updateSelectedPixel(index));
  };

  const createRect = (x, y) => {
    const index = y * props.xCount + x;
    const pixel = props.data[index];

    return (
      <rect
        key={`${index + 1}`}
        id={`${index + 1}`}
        className={fadeClasses[Math.floor(Math.random() * 5)]}
        width={props.size}
        height={props.size}
        x={x * props.squareSize}
        y={y * props.squareSize}
        rx={1}
        ry={1}
        fill={props.isHeatMap ? getHeatMapColor(pixel.timesSold) : pixel.color}
        onMouseOver={() => mouseOverHandler(index)}
      />
    );
  };

  return (
    <svg viewBox={props.viewBox} x="0" y="0">
      {[...Array(props.xCount)].map((i, x) => {
        return [...Array(props.yCount)].map((j, y) => {
          return createRect(x, y);
        });
      })}
    </svg>
  );
};

export default PixelMapImagePixels;
