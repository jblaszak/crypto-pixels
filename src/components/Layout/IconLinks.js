// import { Link } from "react-router-dom";

import * as CONSTANTS from "../../constants";

import classes from "./IconLinks.module.css";

const IconLinks = () => {
  return (
    <div className={classes.iconLinks}>
      <div>
        <a
          className={classes.twitter}
          href={CONSTANTS.TWITTER}
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
          href={CONSTANTS.DISCORD}
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
          href={CONSTANTS.OPENSEA}
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
