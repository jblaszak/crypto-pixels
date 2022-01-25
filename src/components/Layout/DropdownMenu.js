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
      <a className={classes.link} href={CONSTANTS.TWITTER}>
        Twitter
      </a>
      <a className={classes.link} href={CONSTANTS.DISCORD}>
        Discord
      </a>
      <a className={classes.link} href={CONSTANTS.OPENSEA}>
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
