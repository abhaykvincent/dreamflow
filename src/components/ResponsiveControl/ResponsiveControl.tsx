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
      if(highlightedDevice==='mobile'){
      dispatch(updateCanvasDimensions({...canvasDimensions, width: 320, height: canvasDimensions.height || 0, top: canvasDimensions.top || 0, left: canvasDimensions.left || 0, right: canvasDimensions.right || 0, bottom: canvasDimensions.bottom || 0}));  
      }else if(highlightedDevice==='tablet-portrait'){
        dispatch(updateCanvasDimensions({...canvasDimensions, width: 480, height: canvasDimensions.height || 0, top: canvasDimensions.top || 0, left: canvasDimensions.left || 0, right: canvasDimensions.right || 0, bottom: canvasDimensions.bottom || 0}));
      }else if(highlightedDevice==='tablet-landscape'){
        dispatch(updateCanvasDimensions({...canvasDimensions, width: 768, height: canvasDimensions.height || 0, top: canvasDimensions.top || 0, left: canvasDimensions.left || 0, right: canvasDimensions.right || 0, bottom: canvasDimensions.bottom || 0}));
      }else if(highlightedDevice==='desktop'){
        dispatch(updateCanvasDimensions({...canvasDimensions, width: 992, height: canvasDimensions.height || 0, top: canvasDimensions.top || 0, left: canvasDimensions.left || 0, right: canvasDimensions.right || 0, bottom: canvasDimensions.bottom || 0}));
      }

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