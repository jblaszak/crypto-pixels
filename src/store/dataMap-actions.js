import { dataMapActions } from "./dataMap-slice";
import { errorActions } from "./error-slice.";

export const fetchDataMapAll = () => {
  return async (dispatch) => {
    const fetchDataAll = async () => {
      // fetch data from firebase
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
      dispatch(
        errorActions.changeErrorMessage({
          errorMessage: "Failed to grab data",
        })
      );
    }
  };
};
