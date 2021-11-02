import { Fragment } from "react";
import Footer from "./Footer";
import MainHeader from "./MainHeader";

import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <main>
        <div className={classes.spacer}></div>
        {props.children}
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
