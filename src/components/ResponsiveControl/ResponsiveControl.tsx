import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './ResponsiveControl.scss';
import { selectCanvasDimensions, updateCanvasDimensions } from '../../features/canvas/canvasSlice';
import { useAppDispatch } from '../../app/hooks';


const devices = ['desktop', 'tablet-landscape','tablet-portrait',  'mobile'];
const ResponsiveControl: React.FC = () => {

  const dispatch = useAppDispatch();
  const canvasDimensions = useSelector(selectCanvasDimensions);
  const [highlightedDevice, setHighlightedDevice] = useState('tablet-landscape');

  useEffect(() => {
    if (!canvasDimensions.left || !canvasDimensions.width) {
      return;
    }
  
    let newWidth = 0;
    let newLeft = 0;
  
    switch (highlightedDevice) {
      case 'mobile':
        newWidth = 320+16;
        break;
      case 'tablet-portrait':
        newWidth = 480+16;
        break;
      case 'tablet-landscape':
        newWidth = 768+16;
        break;
      case 'desktop':
        newWidth = 1200+16;
        break;
      default:
        return;
    }
  
    if (canvasDimensions.width > newWidth) {
      newLeft = canvasDimensions.left + (canvasDimensions.width - newWidth) / 2;
    } else if (canvasDimensions.width < newWidth) {
      newLeft = canvasDimensions.left - (newWidth - canvasDimensions.width) / 2;
    } else {
      return;
    }
  
    dispatch(
      updateCanvasDimensions({
        ...canvasDimensions,
        width: newWidth,
        height: canvasDimensions.height || 0,
        top: canvasDimensions.top || 0,
        left: newLeft,
        right: canvasDimensions.right || 0,
        bottom: canvasDimensions.bottom || 0,
      })
    );
  }, [highlightedDevice]);
  useEffect(() => {
    if(canvasDimensions.width){
      if(canvasDimensions.width<480 && canvasDimensions.width>320){
        setHighlightedDevice('mobile');
      }else if(canvasDimensions.width<768 && canvasDimensions.width>480){
        setHighlightedDevice('tablet-portrait');
      }else if(canvasDimensions.width<992 && canvasDimensions.width>768){
  
        setHighlightedDevice('tablet-landscape');
  
      }else if(canvasDimensions.width<1200 && canvasDimensions.width>992){
        setHighlightedDevice('desktop');
      }
    }
    

  }, [canvasDimensions]);
  return (
    <div className="responsive">
      <div className="responsive__devices">
        <div className={`highlighter ${highlightedDevice}`}></div>
        <div className="devices">
        {
          devices.map(device=>(
            <div key={device} className={`device ${device} ${ (device===highlightedDevice?'highlighted':'')} `}
            onClick={() => setHighlightedDevice(device)}
            ></div>
          ))
        }
        </div>
      </div>
      <div className="device__size">
        <div className="unit">{canvasDimensions.width?canvasDimensions.width-16:0} px</div>
      </div>
    </div>
  );
};

export default ResponsiveControl;
/* 75 -> 61 */