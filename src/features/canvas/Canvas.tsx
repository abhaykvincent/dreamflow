
import './Canvas.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import  { selectCanvas, selectTarget, update } from './canvasSlice';

export function Canvas() {
  const dispatch = useAppDispatch();

  const canvasData = useAppSelector(selectCanvas);
  const target = useAppSelector(selectTarget);

  // 


  return (
    <>
      <div className="canvas" data-flow-id="canvas">{canvasData}</div>
      <div className="target-tooltip">Heading</div>
    </>
  );
}
