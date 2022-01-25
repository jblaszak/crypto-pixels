import { useRef, useEffect } from "react";

import classes from "./Hero.module.css";

class PixelField {
  constructor(ctx, width, height, pixelSize, pixelGap) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.pixelSize = pixelSize;
    this.pixelGap = pixelGap;
  }

  genRGB = () => {
    const PIXEL_COLORS = [
      "#ffc897",
      "#ffc796",
      "#ffead2",
      "#ffa4d4",
      "#c5c5ff",
      "#83ffc1",
      "#ffe276",
      "#ffe780",
      "#94eaeb",
      "#e7bafa",
      "#e8a68b",
      "#a4a4f4",
      "#99e2ff",
      "#f2e7ea",
      "#b3ffc7",
      "#e8a68b",
      "#80b1ff",
      "#bbefff",
      "#99e2ff",
    ];
    // return Math.floor(Math.random() * 200);
    return PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)];
  };
  drawRect = (x, y) => {
    this.ctx.fillStyle = this.genRGB();
    // this.ctx.fillStyle = `rgb(${this.genRGB()},${this.genRGB()},${this.genRGB()})`;
    this.ctx.fillRect(x, y, this.pixelSize, this.pixelSize);
  };
  drawAll = () => {
    for (let y = 0; y < this.height; y += this.pixelSize + this.pixelGap) {
      for (let x = 0; x < this.width; x += this.pixelSize + this.pixelGap) {
        this.drawRect(x, y);
      }
    }
  };
}

function useCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = 300;

    const pixelField = new PixelField(ctx, canvas.width, canvas.height, 20, 3);
    pixelField.drawAll();

    const handleResize = (e) => {
      canvas.width = document.documentElement.clientWidth;
      pixelField.width = canvas.width;
      requestAnimationFrame(() => pixelField.drawAll());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return canvasRef;
}

const Hero = () => {
  const canvasRef = useCanvas();

  return (
    <div className={classes.container}>
      <canvas ref={canvasRef} />
      <div className={classes.content}>
        <h1 className={classes.title}>Crypto Flex Pixels</h1>
        <h2 className={classes.subtitle}>
          A community of NFTs that boost each other!
        </h2>
      </div>
    </div>
  );
};

export default Hero;
