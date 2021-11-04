import { dataMapActions } from "./dataMap-slice";
import { statusActions } from "./status-slice.js";

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
        statusActions.changeStatus({
          statusMessage: "Failed to grab pixel data! :'(",
          statusType: "error",
        })
      );
    }
  };
};
