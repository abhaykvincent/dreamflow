import React, { useState } from 'react';
import './App.scss';

import { Sidebar } from './features/sidebar/Sidebar';
import { Header } from './features/header/Header';

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
      <Header/>
      {/* Sidebar */}
      <Sidebar/>
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
