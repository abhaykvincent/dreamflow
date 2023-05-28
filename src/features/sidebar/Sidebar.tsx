import React, { useState } from 'react';
import './Sidebar.scss';
import { useAppDispatch } from '../../app/hooks';
import { ElementPalette } from '../elementPalette/ElementPalette';

export function Sidebar() {
  const [activeSidebar, setActiveSidebar] = useState('layers');
  const dispatch = useAppDispatch();

  function sidebarToolSelector(tool:string){
    setActiveSidebar(tool)
  }

  
  return (
      <div className="sidebar">
        <div className="tools">

          {/* Button for Element Panel*/}
          <div 
            className={`quick-tool elements ${activeSidebar == 'elements' ? 'active':''}`}
            onClick={()=>sidebarToolSelector('elements')}
          ></div>
          {/* Button for Layers Panel*/}
          <div 
            className={`quick-tool layers ${activeSidebar == 'layers' ? 'active':''}`}
            onClick={()=>sidebarToolSelector('layers')}
          ></div>

          <div className="quick-tool pages disabled"></div> {/* Disabled */}
          <div className="quick-tool assets disabled"></div> {/* Disabled */}
        </div>
        <div className="side-menu">

          <div className={`side-panel elements ${activeSidebar == 'elements' ? '':'hide'}`}>
            <ElementPalette/>
          </div>
          <div className={`side-panel layers ${activeSidebar == 'layers' ? '':'hide'}`}>
            <div className="tabs">Layers</div>
          </div>

        </div>
      </div>
  );
}
