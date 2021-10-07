import { set, ref } from "firebase/database";
import db from "../services/firebase";

import { dataMapActions } from "./dataMap-slice";
import { errorActions } from "./error-slice.js";

export const fetchPixelData = () => {
  return async (dispatch) => {
    const fetchDataAll = async () => {
      // fetch data from firebase
      // throw new Error("error!");
      return { pixelData: [] };
    };

    try {
      const dataMap = await fetchDataAll();
      if (!dataMap.pixelData) {
        dispatch(
          dataMapActions.replacePixelData({
            pixelData: dataMap.pixelData,
            lastUpdated: new Date().getDate(),
          })
        );
      }
    } catch {
      console.log("there was an error replacing data map!");
      dispatch(
        errorActions.changeErrorMessage({
          errorMessage: "Failed to grab pixel data! :'(",
        })
      );
    }
  };
};
