import React, { useContext, useRef, useState } from "react";
import CryptoContext from "../store/cryptoContext";
import classes from "./SecretMinting.module.css";

const SecretMinting = () => {
  const ctx = useContext(CryptoContext);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const giveAwayRef = useRef(null);

  const populateSubmitHandler = async (event) => {
    event.preventDefault();
    const signer = ctx.provider.getSigner();
    console.log(signer);
    await ctx.contract
      .connect(signer)
      .populateAvailableTokens(startRef.current.value, endRef.current.value);
    const availableTokens = await ctx.contract.getAvailableTokensList();
    console.log("After token availability", availableTokens);
  };

  const giveAwaySubmitHandler = async (event) => {
    event.preventDefault();
    let values = giveAwayRef.current.value;
    values = values.split(",");
    values = values.map((value) => {
      const newValue = value.trim();
      return +newValue;
    });
    console.log(values);
    const signer = ctx.provider.getSigner();
    await ctx.contract.connect(signer).batchCreateGiveAway(values);
    // Apparently the timing on this is off...
    const availableTokens = await ctx.contract.getAvailableTokensList();
    console.log("After batch create: ", availableTokens);
    giveAwayRef.current.value = "";
  };

  const connectHandler = (event) => {
    ctx.connectWallet();
    console.log("Wallet connected");
  };

  const checkHandler = async (event) => {
    const availableTokens = await ctx.contract.getAvailableTokensList();
    console.log("After check: ", availableTokens);
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <div>
          <button onClick={connectHandler}>Connect Wallet</button>
          <button onClick={checkHandler}>Check available</button>
        </div>
        <div>
          <form onSubmit={populateSubmitHandler}>
            <div className={classes.formEntry}>
              <input
                ref={startRef}
                id="start"
                type="number"
                placeholder=" "
                autoComplete="off"
              />
              <label htmlFor="start">Start</label>
            </div>
            <div className={classes.formEntry}>
              <input
                ref={endRef}
                id="end"
                type="number"
                placeholder=" "
                autoComplete="off"
              />
              <label htmlFor="end">End</label>
            </div>
            <button type="submit" className={classes.findPixel}>
              Populate Tokens
            </button>
          </form>
        </div>
        <div>
          <form onSubmit={giveAwaySubmitHandler}>
            <div className={classes.formEntry}>
              <input
                ref={giveAwayRef}
                id="giveAways"
                placeholder=" "
                autoComplete="off"
              />
              <label htmlFor="giveAways">Give Away List</label>
            </div>
            <button type="submit" className={classes.findPixel}>
              Create Give Aways
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SecretMinting;
