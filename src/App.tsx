import React from 'react';
import './App.scss';

function App() {
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
          <div className="quick-tool element"></div>
          <div className="quick-tool layers"></div>
          <div className="quick-tool pages"></div>
          <div className="quick-tool assets"></div>
        </div>
        <div className="side-menu">
          <div className="elements">
            <div className="tabs">Elements</div>
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
