import { useEffect, useState } from 'react';
import './Canvas.scss';
import { useAppDispatch } from '../../app/hooks';
import { selectCanvasDimensions, updateCanvasDimensions } from './canvasSlice';
import { useSelector } from 'react-redux';

export function Canvas() {
  //useDispatch
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
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (canvas) {
      const { clientWidth, clientHeight} = canvas;
      const { top, left, right, bottom } = canvas.getBoundingClientRect();
      setCanvasDimensions({ width: clientWidth, height: clientHeight, top, left, right, bottom });
      dispatch(updateCanvasDimensions(canvasDimensions));
      console.log('Canvas width: ', clientWidth);
      console.log('Canvas left: ', left);
      canvas.setAttribute('style', `width: ${canvasDimensionsStore.width}px; left: ${canvasDimensionsStore.left}px;`);
    }
  }, [dispatch]);

  //  on canvasDimensions change dispatch action to update canvasDimensions in store : updateCanvasDimensions

  useEffect(() => {
    dispatch(updateCanvasDimensions(canvasDimensions));
  }, [canvasDimensions]);
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (canvas) {
      canvas.setAttribute('style', `width: ${canvasDimensionsStore.width}px; left: ${canvasDimensionsStore.left}px;`);
    }
  }, [canvasDimensionsStore]);

 


  const handleWestControlDrag = (e: any) => {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    const sidepanel = document.getElementsByClassName('side-panels')[0]
    const  sidePanelRight = sidepanel.getBoundingClientRect().right;


    const { clientWidth} = canvas;
    const { left } = canvas.getBoundingClientRect();
    const initialMousePositionX = e.clientX;

    const handleMouseMove = (e: any) => {
      const mousePositionX = e.clientX;
      const difference = initialMousePositionX - mousePositionX;
      const newWidth = (clientWidth + difference * 2)+16;
      const newLeft = left - difference;
      if (newWidth > 280+8  && mousePositionX > sidePanelRight+8*2){
        canvas.setAttribute('style', `width: ${newWidth}px; left: ${newLeft}px;`);
        setCanvasDimensions((prevDimensions) => ({ ...prevDimensions, width: newWidth, left: newLeft }));
  
      }

    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      console.log('onClick Width: ', clientWidth)
      document.removeEventListener('mousemove', handleMouseMove);
    });
  };

  const handleEastControlDrag = (e: any) => {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

 

    const sidepanel = document.getElementsByClassName('side-panels')[0]
    const  sidePanelRight = sidepanel.getBoundingClientRect().right;

    const { clientWidth} = canvas;
    const { right,left } = canvas.getBoundingClientRect();
    const initialMousePositionX = e.clientX;

    const handleMouseMove = (e: any) => {
      const mousePositionX = e.clientX;
      const currentCanvasLeft = canvas.getBoundingClientRect().left;
      const difference = mousePositionX-initialMousePositionX;
      const newWidth = (clientWidth + difference * 2)+16*2;
      const newLeft = left - difference;
      if ( currentCanvasLeft - 8*2 >  sidePanelRight){
        console.log('=============')
        console.log('Canvas left: ', left)
        console.log('SidePanel Right: ', sidePanelRight)
        canvas.setAttribute('style', `width: ${newWidth}px; left: ${newLeft}px;`);
        setCanvasDimensions((prevDimensions) => ({ ...prevDimensions, width: newWidth, left: newLeft }));

      }
    }


    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      console.log('onClick Width: ', clientWidth)
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
          style={{ top: canvasDimensions.top, left: canvasDimensions.right, width: 4, height: canvasDimensions.height }}
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
