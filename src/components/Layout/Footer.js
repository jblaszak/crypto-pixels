import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.top}>
          <div>
            <h1>Crypto Flex Pixels</h1>
            <p>An innovative new NFT project.</p>
          </div>
          <div className={classes.links}>
            <Link className={classes.homeLink} to="/">
              Home
            </Link>
            <Link to="/collection-viewer">Collection Viewer</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
        <div className={classes.bottom}>
          <div>
            {`© ${new Date().getFullYear()} Crypto Flex Pixels. All rights reserved.`}
          </div>
          <div>
            <Link to="/" target="_blank" rel="noopener noreferrer">
              Twitter
            </Link>
            <Link to="/" target="_blank" rel="noopener noreferrer">
              Discord
            </Link>
            <Link to="/" target="_blank" rel="noopener noreferrer">
              Opensea
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
