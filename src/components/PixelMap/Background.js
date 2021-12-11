export default class Background {
  constructor(ctx, width, height, backgroundAnimation) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.backgroundAnimation = backgroundAnimation;

    // init image data with black pixels
    this.image = this.ctx.createImageData(this.width, this.height);
    for (let i = 0; i < this.image.data.length; i += 4) {
      this.image.data[i] = 0; // R
      this.image.data[i + 1] = 0; // G
      this.image.data[i + 2] = 0; // B
      this.image.data[i + 3] = 255; // A
    }

    // size of our height maps
    this.mapSize = 2 * this.width;
    this.heightMap1 = [];

    // returns the distance of point x,y from the origin 0,0
    const distance = (x, y) => Math.sqrt(x * x + y * y);

    // init height map 1
    for (let u = 0; u < this.mapSize; u++) {
      for (let v = 0; v < this.mapSize; v++) {
        // index of coordinate in height map array
        const i = u * this.mapSize + v;

        // u,v are coordinates with origin at upper left corner
        // cx and cy are coordinates with origin at the
        // center of the map
        const cx = u - this.mapSize / 2;
        const cy = v - this.mapSize / 2;

        // distance from middle of map
        const d = distance(cx, cy);

        // stretching so we get the desired ripple density on our map
        const stretch = (3 * Math.PI) / (this.mapSize / 2);

        // wavy height value between -1 and 1
        const ripple = Math.sin(d * stretch);

        // wavy height value normalized to 0..1
        const normalized = (ripple + 1) / 2;

        // height map value 0..128, integer
        this.heightMap1[i] = Math.floor(normalized * 128);
      }
    }

    this.heightMap2 = [];
    for (let u = 0; u < this.mapSize; u++) {
      for (let v = 0; v < this.mapSize; v++) {
        const i = u * this.mapSize + v;
        const cx = u - this.mapSize / 2;
        const cy = v - this.mapSize / 2;

        // skewed distance as input to chaos field calculation,
        // scaled for smoothness over map distance
        const d1 = distance(0.8 * cx, 1.3 * cy) * 0.022;
        const d2 = distance(1.35 * cx, 0.45 * cy) * 0.022;

        const s = Math.sin(d1);
        const c = Math.cos(d2);
        // height value between -2 and +2
        const h = s + c;

        // height value between 0..1
        const normalized = (h + 2) / 4;
        // height value between 0..127, integer
        this.heightMap2[i] = Math.floor(normalized * 127);
      }
    }

    // offsets for moving height maps
    this.dx1 = 0;
    this.dy1 = 0;

    this.dx2 = 0;
    this.dy2 = 0;
  }

  // adjust height maps offsets
  moveHeightMaps = (t) => {
    this.dx1 = Math.floor(
      (((Math.cos(t * 0.0002 + 0.4 + Math.PI) + 1) / 2) * this.mapSize) / 2
    );
    this.dy1 = Math.floor(
      (((Math.cos(t * 0.0003 - 0.1) + 1) / 2) * this.mapSize) / 2
    );
    this.dx2 = Math.floor(
      (((Math.cos(t * -0.0002 + 1.2) + 1) / 2) * this.mapSize) / 2
    );
    this.dy2 = Math.floor(
      (((Math.cos(t * -0.0003 - 0.8 + Math.PI) + 1) / 2) * this.mapSize) / 2
    );
  };

  updateImageData = () => {
    for (let u = 0; u < this.width; u++) {
      for (let v = 0; v < this.height; v++) {
        // indexes into height maps for pixel
        const i = (u + this.dy1) * this.mapSize + (v + this.dx1);
        const k = (u + this.dy2) * this.mapSize + (v + this.dx2);

        // index for pixel in image data
        // remember it's 4 bytes per pixel
        const j = u * this.width * 4 + v * 4;

        // height value of 0..255
        let h = Math.floor((this.heightMap1[i] + this.heightMap2[k]) * 0.3);

        // set pixel data
        this.image.data[j] = h;
        this.image.data[j + 1] = h;
        this.image.data[j + 2] = h;
      }
    }
  };

  animate = (timeStamp) => {
    cancelAnimationFrame(this.backgroundAnimation);

    this.moveHeightMaps(timeStamp);
    this.updateImageData();

    this.ctx.putImageData(this.image, 0, 0);

    this.backgroundAnimation = requestAnimationFrame(this.animate.bind(this));
  };
}
