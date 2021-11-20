import * as CONSTANTS from "../constants";

import { attributeData } from "./attributeData";

const atts = ["dia", "e", "42", "m", "d", "f", "h", "i"];
const atts2 = ["l", "s", "q"];
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

  let influential = [];
  let musky = [];

  // initialize counts in atts list
  for (let i = 0; i < atts.length; i++) {
    attributeCountsTemp[atts[i]] = 0;
  }
  // initialize counts in atts2 list
  for (let i = 0; i < atts2.length; i++) {
    attributeCountsTemp[atts2[i]] = 0;
  }

  for (let i = 0; i < 24 * CONSTANTS.COLLECTION_SIZE; i += 24) {
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

        // if (att === "i") {
        //   influential.push(i / 24 + 1);
        // }
        // if (att === "m") {
        //   musky.push(i / 24 + 1);
        // }
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

    // for all attributes in atts list
    for (const att of atts2) {
      if (attributeData[i + 21 + atts2.indexOf(att)] === "1") {
        attributeCountsTemp[att]++;
      }
    }
  }

  // const giveaways = influential.concat(musky).sort((a, b) => b - a);
  // console.log(giveaways);

  return attributeCountsTemp;
};

export const getAttributes = () => {
  // console.log("inside get attributes!");
  let attributesTemp = {};
  for (let i = 0; i < 24 * CONSTANTS.COLLECTION_SIZE; i += 24) {
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

    // for all atts in atts2 list
    for (const att of atts2) {
      if (attributeData[i + 21 + atts2.indexOf(att)] === "1") {
        pixel[att] = attributeData[i + 21 + atts2.indexOf(att)];
      }
    }

    attributesTemp[i / 24 + 1] = pixel;
  }
  return attributesTemp;
};
