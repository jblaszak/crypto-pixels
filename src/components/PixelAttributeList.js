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
    let color = "";
    let icon = "";
    switch (key) {
      case "r":
        attribute = "R Value: ";
        attributeValue = +value;
        rarity = attributeCounts[key][value];
        color = "rgb(255,0,0)";
        break;
      case "g":
        attribute = "G Value: ";
        attributeValue = +value;
        rarity = attributeCounts[key][value];
        color = "rgb(0,255,0)";
        break;
      case "b":
        attribute = "B Value: ";
        attributeValue = +value;
        rarity = attributeCounts[key][value];
        color = "rgb(0,0,255)";
        break;
      case "d2c":
        attribute = "To Center: ";
        attributeValue = +value;
        rarity = attributeCounts[key][value];
        icon = "↘";
        break;
      case "c":
        attribute = "Coin: ";
        attributeValue = value;
        rarity = attributeCounts[key][value];
        icon = "💰";
        break;
      case "dia":
        attribute = "Diagonal";
        icon = "✖";
        break;
      case "42":
        attribute = "42";
        icon = "42";
        break;
      case "e":
        attribute = "Edge";
        icon = "🔳";
        break;
      case "m":
        attribute = "Musky";
        icon = "🚀";
        break;
      case "d":
        attribute = "Dead";
        icon = "☠";
        break;
      case "f":
        attribute = "Flashy";
        icon = "📸";
        break;
      case "i":
        attribute = "Influential";
        icon = "💁‍♂️";
        break;
      case "h":
        attribute = "Hand Crafted";
        icon = "🖐";
        break;
      case "l":
        attribute = "Load Bearing";
        icon = "🏛";
        break;
      case "s":
        attribute = "Structural";
        icon = "🏗";
        break;
      case "q":
        attribute = "Queen";
        icon = "👑";
        break;
      case "Boost":
        attribute = "Boost: ";
        attributeValue = value.length;
        rarity = "";
        icon = "💪";
        break;
      case "minted":
        continue;
      default:
        break;
    }

    attributesList.push(
      <PixelAttribute
        key={attribute}
        attribute={attribute}
        value={attributeValue}
        rarity={rarity}
        color={color}
        icon={icon}
      />
    );
  }
  return <React.Fragment>{attributesList}</React.Fragment>;
};

export default PixelAttributeList;
