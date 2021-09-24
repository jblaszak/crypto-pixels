import classes from "./InfoTooltip.module.css";

const InfoTooltip = (props) => {
  return (
    <div className={classes.infoTooltip}>
      <div className={classes.topRow}>
        <div
          className={classes.pixelLarge}
          style={{ backgroundColor: props.fillColor }}
        />
        <div className={classes.name}>{props.name}</div>
        <div className={classes.position}>
          Position: <span>{`(${props.x},${props.y})`}</span>
        </div>
      </div>
      <div className={classes.sales}>
        <div>
          Last Price: <span>{`${props.lastPrice}`}</span>
        </div>
        <div>
          Times Sold: <span>{`${props.timesSold}`}</span>
        </div>
      </div>
      <div className={classes.owner}>
        <div>
          Owner Username: <span>{`${props.ownerUsername}`}</span>
        </div>
        <div>{`Owner Address: ${props.ownerAddress}`}</div>
      </div>
    </div>
  );
};

export default InfoTooltip;
