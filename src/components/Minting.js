import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";

import { updateStatus } from "../helpers/updateStatus";
import { mintActions } from "../store/mint-slice";
import * as CONSTANTS from "../constants";
import CryptoFlexPixelsNFT from "../artifacts/contracts/CryptoFlexPixelsNFT.sol/CryptoFlexPixelsNFT.json";

import Section from "./Layout/Section";
import CryptoContext from "../store/cryptoContext";
import classes from "./Minting.module.css";

const Minting = () => {
  const ctx = useContext(CryptoContext);
  const mintCount = useSelector((state) => state.mint.mintCount);
  const mintFee = useSelector((state) => state.mint.mintFee);
  const dispatch = useDispatch();

  const mint = async () => {
    console.log("minting new token");
    const mintNewToken = async () => {
      const provider = ctx.provider;
      const contract = ctx.contract;
      const signer = provider.getSigner();

      let tx = await contract.connect(signer).create({ value: mintFee });
      tx = await tx.wait();
      const address = tx.events[0].args[1].toString();
      const tokenId = tx.events[0].args[2].toNumber();
      return [address, tokenId];
    };

    try {
      const [address, tokenId] = await mintNewToken();
      console.log("minted: ", tokenId);
      updateStatus(
        "success",
        `You minted CFP #${tokenId}! Congrats!`,
        dispatch
      );
    } catch (error) {
      console.log("There was an error minting!", error);
      if (error.message.includes("insufficient funds")) {
        updateStatus("error", "Failed to mint: insufficient funds.", dispatch);
      }
    }
  };

  let message = (
    <React.Fragment>
      <div className={classes.message}>
        Total Minted: <span>{mintCount}/10000</span>
      </div>
      <div className={classes.mintFee}>
        Current Mint Fee: <span>{(mintFee / 10 ** 18).toFixed(6)} MATIC</span>
      </div>
      {ctx.isWalletConnected ? (
        <button onClick={mint}>Flex 💪 Your Crypto</button>
      ) : (
        <button onClick={ctx.connectWallet}>Connect Wallet to Mint</button>
      )}
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
