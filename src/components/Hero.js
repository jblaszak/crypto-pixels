import { useCanvas } from "../hooks/useCanvas";

import classes from "./Hero.module.css";

const Hero = () => {
  const canvasRef = useCanvas();

  return (
    <div className={classes.container}>
      <canvas className={classes.hero} ref={canvasRef} />
      <div className={classes.content}>
        <h1 className={classes.title}>Crypto Flex Pixels</h1>
        <h2 className={classes.subtitle}>An innovative new NFT project</h2>
      </div>
    </div>
  );
};

export default Hero;
