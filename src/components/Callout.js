import { Link } from "react-router-dom";
import Section from "./Layout/Section";

import classes from "./Callout.module.css";

const Callout = () => {
  return (
    <Section className={classes.callout}>
      <div>
        Introducing the concept of relational value - NFTs now affect each other
        based on their physical proximity and attributes!
      </div>
      <Link to="/collection-viewer">Collection Viewer</Link>
    </Section>
  );
};

export default Callout;
