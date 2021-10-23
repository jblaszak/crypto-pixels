import React from "react";
import { Link } from "react-router-dom";

import classes from "./DropdownMenu.module.css";

const DropdownMenu = (props) => {
  return (
    <div
      ref={props.targetRef}
      className={classes.dropdown}
      onClick={props.onClickHandler}
    >
      <Link className={classes.link} to="/">
        Home
      </Link>
      <Link className={classes.link} to="/collection-viewer">
        Collection Viewer
      </Link>
      <a className={classes.link} href="https://twitter.com/Flex_Pixels_NFT">
        Twitter
      </a>
      <a className={classes.link} href="https://discord.gg/Epy2xtzZrx">
        Discord
      </a>
      <a className={classes.link} href="https://www.opensea.io">
        OpenSea
      </a>
    </div>
  );
};

export default DropdownMenu;
