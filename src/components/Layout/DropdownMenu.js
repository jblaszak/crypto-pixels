import React from "react";
import * as CONSTANTS from "../../constants";

import classes from "./DropdownMenu.module.css";

const DropdownMenu = (props) => {
  return (
    <div
      ref={props.targetRef}
      className={classes.dropdown}
      onClick={props.onClickHandler}
    >
      <a className={classes.link} to="/">
        Perfect Pixels Club
      </a>
      <a className={classes.link} href="https://twitter.com/Flex_Pixels_NFT">
        Twitter
      </a>
      <a className={classes.link} href="https://discord.gg/Epy2xtzZrx">
        Discord
      </a>
      <a className={classes.link} href="https://www.opensea.io">
        OpenSea
      </a>
      <a
        href={`https://polygonscan.com/address/${CONSTANTS.CONTRACT_ADDRESS}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Smart Contract"
        className={classes.link}
      >
        Smart Contract
      </a>
    </div>
  );
};

export default DropdownMenu;
