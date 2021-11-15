import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { useDispatch } from "react-redux";
import { statusActions } from "../../store/status-slice.js";

import classes from "./StatusMessage.module.css";

const StatusMessage = (props) => {
  const dispatch = useDispatch();

  const className = `${classes.statusMessage} ${
    props.type === "success"
      ? classes.success
      : props.type === "notification"
      ? classes.notification
      : classes.error
  }`;

  useEffect(() => {
    const clearMessage = setTimeout(() => {
      dispatch(
        statusActions.changeStatus({
          statusMessage: "",
          statusType: "",
        })
      );
    }, 3000);
    return () => {
      clearTimeout(clearMessage);
    };
  }, []);

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <section className={className}>
          <p>{props.message}</p>
        </section>,
        document.getElementById("status-root")
      )}
    </React.Fragment>
  );
};

export default StatusMessage;
