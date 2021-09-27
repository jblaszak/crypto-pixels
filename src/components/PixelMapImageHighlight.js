import { useSelector } from "react-redux";

const PixelMapImageHighlight = (props) => {
  const selectedPixel = useSelector((state) => state.dataMap.selectedPixel);
  const x = selectedPixel % 100;
  const y = Math.floor(selectedPixel / 100);

  return (
    <svg viewBox={props.viewBox} x="0" y="0">
      <rect
        width={props.size}
        height={props.size}
        x={x * props.squareSize}
        y={y * props.squareSize}
        rx={1}
        ry={1}
        stroke="#FFFFFF"
        strokeWidth="3px"
      />
    </svg>
  );
};

export default PixelMapImageHighlight;
