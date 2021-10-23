import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

import useOutsideCheck from "../../hooks/useOutsideCheck";
import useResponsive from "../../hooks/useResponsive";

import IconLinks from "./IconLinks";
import DropdownMenu from "./DropdownMenu";

import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  const isSmallScreen = useResponsive("(max-width: 650px)");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const onClickHandler = (e) => {
    setOpen(!open);
  };

  useOutsideCheck(dropdownRef, onClickHandler);

  let navbar = (
    <nav className={classes.navbar}>
      <ul className={classes.nav}>
        <li>
          <NavLink to="/" activeClassName={classes.active} exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/collection-viewer" activeClassName={classes.active}>
            Collection Viewer
          </NavLink>
        </li>
      </ul>
      <IconLinks />
    </nav>
  );

  if (isSmallScreen) {
    navbar = (
      <nav className={classes.navbar}>
        <ul className={classes.nav}>
          <li>
            <button
              href="#"
              className={classes.hamburger}
              onClick={onClickHandler}
            >
              ≡
            </button>
            {open && (
              <DropdownMenu
                targetRef={dropdownRef}
                onClickHandler={onClickHandler}
              />
            )}
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.logo}>Crypto Flex Pixels</div>
          {navbar}
        </div>
      </header>
      <div className={classes.spacer} />
    </React.Fragment>
  );
};

export default MainHeader;
