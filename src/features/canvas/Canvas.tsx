import { useAppDispatch, useAppSelector } from '../../app/hooks';
import  { selectCanvasDOM, selectTarget, updateCanvasHTML } from './canvasSlice';
import './Canvas.scss';
import { useEffect, useState } from 'react';
import $ from 'jquery';
export function Canvas() {
  const canvasDOMinStore = useAppSelector(selectCanvasDOM);
  useEffect(() => {
    // console'Canvas updated' with green color
   console.log('%cCanvas updated confirmed', 'color: green');
   console.log('canvasDOMinStore', canvasDOMinStore);
  }, [canvasDOMinStore]);
  return (
    <>
      <div className="canvas" id="canvas" data-flow-id="canvas" data-testid="canvas"></div>
      <div className="target-tooltip"></div>
      <div className="target-tooltip-active"></div>
    </>
  );
}
