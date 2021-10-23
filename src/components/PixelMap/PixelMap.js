import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import PixelField from "./PixelField";
import Card from "../UI/Card";

import { dataMapActions } from "../../store/dataMap-slice";
import * as CONSTANTS from "../../constants";

import classes from "./PixelMap.module.css";

const useCanvas = () => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.dataMap.pixelAttributes);
  // const selectedPixel = useSelector((state) => state.dataMap.selectedPixel);

  const initialMouseX = 0;
  const initialMouseY = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = CONSTANTS.INITIAL_CANVAS_WIDTH;
    canvas.height = CONSTANTS.INITIAL_CANVAS_WIDTH;

    let pixelFieldAnimation;
    const didChangeHappen = true;
    const hoveredPixel = -1;

    const pixelField = new PixelField(
      ctx,
      canvas.width,
      canvas.height,
      data,
      initialMouseX,
      initialMouseY,
      pixelFieldAnimation,
      didChangeHappen,
      hoveredPixel
    );

    pixelField.pixelFieldAnimation = requestAnimationFrame(pixelField.animate);

    const handleResize = (e) => {
      cancelAnimationFrame(pixelField.pixelFieldAnimation);

      pixelField.didChangeHappen = true;

      pixelField.pixelFieldAnimation = requestAnimationFrame(
        pixelField.animate
      );
    };

    const handleMouseMove = (e) => {
      cancelAnimationFrame(pixelField.pixelFieldAnimation);

      pixelField.didChangeHappen = true;

      const bodyCoords = document.body.getBoundingClientRect();
      const canvasCoords = canvas.getBoundingClientRect();

      pixelField.mouseX =
        (e.x - (canvasCoords.left - bodyCoords.left)) *
        (CONSTANTS.INITIAL_CANVAS_WIDTH / canvasCoords.width);
      pixelField.mouseY =
        (e.y + window.scrollY - (canvasCoords.top - bodyCoords.top)) *
        (CONSTANTS.INITIAL_CANVAS_WIDTH / canvasCoords.height);

      pixelField.pixelFieldAnimation = requestAnimationFrame(
        pixelField.animate
      );
    };

    const handleClick = (e) => {
      if (pixelField.hoveredPixel !== -1) {
        dispatch(dataMapActions.updateSelectedPixel(pixelField.hoveredPixel));
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [data, dispatch]);

  return canvasRef;
};

const PixelMap = () => {
  const canvasRef = useCanvas();

  return (
    <Card>
      <canvas className={classes.canvas} ref={canvasRef} />
    </Card>
  );
};

export default PixelMap;
