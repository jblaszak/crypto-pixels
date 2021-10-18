import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import Card from "./UI/Card";
import * as CONSTANTS from "../constants/";

import classes from "./CollectionViewer.module.css";

class Pixel {
  constructor(ctx, data, index) {
    this.ctx = ctx;
    this.x =
      ((index - 1) % CONSTANTS.MAX_WIDTH) *
      (CONSTANTS.PIXEL_WIDTH + CONSTANTS.PIXEL_GAP);
    this.y =
      Math.floor((index - 1) / CONSTANTS.MAX_WIDTH) *
      (CONSTANTS.PIXEL_WIDTH + CONSTANTS.PIXEL_GAP);
    this.color = data["d"]
      ? "rgb(0,0,0)"
      : `rgb(${data["r"]},${data["g"]},${data["b"]})`;
    this.flashyTime = data["f"] ? Date.now() : false;
  }
  lerp = (a, b, n) => {
    return (b - a) * n + a;
  };
  getColor = () => {
    if (this.flashyTime) {
      const n = (Date.now() - this.flashyTime) * 0.001;
      const red = this.lerp(0, 255, n);
      const green = this.lerp(0, 255, n);
      const blue = this.lerp(0, 255, n);
      return `rgb(${red},${green},${blue})`;
    } else {
      return this.color;
    }
  };
  draw = (posMod = 0, sizeMod = 1) => {
    if (sizeMod === 1) {
      this.ctx.fillStyle = this.getColor();
      this.ctx.fillRect(
        this.x + posMod * CONSTANTS.PIXEL_WIDTH * 0.5,
        this.y + posMod * CONSTANTS.PIXEL_WIDTH * 0.5,
        CONSTANTS.PIXEL_WIDTH * sizeMod,
        CONSTANTS.PIXEL_WIDTH * sizeMod
      );
    } else {
      // This way seems more expensive computationally so only do it if you need to!
      const pixelWidth = CONSTANTS.PIXEL_WIDTH * sizeMod;
      const halfPixel = CONSTANTS.PIXEL_WIDTH * 0.5;
      const pixelPosition = posMod * halfPixel;
      this.ctx.strokeStyle = this.getColor();
      this.ctx.lineWidth = pixelWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(
        this.x + pixelPosition,
        this.y + pixelPosition + halfPixel
      );
      this.ctx.lineTo(
        this.x + pixelPosition + pixelWidth,
        this.y + pixelPosition + halfPixel
      );
      this.ctx.stroke();
    }
  };
}

class PixelField {
  constructor(ctx, width, height, data, mouseX, mouseY) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    this.pixelArray = [...Array(CONSTANTS.COLLECTION_SIZE)].map(
      (val, index) => new Pixel(ctx, data[index + 1], index + 1)
    );
    this.lastTime = 0;
  }
  isMouseNear = (x, y) => {
    let dx = this.mouseX - x;
    let dy = this.mouseY - y;
    let distance = dx * dx + dy * dy;

    // posMod min: 0, max: 1, min at threshold
    // sizeMod min: 0, max: 1, max at threshold
    if (distance <= CONSTANTS.DISTANCE_THRESHOLD) {
      const x = distance / CONSTANTS.DISTANCE_THRESHOLD;
      const modValue = 2 * x * x - 2 * x + 1;
      // Math.cos((distance * 2 * Math.PI) / CONSTANTS.DISTANCE_THRESHOLD) *
      //   0.25 +
      // 0.75;

      return [true, 1 - modValue, modValue];
    } else {
      return [false, null, null];
    }
  };
  animate = (timeStamp) => {
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
    console.log(deltaTime);

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.pixelArray.forEach((pixel) => {
      const [isNearPixel, posMod, sizeMod] = this.isMouseNear(pixel.x, pixel.y);
      if (isNearPixel) {
        pixel.draw(posMod, sizeMod);
      } else {
        pixel.draw();
      }
    });
  };
}

const useCanvas = () => {
  const canvasRef = useRef(null);

  const data = useSelector((state) => state.dataMap.pixelAttributes);

  const initialMouseX = 0;
  const initialMouseY = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = CONSTANTS.INITIAL_CANVAS_WIDTH;
    canvas.height = CONSTANTS.INITIAL_CANVAS_WIDTH;

    const pixelField = new PixelField(
      ctx,
      canvas.width,
      canvas.height,
      data,
      initialMouseX,
      initialMouseY
    );

    let pixelFieldAnimation = requestAnimationFrame(pixelField.animate);

    const handleResize = (e) => {
      cancelAnimationFrame(pixelFieldAnimation);
      //   canvas.width = document.documentElement.clientWidth;
      //   pixelField.width = canvas.width;
      pixelFieldAnimation = requestAnimationFrame(pixelField.animate);
    };

    const handleMouseMove = (e) => {
      cancelAnimationFrame(pixelFieldAnimation);
      const bodyCoords = document.body.getBoundingClientRect();
      const canvasCoords = canvas.getBoundingClientRect();
      pixelField.mouseX =
        (e.x - (canvasCoords.left - bodyCoords.left)) *
        (CONSTANTS.INITIAL_CANVAS_WIDTH / canvasCoords.width);
      pixelField.mouseY =
        (e.y - (canvasCoords.top - bodyCoords.top)) *
        (CONSTANTS.INITIAL_CANVAS_WIDTH / canvasCoords.height);
      pixelFieldAnimation = requestAnimationFrame(pixelField.animate);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [data]);

  return canvasRef;
};

const CollectionViewer = () => {
  const canvasRef = useCanvas();

  return (
    <Card>
      <canvas className={classes.canvas} ref={canvasRef} />
    </Card>
  );
};

export default CollectionViewer;
