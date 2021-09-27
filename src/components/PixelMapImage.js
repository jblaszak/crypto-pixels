import { useSelector } from "react-redux";

import PixelMapImagePixels from "./PixelMapImagePixels";
import PixelMapImageHighlight from "./PixelMapImageHighlight";

const PixelMapImage = (props) => {
  const data = useSelector((state) => state.dataMap.pixelData);

  const xCount = Math.sqrt(data.length);
  const yCount = xCount;
  const squareSize = props.size + props.gap;
  const viewBox = `0 0 ${squareSize * xCount} ${squareSize * yCount}`;

  return (
    <div className={props.className}>
      <svg viewBox={viewBox}>
        <PixelMapImagePixels
          viewBox={viewBox}
          size={props.size}
          squareSize={squareSize}
          data={data}
          xCount={xCount}
          yCount={yCount}
          isHeatMap={props.isHeatMap}
        />
        <PixelMapImageHighlight
          viewBox={viewBox}
          size={props.size}
          squareSize={squareSize}
        />
      </svg>
    </div>
  );
};

export default PixelMapImage;
