import classes from "./OverviewCard.module.css";

const OverviewCard = (props) => {
  return (
    <div className={classes.card}>
      <h1 className={classes.title}>{props.title}</h1>
      <p className={classes.description}>{props.description}</p>
    </div>
  );
};

export default OverviewCard;
