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
    this.color = data["d"]
      ? "rgb(0,0,0)"
      : `rgb(${data["r"]},${data["g"]},${data["b"]})`;
    this.flashyTime = data["f"] ? Date.now() + Math.random() * 1000 : false;
  }
  lerp = (a, b, n) => {
    return (b - a) * n + a;
  };
  getColor = () => {
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
