import React, { useEffect, useState } from 'react';
import './Canvas.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import  { selectCanvas, update } from './canvasSlice';

export function Canvas() {
  const canvasData = useAppSelector(selectCanvas);
  const dispatch = useAppDispatch();


  return (
    <div className="canvas" data-flow-id="canvas"

      onClick={() => {
        dispatch(update('test'))}}
    >{canvasData}</div>
  );
}
