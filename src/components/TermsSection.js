import classes from "./TermsSection.module.css";

const TermsSection = (props) => {
  return (
    <div className={classes.termsSection}>
      <h1>{props.title}</h1>
      {props.writeups.map((item) => (
        <p key={item.slice(0, 12)}>{item}</p>
      ))}
    </div>
  );
};

export default TermsSection;
