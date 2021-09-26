import { dataMapActions } from "./dataMap-slice";
import { errorActions } from "./error-slice.js";

export const fetchColorData = (imgData, x, y) => {
  return async (dispatch) => {
    const fetchColors = async () => {
      // // if (imageRef.current && imageRef.current.complete) {
      // const ctx = canvasRef.current.getContext("2d");

      // imageRef.current.onload = () => {
      //   ctx.drawImage(imageRef.current, 0, 0, x, y);
      //   let imgData = ctx.getImageData(0, 0, x, y).data;

      let newData = Array(x * y);
      for (var i = 0; i < imgData.length; i += 4) {
        const index = i / 4;
        const colorValue = `#${imgData[i].toString(16)}${imgData[
          i + 1
        ].toString(16)}${imgData[i + 2].toString(16)}${imgData[i + 3].toString(
          16
        )}`;
        newData[index] = colorValue;
      }
      console.log(newData);

      return newData;
      // };
      // }
    };

    try {
      const newColors = await fetchColors();
      if (newColors) {
        dispatch(
          dataMapActions.replaceColorData({
            pixels: newColors,
          })
        );
      }
    } catch (error) {
      console.log(error);
      console.log("there was an error fetching colors!");
      dispatch(
        errorActions.changeErrorMessage({
          errorMessage: "Failed to grab pixel data! :'(",
        })
      );
    }
  };
};

export const fetchDataMapAll = () => {
  return async (dispatch) => {
    const fetchDataAll = async () => {
      // fetch data from firebase
      // throw new Error("error!");
      return { pixels: [] };
    };

    try {
      const dataMap = await fetchDataAll();
      if (!dataMap.pixels) {
        dispatch(
          dataMapActions.replaceDataMap({
            pixels: dataMap.pixels,
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
