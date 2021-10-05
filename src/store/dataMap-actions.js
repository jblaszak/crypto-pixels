import { set, ref } from "firebase/database";
import db from "../services/firebase";

import { dataMapActions } from "./dataMap-slice";
import { errorActions } from "./error-slice.js";
import { imageColorData } from "../data-loading/imageColorData";
import { pixelAttributes, pixelStats } from "../data-loading";

export const loadPixelData = () => {
  return async (dispatch) => {
    const grabDataFromStorage = async () => {
      let pixelData = [];
      const storageData = localStorage.getItem("pixelData");

      if (storageData) {
        pixelData = JSON.parse(storageData);
        localStorage.clear();

        console.log({
          pixelStats: pixelStats,
          pixelAttributes: pixelAttributes,
        });

        let pixelsString = "";
        const pixelAtts = ["dia", "e", "m", "d", "f", "h", "i"];
        const coins = [
          "LUNA",
          "AVAX",
          "LINK",
          "UNI",
          "ETH",
          "ADA",
          "LTC",
          "DOT",
          "BTC",
          "BNB",
          "XRP",
          "ALGO",
          "ATOM",
          "DOGE",
          "SOL",
        ];
        const pad = (padding, value) => {
          return ("0" * padding + value).slice(-padding);
        };

        for (let i = 0; i < Object.keys(pixelAttributes).length; i++) {
          const pixel = pixelAttributes[`${i + 1}`];
          console.log(pixel);
          let pixelString = `${pad(3, pixel["r"].toString())}${pad(
            3,
            pixel["g"].toString()
          )}${pad(3, pixel["b"].toString())}${pad(2, pixel["d2c"].toString())}`;
          for (const att of pixelAtts) {
            if (pixel[att]) {
              pixelString += "1";
            } else {
              pixelString += "0";
            }
          }
          if (pixel["c"]) {
            pixelString += pad(2, (coins.indexOf(pixel["c"]) + 1).toString());
          } else {
            pixelString += "00";
          }
          pixelsString += pixelString;
        }

        console.log(pixelsString);

        // // set(ref(db, "pixels/"), null);
        // console.log("adding pixelStats");
        // await set(ref(db, "pixelStats/"), pixelStats);
        // console.log("adding attributes");
        // await set(ref(db, "pixelAttributes/"), pixelAttributes);

        // const unsub = onSnapshot(doc(db, "pixels", "pixelData"), (doc) => {
        //   console.log("Current data: ", doc.data());
        // });

        console.log("Loaded data from storage!");
      } else {
        // TODO:
        // get pixel stats from server

        pixelData = {
          pixelStats,
          pixelAttributes,
        };

        pixelData = imageColorData.map((color) => ({
          color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
          lastPrice: 0,
          priceUnit: "ETH",
          timesSold: Math.floor(Math.random() * 10),
          ownerUsername: "No data",
          ownerAddress: "No data",
        }));

        localStorage.setItem("pixelData", JSON.stringify(pixelData));
        console.log("created new data, added to storage");
      }

      // TODO:
      // start subscription to stats changes
      // update stats based on changes

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
