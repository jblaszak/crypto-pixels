import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Web3Modal from "web3modal";
import { ethers } from "ethers";
import CryptoFlexPixelsNFT from "../artifacts/contracts/CryptoFlexPixelsNFT.sol/CryptoFlexPixelsNFT.json";
import { contractAddress } from "../config";
import { getMintInfo, mint, setupWeb3 } from "../store/mint-actions";

import Section from "./Layout/Section";

import classes from "./Minting.module.css";

const Minting = () => {
  const mintCount = useSelector((state) => state.mint.mintCount);
  const mintFee = useSelector((state) => state.mint.mintFee);
  const dispatch = useDispatch();

  const mintHandler = (e) => {
    dispatch(mint(mintFee));
  };

  useEffect(() => {
    dispatch(setupWeb3());
    if (mintCount === 0) {
      dispatch(getMintInfo());
    }
  }, []);

  let message = (
    <React.Fragment>
      <div className={classes.message}>
        Total Minted: <span>{mintCount}/10000</span>
      </div>
      <div className={classes.mintFee}>
        Current Mint Fee: <span>{(mintFee / 10 ** 18).toFixed(6)} MATIC</span>
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
