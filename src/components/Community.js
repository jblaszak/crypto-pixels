import { Link } from "react-router-dom";

import classes from "./Community.module.css";
import Section from "./Layout/Section";
import Card from "./UI/Card";

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
          <Link to="/" target="_blank" rel="noopener noreferrer">
            Join Our Discord
          </Link>
        </Card>
      </div>
    </Section>
  );
};

export default Community;
