import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { updateCanvasDimensions } from "../canvas/canvasSlice";

export default function CanvasResponsiveControl() {

    const dispatch = useAppDispatch();
    const [canvasDimensions, setCanvasDimensions] = useState({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    });
    // ONLY run once on mount
    // Setting canvas dimensions & dispatching to store
    // IMPORTANT: This will replace the initial state of canvasDimensions in the store which is {width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0}
    useEffect(() => {
      const canvas = document.getElementById('canvas');
      if (canvas) {
        const { clientWidth, clientHeight} = canvas;
        const { top, left, right, bottom } = canvas.getBoundingClientRect();
        setCanvasDimensions({ width: clientWidth, height: clientHeight, top, left, right, bottom });
        dispatch(updateCanvasDimensions(canvasDimensions));
      }
    },[]);

    useEffect(() => {
      dispatch(updateCanvasDimensions(canvasDimensions));
    }, [canvasDimensions]);
    const handleControlDrag = (e: any, direction: "west" | "east") => {
      const canvas = document.getElementById('canvas');
      if (!canvas) return;
    
      const { clientWidth} = canvas;
      const { left } = canvas.getBoundingClientRect();
      const initialMousePositionX = e.clientX;
    
      const handleMouseMove = (e: any) => {
        const mousePositionX = e.clientX;
        const difference = direction === "west" ? initialMousePositionX - mousePositionX : mousePositionX-initialMousePositionX;
        const newWidth = (clientWidth + difference * 2)+16;
        const newLeft = left - difference;
        // Making sure canvas dosent overlap with obstracles
        const condition = direction === "west" ? newWidth > 280+8  && mousePositionX > obstacleRight+8*2 : canvas.getBoundingClientRect().left - 8*2 > obstacleRight;
        if (condition){
          canvas.setAttribute('style', `width: ${newWidth}px; left: ${newLeft}px;`);
          setCanvasDimensions((prevDimensions) => ({ ...prevDimensions, width: newWidth, left: newLeft }));
        }
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', handleMouseMove);
      });
    };
     // Obstacle detection
     const obstacle = document.getElementsByClassName('side-panels')[0];
     const obstacleRight = obstacle ? obstacle.getBoundingClientRect().right : 0;
   
    return <div className="canvas-responsive-controls">
      <div
        className="responsive-control control__east"
        style={{ top: canvasDimensions.top, left: canvasDimensions.left + canvasDimensions.width, width: 4, height: canvasDimensions.height }}
        onMouseDown={(e) => handleControlDrag(e, "east")}
      ></div>
      <div
        className="responsive-control control__south"
        style={{ top: canvasDimensions.bottom, left: canvasDimensions.left, width: canvasDimensions.width, height: 4 }}
      ></div>
      <div
        className="responsive-control control__west"
        style={{ top: canvasDimensions.top, left: canvasDimensions.left, width: 4, height: canvasDimensions.height }}
        onMouseDown={(e) => handleControlDrag(e, "west")}
      ></div>
    </div>;
  }