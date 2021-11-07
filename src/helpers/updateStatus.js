import { statusActions } from "../store/status-slice.js";

export const updateStatus = (type, message, dispatch) => {
  dispatch(
    statusActions.changeStatus({
      statusMessage: message,
      statusType: type,
    })
  );
};
