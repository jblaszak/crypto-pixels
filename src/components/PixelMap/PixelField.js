import Pixel from "./Pixel";
import * as CONSTANTS from "../../constants";

export default class PixelField {
  constructor(
    ctx,
    width,
    height,
    data,
    pixelFieldAnimation,
    didChangeHappen,
    mintedPixels
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.mouseX = 0;
    this.mouseY = 0;
    this.hoveredPixel = -1;
    this.pixelArray = [...Array(CONSTANTS.COLLECTION_SIZE)].map(
      (val, index) => {
        if (mintedPixels.includes(index + 1)) {
          return new Pixel(ctx, data[index + 1], index + 1, true);
        } else {
          return new Pixel(ctx, data[index + 1], index + 1, false);
        }
      }
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
  getHoveredPixel = () => {
    // Is mouse outside of canvas
    if (
      this.mouseX < 0 ||
      this.mouseY < 0 ||
      this.mouseX >= CONSTANTS.INITIAL_CANVAS_WIDTH ||
      this.mouseY >= CONSTANTS.INITIAL_CANVAS_WIDTH
    ) {
      this.hoveredPixel = -1;
      return;
    }

    // Find pixel index
    const pixelXCoord = Math.floor(
      this.mouseX / (CONSTANTS.PIXEL_WIDTH + CONSTANTS.PIXEL_GAP)
    );
    const pixelYCoord = Math.floor(
      this.mouseY / (CONSTANTS.PIXEL_WIDTH + CONSTANTS.PIXEL_GAP)
    );
    this.hoveredPixel = pixelXCoord + 1 + pixelYCoord * 100;
  };
  animate = (timeStamp) => {
    cancelAnimationFrame(this.pixelFieldAnimation);
    // const deltaTime = timeStamp - this.lastTime;
    // this.lastTime = timeStamp;
    // console.log(deltaTime);

    if (this.didChangeHappen) {
      // All pixels need to be changed!
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.getHoveredPixel();

      this.pixelArray.forEach((pixel) => {
        // Check if mouse is near pixel
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
