import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./PixelMap.module.css";

import PixelMapImage from "./PixelMapImage";
import Canvas from "./Canvas";
import { fetchColorData, fetchDataMapAll } from "../store/dataMap-actions";

const PixelMap = (props) => {
  const canvasRef = useRef();
  const imageRef = useRef();
  // const canvasRefCurrent = canvasRef.current;
  // const imageRefCurrent = imageRef.current;
  const x = 100;
  const y = 100;

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // console.log(canvasRef);
    // console.log(imageRef);
    // dispatch(fetchColorData(canvasRef, imageRef, x, y));
    dispatch(fetchDataMapAll());
  }, [dispatch, canvasRef, imageRef, x, y]);

  // useLayoutEffect(() => {

  // })

  const colorData = useSelector((state) => state.dataMap.pixels);

  // const [colorData, setColorData] = useState(Array(x * y));

  // const getColors = useCallback((data) => {
  //   setColorData((prevData) => {
  //     let newData = [...prevData];
  //     for (var i = 0; i < data.length; i += 4) {
  //       const index = i / 4;
  //       const colorValue = `#${data[i].toString(16)}${data[i + 1].toString(
  //         16
  //       )}${data[i + 2].toString(16)}${data[i + 3].toString(16)}`;
  //       newData[index] = colorValue;
  //     }
  //     return newData;
  //   });
  // }, []);

  // useEffect(() => {
  //   if (imageRef.current && imageRef.current.complete) {
  //     const ctx = canvasRef.current.getContext("2d");
  //     ctx.drawImage(imageRef.current, 0, 0, x, y);
  //     let imgData = ctx.getImageData(0, 0, x, y).data;
  //     getColors(imgData);
  //   }
  // }, [getColors]);

  return (
    <div className={classes.pixelMap}>
      <img
        ref={imageRef}
        src="https://i.imgur.com/bDaD78c.png"
        crossOrigin="anonymous"
        alt="data"
        className={classes.dataImage}
      />
      <Canvas imageRef={imageRef} width={x} height={y} />
      <PixelMapImage x={x} y={y} size={7} gap={1} colorData={colorData} />
    </div>
  );
};

export default PixelMap;
