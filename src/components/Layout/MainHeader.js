import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.logo}>Crypto Flex Pixels</div>
          <nav className={classes.nav}>
            <ul>
              <li>
                <NavLink to="/" activeClassName={classes.active} exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/collection-viewer"
                  activeClassName={classes.active}
                >
                  Collection Viewer
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className={classes.spacer} />
    </React.Fragment>
  );
};

export default MainHeader;
