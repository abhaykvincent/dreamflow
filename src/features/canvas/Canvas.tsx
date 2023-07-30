import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCanvasDimensions } from './canvasSlice';
import CanvasResponsiveControl from '../canvasResponsiveControl/CanvasResponsiveControl';
import Ruler from '../../components/Ruler/Ruler';
import './Canvas.scss';

export function Canvas() {

  const canvasDimensionsStore = useSelector(selectCanvasDimensions);
  const { width, left } = canvasDimensionsStore;

  // Syncing canvas dimensions with store
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (canvas) {
      canvas.style.width = `${width}px`;
      canvas.style.left = `${left}px`;
    }
  }, [width, left]);

  return (
    <>
      <Ruler canvasDimensionsStore={canvasDimensionsStore}/>
      <div className="canvas" id="canvas" data-flow-id="canvas" data-testid="canvas"></div>
      <CanvasResponsiveControl/>
      <div className="target-tooltip"></div>
      <div className="target-tooltip-active"></div>
    </>
  );
}
