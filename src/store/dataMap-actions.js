import { dataMapActions } from "./dataMap-slice";
import { errorActions } from "./error-slice.js";

export const fetchDataMapAll = () => {
  return async (dispatch) => {
    const fetchDataAll = async () => {
      // fetch data from firebase
      throw new Error("error!");
    };

    try {
      const dataMap = await fetchDataAll();
      dispatch(
        dataMapActions.replaceDataMap({
          pixels: dataMap.pixels,
          lastUpdated: new Date().getDate(),
        })
      );
    } catch {
      console.log("there was an error!");
      dispatch(
        errorActions.changeErrorMessage({
          errorMessage: "Failed to grab pixel data! :'(",
        })
      );
    }
  };
};
