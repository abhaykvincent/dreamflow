import React, { useState } from 'react';
import './App.scss';

function App() {
  const [activeSidebar, setActiveSidebar] = useState('layers');

  function sidebarToolSelector(tool:string){
    setActiveSidebar(tool)
  }
  return (
    <div className="App">
    {/* Menu bar */}
    <div className="menu-bar">
      <div className="menu home">Home</div>
      <div className="menu">File</div>
      <div className="menu">Edit</div>
      <div className="menu">View</div>
    </div>
      {/* Header */}
      <header>
        <div className="left">
          <div className="logo"></div>
        </div>
        <div className="center">c</div>
        <div className="right">r</div>
      </header>
      {/* Sidebar */}
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
      {/* Canvas */}
      <div className="canvas"></div>
      {/* Inspector Panel */}
      <div className="inspector">
        <div className="tabs"></div>
      </div>
      {/* Copilot */}
      <div className="copilot"></div>
      {/* Footer */}
      <div className="footer"></div>
    </div>
  );
}

export default App;
