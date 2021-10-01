import { set, ref } from "firebase/database";
import db from "../services/firebase";

import { dataMapActions } from "./dataMap-slice";
import { errorActions } from "./error-slice.js";
import { imageColorData } from "../assets/imageColorData";

import * as CONSTANTS from "../constants";

export const loadPixelData = () => {
  return async (dispatch) => {
    const grabDataFromStorage = async () => {
      let pixelData = [];
      const storageData = localStorage.getItem("pixelData");

      if (storageData) {
        pixelData = JSON.parse(storageData);
        // localStorage.clear();

        //// Generate some dummy data in firebase
        let pixelStats = {};
        for (let i = 1; i <= CONSTANTS.MAX_WIDTH_SQUARED; i++) {
          pixelStats[i] = {
            p: 0,
            c: "ETH",
            s: 0,
            u: "No data",
            a: "No data",
          };
        }
        // await updateDoc(doc(db, "pixels", "pixelStats"), pixelStats);

        let diagPixels = [];
        let edgePixels = [];
        let fortyTwoPixels = [];

        for (let i = 1; i <= CONSTANTS.MAX_WIDTH; i++) {
          diagPixels.push((i - 1) * CONSTANTS.MAX_WIDTH); // '\' diagonal
          diagPixels.push(i * CONSTANTS.MAX_WIDTH - i + 1); // '/' diagonal
          edgePixels.push(i); // top edge
          edgePixels.push(CONSTANTS.MAX_WIDTH * (CONSTANTS.MAX_WIDTH - 1) + i); // bottom edge
          if (i !== 1 || i !== CONSTANTS.MAX_WIDTH) {
            edgePixels.push(1 + (i - 1) * CONSTANTS.MAX_WIDTH); // left edge
            edgePixels.push((i - 1) * CONSTANTS.MAX_WIDTH); // right edge
          }
          fortyTwoPixels.push(42 + (i - 1) * 100); // vertical 42 pixels
          const horizontal42 = 42 * CONSTANTS.MAX_WIDTH + i;
          if (fortyTwoPixels.indexOf(horizontal42) === -1) {
            fortyTwoPixels.push(horizontal42); // horizontal 42 pixels
          }
        }

        let pixelAttributes = {};
        for (let i = 1; i <= CONSTANTS.MAX_WIDTH_SQUARED; i++) {
          // Calculate distance to center
          const x = (i - 1) % CONSTANTS.MAX_WIDTH;
          const y = Math.floor((i - 1) / CONSTANTS.MAX_WIDTH);
          let mid = CONSTANTS.MAX_WIDTH / 2 - 0.5;
          let d2c = 0;

          if (CONSTANTS.MAX_WIDTH % 2) {
            mid = Math.floor(mid);
            const xDist = Math.abs(x - mid);
            const yDist = Math.abs(y - mid);
            d2c = Math.max(xDist, yDist);
          } else {
            const xDist = Math.abs(x - mid);
            const yDist = Math.abs(y - mid);
            d2c = Math.floor(Math.max(xDist, yDist));
          }

          pixelAttributes[i] = {};
        }

        // set(ref(db, "pixels/"), null);

        // const unsub = onSnapshot(doc(db, "pixels", "pixelData"), (doc) => {
        //   console.log("Current data: ", doc.data());
        // });

        console.log("Loaded data from storage!");
      } else {
        pixelData = imageColorData.map((color) => ({
          color: color,
          lastPrice: 0,
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
