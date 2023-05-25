import React, { useState } from 'react';
import './Sidebar.scss';

export function Sidebar() {
  const [activeSidebar, setActiveSidebar] = useState('layers');

  function sidebarToolSelector(tool:string){
    setActiveSidebar(tool)
  }
  function targetNode(e:any){
    console.log(e.target);
    debugger
    document.querySelector(`[data-flow-id="${'o'}"]`)
  }
  function elementCreation1881(target:string,tag:string){
    const newElement = document.createElement(tag); 
    newElement.innerHTML= tag;
    document.querySelector(`[data-flow-id="canvas"]`)?.appendChild(newElement);
    newElement.addEventListener('click', (e:any)=>{
      targetNode(e)
    })
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
            <div className="tabs">Elements</div>
            <div className="elements-dragabble">

              <div className="element h"
                onClick={()=>elementCreation1881('canvas','h1')}
              >
                <div className="element_icon"></div>
                <div className="element_label">Heading</div>
              </div>
              <div className="element p"
                onClick={()=>elementCreation1881('canvas','p')}
                >
                <div className="element_icon"></div>
                <div className="element_label">Paragraph</div>
              </div>
              <div className="element a"
                onClick={()=>elementCreation1881('canvas','a')}
                >
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
