import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={classes.logo}>Crypto Flex Pixels</div>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to="/" activeClassName={classes.active} exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/pixelmap" activeClassName={classes.active}>
                Pixel Map
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className={classes.spacer} />
    </React.Fragment>
  );
};

export default MainHeader;
