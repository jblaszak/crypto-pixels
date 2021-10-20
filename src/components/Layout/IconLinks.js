import { Link } from "react-router-dom";

import classes from "./IconLinks.module.css";

const IconLinks = () => {
  return (
    <div className={classes.iconLinks}>
      <div>
        <Link
          className={classes.twitter}
          to="/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
      <div>
        <Link
          className={classes.discord}
          to="/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
      <div>
        <Link
          className={classes.opensea}
          to="/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </div>
  );
};

export default IconLinks;
