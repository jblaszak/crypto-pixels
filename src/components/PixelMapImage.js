import PixelMapImagePixels from "./PixelMapImagePixels";
import PixelMapImageHighlight from "./PixelMapImageHighlight";

import { MAX_WIDTH } from "../constants";

const PixelMapImage = (props) => {
  const squareSize = props.size + props.gap;
  const viewBox = `0 0 ${squareSize * MAX_WIDTH} ${squareSize * MAX_WIDTH}`;

  return (
    <div className={props.className}>
      <svg viewBox={viewBox}>
        <PixelMapImagePixels
          viewBox={viewBox}
          size={props.size}
          squareSize={squareSize}
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
