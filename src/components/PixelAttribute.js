import classes from "./PixelAttribute.module.css";

const PixelInfoAttribute = (props) => {
  return (
    <div className={classes.attribute}>
      <div className={classes.info}>
        <div className={classes.pixel} style={{ backgroundColor: props.color }}>
          {props.icon}
        </div>
        <h2 className={classes.attributeName}>
          {`${props.attribute} `}
          <span className={classes.attributeValue}>{props.value}</span>
        </h2>
      </div>
      {props.rarity !== "" && (
        <p className={classes.rarity}>
          Rarity: <span className={classes.rarityValue}>{props.rarity}</span>
          /10000
        </p>
      )}
    </div>
  );
};

export default PixelInfoAttribute;
