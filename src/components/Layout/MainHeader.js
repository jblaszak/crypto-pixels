import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    <header>
      <nav className={classes.nav}>
        <h1>Cool stuff here</h1>
        <ul>
          <li></li>
        </ul>
      </nav>
      <div className={classes.spacer} />
    </header>
  );
};

export default MainHeader;
