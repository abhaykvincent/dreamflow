import React, { useState } from 'react';
import './Sidebar.scss';

export function Sidebar() {
  const [activeSidebar, setActiveSidebar] = useState('layers');

  function sidebarToolSelector(tool:string){
    setActiveSidebar(tool)
  }
  return (
      <div className="sidebar">
        <div className="tools">
          <div className={`quick-tool element ${activeSidebar == 'elements' ? 'active':''}`}
            onClick={()=>sidebarToolSelector('elements')}
          ></div>
          <div className={`quick-tool layers ${activeSidebar == 'layers' ? 'active':''}`}
            onClick={()=>sidebarToolSelector('layers')}
            ></div>
          <div className="quick-tool pages disabled"></div>
          <div className="quick-tool assets disabled"></div>
        </div>
        <div className="side-menu">

          <div className={`side-panel elements ${activeSidebar == 'elements' ? '':'hide'}`}>
            <div className="tabs">Elements</div>
            <div className="elements-dragabble">

              <div className="element h">
                <div className="element_icon"></div>
                <div className="element_label">Heading</div>
              </div>
              <div className="element p">
                <div className="element_icon"></div>
                <div className="element_label">Paragraph</div>
              </div>
              <div className="element a">
                <div className="element_icon"></div>
                <div className="element_label">Link</div>
              </div>

            </div>
          </div>
          <div className={`side-panel layers ${activeSidebar == 'layers' ? '':'hide'}`}>
            <div className="tabs">Layers</div>
          </div>

        </div>
      </div>
  );
}
