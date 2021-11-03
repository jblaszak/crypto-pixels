import Section from "./Layout/Section";

import classes from "./OpenSea.module.css";
import * as CONSTANTS from "../constants";

const OpenSea = () => {
  return (
    <Section className={classes.opensea}>
      <div className={classes.description}>
        After-mint sales of Crypto Flex Pixels can be found on the OpenSea
        marketplace.
      </div>
      <div className={classes.link}>
        <a
          href={CONSTANTS.OPENSEA}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Collection on OpenSea"
        >
          View Collection on OpenSea
        </a>
      </div>
    </Section>
  );
};

export default OpenSea;
