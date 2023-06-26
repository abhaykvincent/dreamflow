import { useEffect, useState } from 'react';
import './Canvas.scss';

export function Canvas() {
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (canvas) {
      const { clientWidth, clientHeight} = canvas;
      const { top, left, right, bottom } = canvas.getBoundingClientRect();
      setCanvasDimensions({ width: clientWidth, height: clientHeight, top, left, right, bottom });
      debugger
    }
  }, []);

  const handleWestControlDrag = (e: any) => {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    const { clientWidth} = canvas;
    const { left } = canvas.getBoundingClientRect();
    const initialMousePositionX = e.clientX;

    const handleMouseMove = (e: any) => {
      const mousePositionX = e.clientX;
      const difference = initialMousePositionX - mousePositionX;
      const newWidth = clientWidth + difference * 2;
      const newLeft = left - difference;

      canvas.setAttribute('style', `width: ${newWidth}px; left: ${newLeft}px;`);
      setCanvasDimensions((prevDimensions) => ({ ...prevDimensions, width: newWidth, left: newLeft }));
    };
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
          className="responsive-control control__north"
          style={{ top: canvasDimensions.top, left: canvasDimensions.left, width: canvasDimensions.width, height: 4 }}
        ></div>
        <div
          className="responsive-control control__east"
          style={{ top: canvasDimensions.top, left: canvasDimensions.right, width: 4, height: canvasDimensions.height }}
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
