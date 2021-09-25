import classes from "./ErrorMessage.module.css";

const ErrorMessage = (props) => {
  return (
    <section className={classes.errorMessage}>
      <p>{props.message}</p>
    </section>
  );
};

export default ErrorMessage;
