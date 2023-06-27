import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { selectCanvasDimensions, updateCanvasDimensions } from './canvasSlice';
import './Canvas.scss';

export function Canvas() {

console.log('%c #DEBUG ⛳️ 2', 'color: #f77700');
console.log('Inside Canvas');
  const dispatch = useAppDispatch();
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
  const canvasDimensionsStore = useSelector(selectCanvasDimensions);

  // ONLY run once on mount
  // Setting canvas dimensions & dispatching to store
  // IMPORTANT: This will replace the initial state of canvasDimensions in the store which is {width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0}
  useEffect(() => {
    console.log('%c #DEBUG ⛳️ 3', 'color: #f77700');
    console.log('Inside UseEffect []');
    console.log('Setting canvas dimensions & dispatching to store');
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

  // Syncing canvas dimensions with store
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (canvas) {
      const { width, left } = canvasDimensionsStore;
      canvas.style.width = `${width}px`;
      canvas.style.left = `${left}px`;
    }
  }, [canvasDimensionsStore]);

 
  const obstacle = document.getElementsByClassName('side-panels')[0];
  const obstacleRight = obstacle ? obstacle.getBoundingClientRect().right : 0;


  const handleWestControlDrag = (e: any) => {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    const { clientWidth} = canvas;
    const { left } = canvas.getBoundingClientRect();
    const initialMousePositionX = e.clientX;

    const handleMouseMove = (e: any) => {
      const mousePositionX = e.clientX;
      const difference = initialMousePositionX - mousePositionX;
      const newWidth = (clientWidth + difference * 2)+16;
      const newLeft = left - difference;
      if (newWidth > 280+8  && mousePositionX > obstacleRight+8*2){
        canvas.setAttribute('style', `width: ${newWidth}px; left: ${newLeft}px;`);
        setCanvasDimensions((prevDimensions) => ({ ...prevDimensions, width: newWidth, left: newLeft }));
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove);
    });
  };

  const handleEastControlDrag = (e: any) => {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    const { clientWidth} = canvas;
    const { left } = canvas.getBoundingClientRect();
    const initialMousePositionX = e.clientX;

    const handleMouseMove = (e: any) => {
      const mousePositionX = e.clientX;
      const currentCanvasLeft = canvas.getBoundingClientRect().left;
      const difference = mousePositionX-initialMousePositionX;
      const newWidth = (clientWidth + difference * 2)+16*2;
      const newLeft = left - difference;
      if ( currentCanvasLeft - 8*2 >  obstacleRight){
        canvas.setAttribute('style', `width: ${newWidth}px; left: ${newLeft}px;`);
        setCanvasDimensions((prevDimensions) => ({ ...prevDimensions, width: newWidth, left: newLeft }));

      }
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove);
    });
  };

  return (
    <>
      <div className="canvas" id="canvas" data-flow-id="canvas" data-testid="canvas"></div>
      <div className="target-tooltip"></div>
      <div className="target-tooltip-active"></div>
      <div className="canvas-responsive-controls">
        <div
          className="responsive-control control__east"
          style={{ top: canvasDimensions.top, left: canvasDimensions.left+canvasDimensions.width, width: 4, height: canvasDimensions.height }}
          onMouseDown={handleEastControlDrag}
        ></div>
        <div
          className="responsive-control control__south"
          style={{ top: canvasDimensions.bottom, left: canvasDimensions.left, width: canvasDimensions.width, height: 4 }}
        ></div>
        <div
          className="responsive-control control__west"
          style={{ top: canvasDimensions.top, left: canvasDimensions.left, width: 4, height: canvasDimensions.height }}
          onMouseDown={handleWestControlDrag}
        ></div>
      </div>
    </>
  );
}
// Line count -  137 ->
