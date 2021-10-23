// import { Link } from "react-router-dom";

import classes from "./IconLinks.module.css";

const IconLinks = () => {
  return (
    <div className={classes.iconLinks}>
      <div>
        <a
          className={classes.twitter}
          href="https://twitter.com/Flex_Pixels_NFT"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          {" "}
        </a>
      </div>
      <div>
        <a
          className={classes.discord}
          href="https://discord.gg/Epy2xtzZrx"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
        >
          {" "}
        </a>
      </div>
      <div>
        <a
          className={classes.opensea}
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="OpenSea"
        >
          {" "}
        </a>
      </div>
    </div>
  );
};

export default IconLinks;
