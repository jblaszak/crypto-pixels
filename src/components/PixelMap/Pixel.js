import * as CONSTANTS from "../../constants";

export default class Pixel {
  constructor(ctx, data, index, isMinted) {
    this.ctx = ctx;
    this.index = index;
    this.visibility = isMinted;
    this.x =
      ((index - 1) % CONSTANTS.MAX_WIDTH) *
      (CONSTANTS.PIXEL_WIDTH + CONSTANTS.PIXEL_GAP);
    this.y =
      Math.floor((index - 1) / CONSTANTS.MAX_WIDTH) *
      (CONSTANTS.PIXEL_WIDTH + CONSTANTS.PIXEL_GAP);
    this.r = data?.["d"] ? 0 : data["r"];
    this.g = data?.["d"] ? 0 : data["g"];
    this.b = data?.["d"] ? 0 : data["b"];
    this.dead = data?.["d"] ? true : false;
    this.flashyTime = data["f"] ? Date.now() + Math.random() * 1000 : false;
    this.boosting = false;
    this.boosted = false;
    this.hovered = false;
  }
  lerp = (a, b, n) => {
    return (b - a) * n + a;
  };
  getColor = () => {
    const boostColor = (type, color) => {
      let t = (Date.now() - type) % 2000;
      let r, g, b, a;
      // flash between red and original color
      // alpha * (R1,G1,B1) + (1-alpha) * (R2,G2,B2)
      if (t <= 1000) {
        t = t / 1000;
        a = this.lerp(0, 1, t);
      } else {
        t = (t - 1000) / 1000;
        a = this.lerp(1, 0, t);
      }
      r = a * (this.visibility ? this.r : 0) + (1 - a) * color.r;
      g = a * (this.visibility ? this.g : 0) + (1 - a) * color.g; // + (1-a)*0
      b = a * (this.visibility ? this.b : 0) + (1 - a) * color.b; // + (1-a)*0
      return `rgb(${r},${g},${b})`;
    };
    if (this.hovered) {
      return boostColor(this.hovered, { r: 0, g: 0, b: 255 });
    }
    if (this.boosting) {
      return boostColor(this.boosting, { r: 255, g: 0, b: 0 });
    }
    if (this.boosted) {
      return boostColor(this.boosted, { r: 0, g: 255, b: 0 });
    }
    if (!this.visibility) {
      return `rgb(0,0,0)`;
    }
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
      return `rgb(${red},${green},${blue})`;
    }
    return `rgb(${this.r},${this.g},${this.b})`;
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
