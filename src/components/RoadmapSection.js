import classes from "./RoadmapSection.module.css";

const RoadmapSection = (props) => {
  return (
    <li className={classes.timelineItem}>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.description}>{props.description}</div>
    </li>
  );
};

export default RoadmapSection;
