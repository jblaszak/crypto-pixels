import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateStatus } from "../helpers/updateStatus";

import Section from "./Layout/Section";
import CryptoContext from "../store/cryptoContext";
import classes from "./Minting.module.css";

const Minting = () => {
  const ctx = useContext(CryptoContext);
  const mintCount = useSelector((state) => state.mint.mintCount);
  const mintFee = useSelector((state) => state.mint.mintFee);
  const [isMinting, setIsMinting] = useState(false);

  const dispatch = useDispatch();

  const mint = async () => {
    const mintNewToken = async () => {
      const provider = ctx.provider;
      const contract = ctx.contract;
      const signer = provider.getSigner();

      let tx = await contract.connect(signer).create({ value: mintFee });
      setIsMinting(true);
      // console.log("tx", tx);
      tx = await tx.wait();
      // console.log("tx", tx.events);
      setIsMinting((prevState) => false);
      const event = tx.events[2];
      const address = event.args[0].toString();
      const tokenId = event.args[1].toNumber();
      return [address, tokenId];
    };

    try {
      const [address, tokenId] = await mintNewToken();
      updateStatus(
        "success",
        `You minted CFP #${tokenId}! Congrats!`,
        dispatch
      );
    } catch (error) {
      console.log("There was an error minting!", error);
      if (
        error?.message.includes("insufficient funds") ||
        error?.data?.message.includes("Insufficient funds!")
      ) {
        updateStatus("error", "Failed to mint: insufficient funds.", dispatch);
      } else if (
        error?.data?.message.includes(
          "Already minted max amount for this address!"
        )
      ) {
        updateStatus(
          "error",
          "Failed to mint: max amount minted for this address (20).",
          dispatch
        );
      } else if (error?.data?.message.includes("No tokens left")) {
        updateStatus("error", "Failed to mint: no tokens left!", dispatch);
      } else if (
        error?.data?.message.includes("Giveaway tokens not minted yet!")
      ) {
        updateStatus(
          "error",
          "Failed to mint: giveaways not minted yet.",
          dispatch
        );
      } else if (error.includes("transaction failed")) {
        updateStatus(
          "error",
          "Transaction failed. Not enough gas? :/",
          dispatch
        );
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
      {isMinting && (
        <div className={classes.isMinting}>
          Minting your pixel: <span></span>
        </div>
      )}
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
