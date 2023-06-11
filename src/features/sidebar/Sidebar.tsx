import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';

import { ElementPalette } from '../elementPalette/ElementPalette';
import './Sidebar.scss';

export function Sidebar() {
  const [activeSidebarTool, setActiveSidebarTool] = useState('elements');

  return (
      <div className="sidebar">
        <div className="tools">

          {/* Button for Element Pallette*/}
          <div 
            className={`quick-tool elements ${activeSidebarTool == 'elements' ? 'active':''}`}
            onClick={()=>setActiveSidebarTool('elements')}
          ></div>
          {/* Button for Layers Panel*/}
          <div 
            className={`quick-tool layers ${activeSidebarTool == 'layers' ? 'active':''}`}
            onClick={()=>setActiveSidebarTool('layers')}
          ></div>

          <div className="quick-tool pages disabled"></div> {/* Disabled */}
          <div className="quick-tool assets disabled"></div> {/* Disabled */}
        </div>
        <div className="side-panels">

          <div className={`side-panel elements ${activeSidebarTool == 'elements' ? '':'hide'}`}>
            <ElementPalette/>
          </div>
          <div className={`side-panel layers ${activeSidebarTool == 'layers' ? '':'hide'}`}>
            <div className="tabs">Layers</div>
          </div>

        </div>
      </div>
  );
}
