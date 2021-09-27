import { dataMapActions } from "./dataMap-slice";
import { errorActions } from "./error-slice.js";
import { imageColorData } from "../assets/imageColorData";

export const loadPixelData = () => {
  return async (dispatch) => {
    const grabDataFromStorage = async () => {
      let pixelData = [];
      const storageData = localStorage.getItem("pixelData");

      if (storageData) {
        pixelData = JSON.parse(storageData);
        // localStorage.clear();
        console.log("Loaded data from storage!");
      } else {
        pixelData = imageColorData.map((color) => ({
          color: color,
          lastPrice: "No data",
          priceUnit: "ETH",
          timesSold: Math.floor(Math.random() * 10),
          ownerUsername: "No data",
          ownerAddress: "No data",
        }));

        localStorage.setItem("pixelData", JSON.stringify(pixelData));
        console.log("created new data, added to storage");
      }
      return pixelData;
    };

    try {
      const pixelData = await grabDataFromStorage();
      if (pixelData) {
        dispatch(
          dataMapActions.replacePixelData({
            pixelData: pixelData,
          })
        );
      }
    } catch (error) {
      dispatch(
        errorActions.changeErrorMessage({
          errorMessage: "Failed to grab pixel data! :'(",
        })
      );
    }
  };
};

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
