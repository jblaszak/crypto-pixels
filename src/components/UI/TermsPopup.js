import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { statusActions } from "../../store/status-slice";
import Section from "../Layout/Section";

import classes from "./TermsPopup.module.css";

const TermsPopup = () => {
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(statusActions.changePrivacyStatus(true));
  };

  return (
    <div className={classes.container}>
      <Section>
        <h1>Your Privacy</h1>
        <div className={classes.privacy}>
          <p>
            We use cookies to improve your experience on our website. To find
            out more, read our <Link to="/terms">cookie policy</Link>.
          </p>
          <button onClick={closeHandler}>Ok</button>
        </div>
      </Section>
    </div>
  );
};

export default TermsPopup;
