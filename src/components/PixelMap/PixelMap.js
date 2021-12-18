import React, { useRef, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import Background from "./Background";
import PixelField from "./PixelField";
import ToolTip from "./ToolTip";

import { dataMapActions } from "../../store/dataMap-slice";
import CryptoContext from "../../store/cryptoContext";
import * as CONSTANTS from "../../constants";

import classes from "./PixelMap.module.css";

const useCanvas = () => {
  const canvasRefPixelMap = useRef(null);
  const canvasRefToolTip = useRef(null);
  const canvasRefBackground = useRef(null);
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

    const canvasBackground = canvasRefBackground.current;
    const ctxBackground = canvasBackground.getContext("2d");
    canvasBackground.width = CONSTANTS.INITIAL_CANVAS_WIDTH;
    canvasBackground.height = CONSTANTS.INITIAL_CANVAS_WIDTH;

    let pixelFieldAnimation;
    let toolTipAnimation;
    let backgroundAnimation;
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

    const background = new Background(
      ctxBackground,
      canvasBackground.width,
      canvasBackground.height,
      backgroundAnimation
    );

    pixelField.pixelFieldAnimation = requestAnimationFrame(pixelField.animate);
    toolTip.toolTipAnimation = requestAnimationFrame(toolTip.animate);
    background.backgroundAnimation = requestAnimationFrame(background.animate);

    // Gets the relevant location from a mouse or single touch event
    const getEventLocation = (e) => {
      if (e.touches && e.touches.length == 1) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.clientX && e.clientY) {
        return { x: e.clientX, y: e.clientY };
      }
    };

    const getMouseX = (xPos, bodyCoords, canvasCoords) => {
      return (
        (xPos + window.scrollX - (canvasCoords.left - bodyCoords.left)) *
        (CONSTANTS.INITIAL_CANVAS_WIDTH / canvasCoords.width)
      );
    };

    const getMouseY = (yPos, bodyCoords, canvasCoords) => {
      return (
        (yPos + window.scrollY - (canvasCoords.top - bodyCoords.top)) *
        (CONSTANTS.INITIAL_CANVAS_WIDTH / canvasCoords.height)
      );
    };

    const handleResize = (e) => {
      cancelAnimationFrame(background.pixelFieldAnimation);
      cancelAnimationFrame(pixelField.pixelFieldAnimation);
      cancelAnimationFrame(toolTip.toolTipAnimation);

      pixelField.didChangeHappen = true;

      background.backgroundAnimation = requestAnimationFrame(
        background.animate
      );
      pixelField.pixelFieldAnimation = requestAnimationFrame(
        pixelField.animate
      );
      toolTip.toolTipAnimation = requestAnimationFrame(toolTip.animate);
    };

    const handleMouseDown = (e) => {
      const bodyCoords = document.body.getBoundingClientRect();
      const canvasCoords = canvas.getBoundingClientRect();
      const { x, y } = getEventLocation(e);
      const mouseX = getMouseX(x, bodyCoords, canvasCoords);
      const mouseY = getMouseY(y, bodyCoords, canvasCoords);

      pixelField.dragStart = pixelField.ctx.transformedPoint(mouseX, mouseY);
      pixelField.dragged = false;
    };

    const handleMouseUp = (e) => {
      pixelField.dragStart = null;
    };

    const handleTouch = (e, singleTouchHandler) => {
      if (e.touches.length == 1) {
        singleTouchHandler(e);
      } else if (e.type == "touchmove" && e.touches.length == 2) {
        pixelField.dragged = false;
        handlePinch(e);
      }
    };

    const handlePinch = (e) => {
      e.preventDefault();

      let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY };

      // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
      let currentDistance =
        (touch1.x - touch2.x) ** 2 + (touch1.y - touch2.y) ** 2;

      if (pixelField.initialPinchDistance == null) {
        pixelField.initialPinchDistance = currentDistance;
      } else {
        pixelField.adjustZoom(null, currentDistance / initialPinchDistance);
      }
    };

    const handleMouseMove = async (e) => {
      cancelAnimationFrame(pixelField.pixelFieldAnimation);
      cancelAnimationFrame(toolTip.toolTipAnimation);

      pixelField.didChangeHappen = true;

      const bodyCoords = document.body.getBoundingClientRect();
      const canvasCoords = canvas.getBoundingClientRect();
      const { x, y } = getEventLocation(e);
      const mouseX = getMouseX(x, bodyCoords, canvasCoords);
      const mouseY = getMouseY(y, bodyCoords, canvasCoords);

      pixelField.mouseX = mouseX;
      pixelField.mouseY = mouseY;

      pixelField.dragged = true;
      if (pixelField.dragStart) {
        pixelField.pt = pixelField.ctx.transformedPoint(mouseX, mouseY);
        pixelField.ctx.translate(
          pixelField.pt.x - pixelField.dragStart.x,
          pixelField.pt.y - pixelField.dragStart.y
        );
        pixelField.checkBounds();
      }

      pixelField.pixelFieldAnimation = requestAnimationFrame(
        pixelField.animate
      );

      pixelField.getHoveredPixel();

      // UPDATE TOOLTIP
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
        // console.log(pixelField.hoveredPixel);
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

    const handleScroll = (e) => {
      if (pixelField.hoveredPixel !== -1) {
        e.preventDefault();
        pixelField.adjustZoom(-e.deltaY * pixelField.SCROLL_SENSITIVITY);
        pixelField.didChangeHappen = true;
        pixelField.didScale = true;
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      handleTouch(e, handleMouseMove);
    };
    const handleTouchStart = (e) => handleTouch(e, handleMouseDown);
    const handleTouchEnd = (e) => handleTouch(e, handleMouseUp);

    if (canvasRefToolTip && canvasRefToolTip.current) {
      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mintChange", handleMintChange);
      canvasRefToolTip.current.addEventListener("click", handleClick);
      canvasRefToolTip.current.addEventListener(
        "mousedown",
        handleMouseDown,
        false
      );
      canvasRefToolTip.current.addEventListener(
        "mouseup",
        handleMouseUp,
        false
      );
      canvasRefToolTip.current.addEventListener("touchmove", handleTouchMove);
      canvasRefToolTip.current.addEventListener("touchstart", handleTouchStart);
      canvasRefToolTip.current.addEventListener("touchend", handleTouchEnd);
      window.addEventListener("wheel", handleScroll, { passive: false });
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mintChange", handleMintChange);
        canvasRefToolTip.current.removeEventListener("click", handleClick);
        canvasRefToolTip.current.removeEventListener(
          "mousedown",
          handleMouseDown
        );
        canvasRefToolTip.current.removeEventListener("mouseup", handleMouseUp);
        canvasRefToolTip.current.removeEventListener(
          "touchmove",
          handleTouchMove
        );
        canvasRefToolTip.current.removeEventListener(
          "touchstart",
          handleTouchStart
        );
        canvasRefToolTip.current.removeEventListener(
          "touchend",
          handleTouchEnd
        );
        window.removeEventListener("wheel", handleScroll);
      };
    }
  }, [data, dispatch]);

  return [canvasRefPixelMap, canvasRefToolTip, canvasRefBackground];
};

const PixelMap = () => {
  const [canvasRefPixelMap, canvasRefToolTip, canvasRefBackground] =
    useCanvas();
  // const data = useSelector((state) => state.dataMap.pixelAttributes);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(
  //     dataMapActions.updateAttributes({
  //       pixelAttributes: getAttributes(),
  //       pixelAttributeCounts: getAttributeCounts(),
  //     })
  //   );
  // }, []);

  return (
    <div className={classes.container}>
      <canvas className={classes.canvasBackground} ref={canvasRefBackground} />
      <canvas className={classes.canvasPixelMap} ref={canvasRefPixelMap} />
      <canvas className={classes.canvasToolTip} ref={canvasRefToolTip} />
    </div>
  );
};

export default PixelMap;
