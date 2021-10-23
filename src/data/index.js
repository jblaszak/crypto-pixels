import * as CONSTANTS from "../constants";

import { attributeData } from "./attributeData";

const atts = ["dia", "e", "42", "m", "d", "f", "h", "i"];
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
  "DOGE",
  "SOL",
  "XRP",
  "ALGO",
  "ATOM",
];

export const getAttributeCounts = () => {
  let attributeCountsTemp = {
    r: {},
    g: {},
    b: {},
    d2c: {},
    c: {},
  };

  // initialize counts in atts list
  for (let i = 0; i < atts.length; i++) {
    attributeCountsTemp[atts[i]] = 0;
  }

  for (let i = 0; i < 21 * CONSTANTS.COLLECTION_SIZE; i += 21) {
    // 'r' attribute
    if (attributeData.slice(i, i + 3) in attributeCountsTemp["r"]) {
      attributeCountsTemp["r"][attributeData.slice(i, i + 3)]++;
    } else {
      attributeCountsTemp["r"][attributeData.slice(i, i + 3)] = 1;
    }
    // 'g' attribute
    if (attributeData.slice(i + 3, i + 6) in attributeCountsTemp["g"]) {
      attributeCountsTemp["g"][attributeData.slice(i + 3, i + 6)]++;
    } else {
      attributeCountsTemp["g"][attributeData.slice(i + 3, i + 6)] = 1;
    }
    // 'b' attribute
    if (attributeData.slice(i + 6, i + 9) in attributeCountsTemp["b"]) {
      attributeCountsTemp["b"][attributeData.slice(i + 6, i + 9)]++;
    } else {
      attributeCountsTemp["b"][attributeData.slice(i + 6, i + 9)] = 1;
    }
    // 'd2c' attribute
    if (attributeData.slice(i + 9, i + 11) in attributeCountsTemp["d2c"]) {
      attributeCountsTemp["d2c"][attributeData.slice(i + 9, i + 11)]++;
    } else {
      attributeCountsTemp["d2c"][attributeData.slice(i + 9, i + 11)] = 1;
    }
    // for all attributes in atts list
    for (const att of atts) {
      if (attributeData[i + 11 + atts.indexOf(att)] === "1") {
        attributeCountsTemp[att]++;
      }
    }
    // 'c' attribute
    const coinVal = +attributeData.slice(i + 19, i + 21);
    if (coinVal) {
      if (coins[coinVal - 1] in attributeCountsTemp["c"]) {
        attributeCountsTemp["c"][coins[coinVal - 1]]++;
      } else {
        attributeCountsTemp["c"][coins[coinVal - 1]] = 1;
      }
    }
  }
  return attributeCountsTemp;
};

export const getAttributes = () => {
  // console.log("inside get attributes!");
  let attributesTemp = {};
  for (let i = 0; i < 21 * CONSTANTS.COLLECTION_SIZE; i += 21) {
    let pixel = {};

    // 'r' attribute
    pixel["r"] = attributeData.slice(i, i + 3);
    // 'g' attribute
    pixel["g"] = attributeData.slice(i + 3, i + 6);
    // 'b' attribute
    pixel["b"] = attributeData.slice(i + 6, i + 9);
    // 'd2c' attribute
    pixel["d2c"] = attributeData.slice(i + 9, i + 11);
    // for all attributes in atts list
    for (const att of atts) {
      if (attributeData[i + 11 + atts.indexOf(att)] === "1") {
        pixel[att] = attributeData[i + 11 + atts.indexOf(att)];
      }
    }

    // 'c' attribute
    const coinVal = +attributeData.slice(i + 19, i + 21);
    if (coinVal) {
      pixel["c"] = coins[coinVal - 1];
    }

    attributesTemp[i / 21 + 1] = pixel;
  }
  return attributesTemp;
};

export const getPixelStats = () => {
  let pixelStatsTemp = {};
  for (let i = 1; i <= CONSTANTS.COLLECTION_SIZE; i++) {
    pixelStatsTemp[i] = {
      price: 0,
      coin: "ETH",
      timesSold: 0,
      username: 0,
      address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    };
  }
  return pixelStatsTemp;
};
