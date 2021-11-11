import React, { useRef, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import PixelField from "./PixelField";
import ToolTip from "./ToolTip";
import Card from "../UI/Card";

import { dataMapActions } from "../../store/dataMap-slice";
import CryptoContext from "../../store/cryptoContext";
import * as CONSTANTS from "../../constants";

import classes from "./PixelMap.module.css";

const useCanvas = () => {
  const canvasRefPixelMap = useRef(null);
  const canvasRefToolTip = useRef(null);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.dataMap.pixelAttributes);
  const cryptoCtx = useContext(CryptoContext);

  // const selectedPixel = useSelector((state) => state.dataMap.selectedPixel);

  useEffect(() => {
    const canvas = canvasRefPixelMap.current;
    const ctx = canvas.getContext("2d");
    canvas.width = CONSTANTS.INITIAL_CANVAS_WIDTH;
    canvas.height = CONSTANTS.INITIAL_CANVAS_WIDTH;

    const canvasToolTip = canvasRefToolTip.current;
    const ctxToolTip = canvasToolTip.getContext("2d");
    canvasToolTip.width = CONSTANTS.INITIAL_CANVAS_WIDTH;
    canvasToolTip.height = CONSTANTS.INITIAL_CANVAS_WIDTH;

    let pixelFieldAnimation;
    let toolTipAnimation;
    const didChangeHappen = true;
    const mintedPixels = cryptoCtx.mintedPixels;

    const pixelField = new PixelField(
      ctx,
      canvas.width,
      canvas.height,
      data,
      pixelFieldAnimation,
      didChangeHappen,
      mintedPixels
    );

    const toolTip = new ToolTip(
      ctxToolTip,
      canvasToolTip.width,
      canvasToolTip.height,
      toolTipAnimation
    );

    pixelField.pixelFieldAnimation = requestAnimationFrame(pixelField.animate);
    toolTip.toolTipAnimation = requestAnimationFrame(toolTip.animate);

    const handleResize = (e) => {
      cancelAnimationFrame(pixelField.pixelFieldAnimation);
      cancelAnimationFrame(toolTip.toolTipAnimation);

      pixelField.didChangeHappen = true;

      pixelField.pixelFieldAnimation = requestAnimationFrame(
        pixelField.animate
      );
      toolTip.toolTipAnimation = requestAnimationFrame(toolTip.animate);
    };

    const handleMouseMove = async (e) => {
      cancelAnimationFrame(pixelField.pixelFieldAnimation);
      cancelAnimationFrame(toolTip.toolTipAnimation);

      pixelField.didChangeHappen = true;

      const bodyCoords = document.body.getBoundingClientRect();
      const canvasCoords = canvas.getBoundingClientRect();

      const mouseX =
        (e.x + window.scrollX - (canvasCoords.left - bodyCoords.left)) *
        (CONSTANTS.INITIAL_CANVAS_WIDTH / canvasCoords.width);
      const mouseY =
        (e.y + window.scrollY - (canvasCoords.top - bodyCoords.top)) *
        (CONSTANTS.INITIAL_CANVAS_WIDTH / canvasCoords.height);

      pixelField.mouseX = mouseX;
      pixelField.mouseY = mouseY;

      pixelField.pixelFieldAnimation = requestAnimationFrame(
        pixelField.animate
      );

      pixelField.getHoveredPixel();

      if (pixelField.hoveredPixel !== -1) {
        const x = `${(pixelField.hoveredPixel - 1) % CONSTANTS.MAX_WIDTH}`;
        const y = `${Math.floor(
          (pixelField.hoveredPixel - 1) / CONSTANTS.MAX_WIDTH
        )}`;
        toolTip.mouseX = mouseX;
        toolTip.mouseY = mouseY;
        toolTip.text = `CFP #${pixelField.hoveredPixel} (${x},${y})`;
      } else {
        toolTip.mouseX = -1;
        toolTip.mouseY = -1;
        toolTip.text = "";
      }

      toolTip.toolTipAnimation = requestAnimationFrame(toolTip.animate);
    };

    const handleClick = (e) => {
      if (pixelField.hoveredPixel !== -1) {
        dispatch(dataMapActions.updateSelectedPixel(pixelField.hoveredPixel));
      }
    };

    const handleMintChange = (e) => {
      cancelAnimationFrame(pixelField.pixelFieldAnimation);

      pixelField.didChangeHappen = true;

      const mintedPixels = e.detail;

      pixelField.pixelArray.forEach((pixel) => {
        if (mintedPixels.includes(pixel.index)) {
          pixel.visibility = true;
        }
      });

      pixelField.pixelFieldAnimation = requestAnimationFrame(
        pixelField.animate
      );
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("mintChange", handleMintChange);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mintChange", handleMintChange);
    };
  }, [data, dispatch]);

  return [canvasRefPixelMap, canvasRefToolTip];
};

const PixelMap = () => {
  const [canvasRefPixelMap, canvasRefToolTip] = useCanvas();

  return (
    <Card className={classes.container}>
      <canvas className={classes.canvasPixelMap} ref={canvasRefPixelMap} />
      <canvas className={classes.canvasToolTip} ref={canvasRefToolTip} />
    </Card>
  );
};

export default PixelMap;
