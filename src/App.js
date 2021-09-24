import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./App.module.css";

import PixelMap from "./components/PixelMap";
import { fetchDataMapAll } from "./store/dataMap-actions";

function App() {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.error.errorMessage);

  useEffect(() => {
    dispatch(fetchDataMapAll());
  }, [dispatch]);

  const canvasRef = useRef();
  const imageRef = useRef();
  const x = 100;
  const y = 100;
  const [colorData, setColorData] = useState(Array(x * y));

  const getColors = useCallback((data) => {
    setColorData((prevData) => {
      let newData = [...prevData];
      for (var i = 0; i < data.length; i += 4) {
        const index = i / 4;
        const colorValue = `#${data[i].toString(16)}${data[i + 1].toString(
          16
        )}${data[i + 2].toString(16)}${data[i + 3].toString(16)}`;
        newData[index] = colorValue;
      }
      return newData;
    });
  }, []);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.drawImage(imageRef.current, 0, 0, x, y);
      let imgData = ctx.getImageData(0, 0, x, y).data;
      getColors(imgData);
    }
  }, [getColors]);

  return (
    <div className={classes.container}>
      <img
        ref={imageRef}
        src="https://i.imgur.com/bDaD78c.png"
        crossOrigin="anonymous"
        alt="data"
        className={classes.dataImage}
      />
      <canvas ref={canvasRef} width={x} height={y} />
      {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
      {!errorMessage && (
        <PixelMap x={x} y={y} size={7} gap={1} colorData={colorData} />
      )}
    </div>
  );
}

export default App;
