import { Link } from "react-router-dom";
import Section from "./Layout/Section";

import classes from "./Callout.module.css";

const Callout = () => {
  return (
    <Section className={classes.callout}>
      <div>
        View your pixel and see how it relates to the rest of the collection!
      </div>
      <Link to="/collection-viewer">Collection Viewer</Link>
    </Section>
  );
};

export default Callout;
