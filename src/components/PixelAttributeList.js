import React from "react";
import { useSelector } from "react-redux";

import PixelAttribute from "./PixelAttribute";

const PixelAttributeList = (props) => {
  const attributeCounts = useSelector(
    (state) => state.dataMap.pixelAttributeCounts
  );

  let attributesList = [];

  for (const [key, value] of Object.entries(props.attributes)) {
    let attribute = "";
    let attributeValue = "";
    let rarity = attributeCounts[key];
    switch (key) {
      case "r":
        attribute = "R Value: ";
        attributeValue = +value;
        rarity = attributeCounts[key][value];
        break;
      case "g":
        attribute = "G Value: ";
        attributeValue = +value;
        rarity = attributeCounts[key][value];
        break;
      case "b":
        attribute = "B Value: ";
        attributeValue = +value;
        rarity = attributeCounts[key][value];
        break;
      case "d2c":
        attribute = "From Center: ";
        attributeValue = +value;
        rarity = attributeCounts[key][value];
        break;
      case "c":
        attribute = "Coin: ";
        attributeValue = value;
        rarity = attributeCounts[key][value];
        break;
      case "dia":
        attribute = "Diagonal";
        break;
      case "42":
        attribute = "42";
        break;
      case "e":
        attribute = "Edge";
        break;
      case "m":
        attribute = "Musky";
        break;
      case "d":
        attribute = "Dead";
        break;
      case "f":
        attribute = "Flashy";
        break;
      case "i":
        attribute = "Influential";
        break;
      case "h":
        attribute = "Hand Crafted";
        break;
      default:
        break;
    }

    attributesList.push(
      <PixelAttribute
        attribute={attribute}
        value={attributeValue}
        rarity={rarity}
      />
    );
  }

  return <React.Fragment>{attributesList}</React.Fragment>;
};

export default PixelAttributeList;