import React, { useEffect, useState } from 'react';
import './ResponsiveControl.scss';

const devices = ['a', 'b', 'c', 'd'];
const ResponsiveControl: React.FC = () => {
  const [highlightedDevice, setHighlightedDevice] = useState('b');
  const toggleHighlight = (device:string) => {
    setHighlightedDevice(device);
  };
  return (
    <div className="responsive">
      <div className="responsive__devices">
        <div className={`highlighter ${highlightedDevice}`}></div>
        <div className="devices">
        {
          devices.map(device=>(
            <div key={device} className={`device ${device} ${ (device===highlightedDevice?'highlighted':'')} `}
            onClick={() => toggleHighlight(device)}
            ></div>
          ))
        }
        </div>
      </div>
      <div className="device__size">
        <div className="unit">1920 px</div>
      </div>
    </div>
  );
};

export default ResponsiveControl;
/* 75 -> 61 */