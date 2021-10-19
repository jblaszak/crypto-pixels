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
    this.flashyTime = data["f"] ? Date.now() + Math.random() * 1000 : false;
  }
  lerp = (a, b, n) => {
    return (b - a) * n + a;
  };
  getColor = () => {
    if (this.flashyTime) {
      // 100% red (255, 0, 0)
      let t = (Date.now() - this.flashyTime) % 2000;
      let red = 255;
      let green = 0;
      let blue = 0;
      //   console.log(t);
      if (t <= 500) {
        // 0% red (255, 0, 0)
        t = t / 500;
        green = this.lerp(0, 255, t);
      } else if (t <= 1000) {
        // 25% yellow (255, 255, 0)
        t = (t - 500) / 500;
        green = 255;
        red = this.lerp(255, 0, t);
      } else if (t <= 1500) {
        // 50% green (0, 255, 0)
        t = (t - 1000) / 500;
        red = 0;
        green = this.lerp(255, 0, t);
        blue = this.lerp(0, 255, t);
      } else if (t <= 2000) {
        // 75% blue (0, 0, 255)
        t = (t - 1500) / 500;
        blue = this.lerp(255, 0, t);
        red = this.lerp(0, 255, t);
      }
      //   console.log(
      //     `r: ${red.toFixed(0)}, g: ${green.toFixed(0)} b: ${blue.toFixed(0)}`
      //   );
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
  constructor(
    ctx,
    width,
    height,
    data,
    mouseX,
    mouseY,
    pixelFieldAnimation,
    didChangeHappen
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    this.pixelArray = [...Array(CONSTANTS.COLLECTION_SIZE)].map(
      (val, index) => new Pixel(ctx, data[index + 1], index + 1)
    );
    this.lastTime = 0;
    this.pixelFieldAnimation = pixelFieldAnimation;
    this.didChangeHappen = didChangeHappen;
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
    cancelAnimationFrame(this.pixelFieldAnimation);
    // const deltaTime = timeStamp - this.lastTime;
    // this.lastTime = timeStamp;
    // console.log(deltaTime);

    if (this.didChangeHappen) {
      // All pixels need to be changed!
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.pixelArray.forEach((pixel) => {
        const [isNearPixel, posMod, sizeMod] = this.isMouseNear(
          pixel.x,
          pixel.y
        );
        if (isNearPixel) {
          pixel.draw(posMod, sizeMod);
        } else {
          pixel.draw();
        }
      });

      this.didChangeHappen = false;
    } else {
      // No change in canvas size/mouse position happened, just change flashy pixels
      this.pixelArray.forEach((pixel) => {
        if (pixel.flashyTime) {
          const [isNearPixel, posMod, sizeMod] = this.isMouseNear(
            pixel.x,
            pixel.y
          );

          if (isNearPixel) {
            pixel.draw(posMod, sizeMod);
          } else {
            pixel.draw();
          }
        }
      });
    }
    this.pixelFieldAnimation = requestAnimationFrame(this.animate.bind(this));
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

    let pixelFieldAnimation;
    let didChangeHappen = true;

    const pixelField = new PixelField(
      ctx,
      canvas.width,
      canvas.height,
      data,
      initialMouseX,
      initialMouseY,
      pixelFieldAnimation,
      didChangeHappen
    );

    pixelField.pixelFieldAnimation = requestAnimationFrame(pixelField.animate);

    const handleResize = (e) => {
      cancelAnimationFrame(pixelField.pixelFieldAnimation);
      //   canvas.width = document.documentElement.clientWidth;
      //   pixelField.width = canvas.width;
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
        (e.y - (canvasCoords.top - bodyCoords.top)) *
        (CONSTANTS.INITIAL_CANVAS_WIDTH / canvasCoords.height);

      pixelField.pixelFieldAnimation = requestAnimationFrame(
        pixelField.animate
      );
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
