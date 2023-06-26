import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './ResponsiveControl.scss';
import { selectCanvasDimensions } from '../../features/canvas/canvasSlice';


const devices = ['desktop', 'tablet-portrait', 'tablet-landscape', 'mobile'];
const ResponsiveControl: React.FC = () => {
  const canvasDimensions = useSelector(selectCanvasDimensions);
  const [highlightedDevice, setHighlightedDevice] = useState('desktop');
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
        <div className="unit">{canvasDimensions.width-16} px</div>
      </div>
    </div>
  );
};

export default ResponsiveControl;
/* 75 -> 61 */