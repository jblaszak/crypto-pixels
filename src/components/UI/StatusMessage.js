import classes from "./StatusMessage.module.css";

const StatusMessage = (props) => {
  const className = `${classes.statusMessage} ${
    props.type === "success" ? classes.success : classes.error
  }`;
  return (
    <section className={className}>
      <p>{props.message}</p>
    </section>
  );
};

export default StatusMessage;
