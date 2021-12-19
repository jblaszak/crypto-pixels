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
    mintedPixels,
    boostedByFunc,
    boostedFunc
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.mouseX = 0;
    this.mouseY = 0;
    this.hoveredPixel = -1;
    this.lastHoveredPixel = -1;
    this.cameraZoom = 1;
    this.lastZoom = this.cameraZoom;
    this.MIN_ZOOM = 1;
    this.MAX_ZOOM = 5;
    this.SCROLL_SENSITIVITY = 0.005;
    this.didScale = false;
    this.trackTransforms();
    this.pt = this.ctx.transformedPoint(this.mouseX, this.mouseY);
    this.dragged = false;
    this.dragStart = null;
    this.initialPinchDistance = null;
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
    this.boostedBy = (pixel) => boostedByFunc(pixel);
    this.boosted = (pixel) => boostedFunc(pixel);
  }
  // Adds ctx.getTransform() - returns an SVGMatrix
  // Adds ctx.transformedPoint(x,y) - returns an SVGPoint
  trackTransforms = () => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let xform = svg.createSVGMatrix();
    this.ctx.getTransform = () => {
      return xform;
    };

    const savedTransforms = [];
    const save = this.ctx.save;
    this.ctx.save = () => {
      savedTransforms.push(xform.translate(0, 0));
      return save.call(this.ctx);
    };

    const restore = this.ctx.restore;
    this.ctx.restore = () => {
      xform = savedTransforms.pop();
      return restore.call(this.ctx);
    };

    const scale = this.ctx.scale;
    this.ctx.scale = (sx, sy) => {
      xform = xform.scaleNonUniform(sx, sy);
      return scale.call(this.ctx, sx, sy);
    };

    const rotate = this.ctx.rotate;
    this.ctx.rotate = (radians) => {
      xform = xform.rotate((radians * 180) / Math.PI);
      return rotate.call(this.ctx, radians);
    };

    const translate = this.ctx.translate;
    this.ctx.translate = (dx, dy) => {
      xform = xform.translate(dx, dy);
      return translate.call(this.ctx, dx, dy);
    };

    const transform = this.ctx.transform;
    this.ctx.transform = (a, b, c, d, e, f) => {
      const m2 = svg.createSVGMatrix();
      m2.a = a;
      m2.b = b;
      m2.c = c;
      m2.d = d;
      m2.e = e;
      m2.f = f;
      xform = xform.multiply(m2);
      return transform.call(this.ctx, a, b, c, d, e, f);
    };

    const setTransform = this.ctx.setTransform;
    this.ctx.setTransform = (a, b, c, d, e, f) => {
      xform.a = a;
      xform.b = b;
      xform.c = c;
      xform.d = d;
      xform.e = e;
      xform.f = f;
      return setTransform.call(this.ctx, a, b, c, d, e, f);
    };

    const pt = svg.createSVGPoint();
    this.ctx.transformedPoint = (x, y) => {
      pt.x = x;
      pt.y = y;
      return pt.matrixTransform(xform.inverse());
    };
  };

  isMouseNear = (x, y) => {
    let dx = this.pt.x - x;
    let dy = this.pt.y - y;
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
    this.pt = this.ctx.transformedPoint(this.mouseX, this.mouseY);

    // Is mouse outside of canvas
    if (
      this.pt.x < 0 ||
      this.pt.y < 0 ||
      this.pt.x >= CONSTANTS.INITIAL_CANVAS_WIDTH ||
      this.pt.y >= CONSTANTS.INITIAL_CANVAS_WIDTH
    ) {
      this.lastHoveredPixel = this.hoveredPixel;
      this.hoveredPixel = -1;
      return;
    }

    // Find pixel index
    const pixelXCoord = Math.floor(
      this.pt.x / (CONSTANTS.PIXEL_WIDTH + CONSTANTS.PIXEL_GAP)
    );
    const pixelYCoord = Math.floor(
      this.pt.y / (CONSTANTS.PIXEL_WIDTH + CONSTANTS.PIXEL_GAP)
    );

    this.lastHoveredPixel = this.hoveredPixel;
    this.hoveredPixel = pixelXCoord + 1 + pixelYCoord * 100;

    if (this.lastHoveredPixel !== this.hoveredPixel) {
      this.updateBoosting(this.lastHoveredPixel, false);
      this.updateBoosted(this.lastHoveredPixel, false);
      this.updateBoosting(this.hoveredPixel, Date.now() + Math.random() * 1000);
      this.updateBoosted(this.hoveredPixel, Date.now() + Math.random() * 1000);
    }
  };
  updateBoosting = (pixel, status) => {
    if (pixel !== -1) {
      const boostedByPixels = this.boostedBy(pixel);
      for (const pixelIndex of boostedByPixels) {
        this.pixelArray[+pixelIndex - 1].boosting = status;
      }
    }
  };
  updateBoosted = (pixel, status) => {
    if (pixel !== -1) {
      const boostedPixels = this.boosted(pixel);
      for (const pixelIndex of boostedPixels) {
        this.pixelArray[+pixelIndex - 1].boosted = status;
      }
    }
  };
  adjustZoom = (zoomAmount, zoomFactor) => {
    if (!this.isDragging) {
      this.lastZoom = this.cameraZoom;
      if (zoomAmount) {
        this.cameraZoom += zoomAmount;
      } else if (zoomFactor) {
        this.cameraZoom = zoomFactor ** 0.25 * this.lastZoom;
      }

      this.cameraZoom = Math.min(this.cameraZoom, this.MAX_ZOOM);
      this.cameraZoom = Math.max(this.cameraZoom, this.MIN_ZOOM);

      if (this.lastZoom !== this.cameraZoom) {
        const scaleFactor = this.cameraZoom / this.lastZoom;

        this.ctx.translate(this.pt.x, this.pt.y);
        this.ctx.scale(scaleFactor, scaleFactor);
        this.ctx.translate(-this.pt.x, -this.pt.y);

        this.checkBounds();
        this.didChangeHappen = true;
      }
      // console.log("after", this.cameraZoom);
    }
  };
  checkBounds = () => {
    const topLeft = this.ctx.transformedPoint(0, 0);
    const bottomRight = this.ctx.transformedPoint(800, 800);

    if (topLeft.x < 0) this.ctx.translate(topLeft.x, 0);
    if (topLeft.y < 0) this.ctx.translate(0, topLeft.y);
    if (bottomRight.x > 800) this.ctx.translate(bottomRight.x - 800, 0);
    if (bottomRight.y > 800) this.ctx.translate(0, bottomRight.y - 800);
  };
  drawPixel = (pixel) => {
    // Check if mouse is near pixel
    const [isNearPixel, posMod, sizeMod] = this.isMouseNear(pixel.x, pixel.y);
    if (isNearPixel) {
      pixel.draw(posMod, sizeMod);
    } else {
      pixel.draw();
    }
  };
  animate = (timeStamp) => {
    cancelAnimationFrame(this.pixelFieldAnimation);
    this.pt = this.ctx.transformedPoint(this.mouseX, this.mouseY);

    if (this.didChangeHappen) {
      // All pixels need to be changed!
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.getHoveredPixel();

      this.pixelArray.forEach((pixel) => {
        this.drawPixel(pixel);
      });

      this.didChangeHappen = false;
    } else {
      // No change in canvas size/mouse position happened, just change flashy pixels
      this.pixelArray.forEach((pixel) => {
        if (pixel.flashyTime) {
          this.drawPixel(pixel);
        }
      });

      const boostedByPixels = this.boostedBy(this.hoveredPixel);
      for (const pixelIndex of boostedByPixels) {
        this.drawPixel(this.pixelArray[+pixelIndex - 1]);
      }

      const boostedPixels = this.boosted(this.hoveredPixel);
      for (const pixelIndex of boostedPixels) {
        this.drawPixel(this.pixelArray[+pixelIndex - 1]);
      }
    }
    this.pixelFieldAnimation = requestAnimationFrame(this.animate.bind(this));
  };
}
