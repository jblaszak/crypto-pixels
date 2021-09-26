import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchColorData } from "../store/dataMap-actions";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    console.log(props.imageRef);
    console.log(canvasRef);

    props.imageRef.current.onload = () => {
      ctx.drawImage(props.imageRef.current, 0, 0, props.x, props.y);
      let imgData = ctx.getImageData(0, 0, props.x, props.y).data;

      dispatch(fetchColorData(imgData, props.x, props.y));
    };
  }, [dispatch, props.imageRef, props.x, props.y]);

  return <canvas ref={canvasRef} width={props.x} height={props.y} />;
};

export default Canvas;
