export default class ToolTip {
  constructor(ctx, width, height, toolTipAnimation) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.mouseX = 0;
    this.mouseY = 0;
    this.text = "";
    this.toolTipAnimation = toolTipAnimation;

    this.ctx.font = "bold 16px sans-serif";
    this.ctx.textBaseline = "top";
    this.textBoxHeight = 22;
    this.textBoxPadding = 8;
  }
  getOffSets = (textWidth) => {
    let offsetX;
    let offsetY;

    if (this.mouseX <= 0.5 * this.width) {
      offsetX = 40;
    } else {
      offsetX = -40 - this.textBoxPadding - textWidth;
    }

    if (this.mouseY <= 0.5 * this.width) {
      offsetY = 40;
    } else {
      offsetY = -40 - this.textBoxHeight;
    }

    return [offsetX, offsetY];
  };
  animate = (timeStamp) => {
    cancelAnimationFrame(this.toolTipAnimation);
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.text.length > 0) {
      // background
      this.ctx.fillStyle = "black";
      const width = this.ctx.measureText(this.text).width;
      const [offsetX, offsetY] = this.getOffSets(width);
      this.ctx.fillRect(
        this.mouseX + offsetX,
        this.mouseY + offsetY,
        width + this.textBoxPadding,
        this.textBoxHeight
      );

      // text
      this.ctx.fillStyle = "white";
      this.ctx.fillText(
        this.text,
        this.mouseX + offsetX + this.textBoxPadding * 0.5,
        this.mouseY + offsetY + this.textBoxPadding * 0.5
      );
    }

    this.toolTipAnimation = requestAnimationFrame(this.animate.bind(this));
  };
}
