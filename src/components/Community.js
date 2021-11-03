import Section from "./Layout/Section";
import Card from "./UI/Card";
import * as CONSTANTS from "../constants";

import classes from "./Community.module.css";

const Community = () => {
  return (
    <Section>
      <div className={classes.container}>
        <Card className={classes.community}>
          <h1>Join Our Community</h1>
          <p>
            Trying to decide which pixel to get? Discuss with others on which
            attributes hold the most value! Join us to get the news as soon as
            possible and follow our latest announcements.
          </p>
          <a
            href={CONSTANTS.DISCORD}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join our discord"
          >
            Join Our Discord
          </a>
        </Card>
      </div>
    </Section>
  );
};

export default Community;
