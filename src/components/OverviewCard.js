import classes from "./OverviewCard.module.css";

const OverviewCard = (props) => {
  return (
    <div className={classes.card}>
      <h1 className={classes.title}>{props.title}</h1>
      <p className={classes.description}>
        {props.description}
        <a
          href={props.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={props.linkText}
        >
          {props.linkText}
        </a>
      </p>
    </div>
  );
};

export default OverviewCard;
