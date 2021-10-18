import { Fragment } from "react";
import Footer from "./Footer";
import MainHeader from "./MainHeader";

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
