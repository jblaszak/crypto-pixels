import Section from "./Layout/Section";
import { useSelector } from "react-redux";

import classes from "./Minting.module.css";
import React from "react";

const Minting = () => {
  const mintCount = useSelector((state) => state.mint.mintCount);
  const mintFee = useSelector((state) => state.mint.mintFee);

  const mintHandler = (e) => {};

  let message = (
    <React.Fragment>
      <div className={classes.message}>
        Total Minted: <span>{mintCount}/10000</span>
      </div>
      <div className={classes.mintFee}>
        Current Mint Fee: <span>{mintFee} MATIC</span>
      </div>
      <button onClick={mintHandler}>Flex 💪 Your Crypto</button>
    </React.Fragment>
  );
  if (mintCount === 10000) {
    message = (
      <div className={classes.message}>
        All Crypto Flex Pixel NFTs have minted! Stay tuned for further projects!
      </div>
    );
  }

  return <Section className={classes.container}>{message}</Section>;
};

export default Minting;
