import { useAppDispatch, useAppSelector } from '../../app/hooks';
import  { selectCanvasDOM, selectTarget, update } from './canvasSlice';
import './Canvas.scss';
export function Canvas() {
  const canvasDOM = useAppSelector(selectCanvasDOM);
  return (
    <>
      <div className="canvas" data-flow-id="canvas" data-testid="canvas">{canvasDOM}</div>
      <div className="target-tooltip"></div>
      <div className="target-tooltip-active"></div>

    </>
  );
}
