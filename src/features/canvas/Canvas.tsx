import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { selectCanvasDOM, selectCanvasDimensions, setTarget, updateCanvasDimensions } from './canvasSlice';
import './Canvas.scss';


export function Canvas() {

  const canvasDimensionsStore = useSelector(selectCanvasDimensions);
  const { width, left } = canvasDimensionsStore;

  // Syncing canvas dimensions with store
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ruler = document.getElementById('responsive-ruler')
    
    if (canvas&&ruler) {
      canvas.style.width = `${width}px`;
      canvas.style.left = `${left}px`;

      ruler.style.width = `${width}px`;
      ruler.style.left = `${left}px`;
    }

    
  }, [canvasDimensionsStore]);

  const marks = Array.from(Array(Math.ceil(canvasDimensionsStore.width?canvasDimensionsStore.width / 50-1:0)).keys()).map(index => {
    const value = 50 * index;
    return (
      <div key={index} className="responsive-ruler__horizontal__mark" style={{left: value}}>
        <div className="responsive-ruler__horizontal__mark__label">{value}</div>
      </div>
    );
  });

  return (
    <>
      <div id="responsive-ruler">
        <div className="responsive-ruler__horizontal"> 
        {/* get list of widths in equal sizes */}
        {marks}
        </div>
      </div>
      <div className="canvas" id="canvas" data-flow-id="canvas" data-testid="canvas"></div>
      <CanvasResponsiveControl/>
      <div className="target-tooltip"></div>
      <div className="target-tooltip-active"></div>
    </>
  );
}













function CanvasResponsiveControl() {

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
// Line count -  250 -> 212 -> 174 -> 110