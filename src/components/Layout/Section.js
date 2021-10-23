import classes from "./Section.module.css";

const Section = (props) => {
  const className = `${classes.section} ${props.className}`;
  return <section className={className}>{props.children}</section>;
};

export default Section;
