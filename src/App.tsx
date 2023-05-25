import React, { useState } from 'react';
import './App.scss';

import { Sidebar } from './features/sidebar/Sidebar';
import { Header } from './features/header/Header';
import { MenuBar } from './features/menu-bar/MenuBar';
import { Canvas } from './features/canvas/Canvas';

function App() {
  
  return (
    <div className="App">
      {/* Menu bar */}
      <MenuBar/>
      {/* Header */}
      <Header/>
      {/* Sidebar */}
      <Sidebar/>
      {/* Canvas */}
      <Canvas/>
      {/* Inspector Panel */}
      
      {/* Copilot */}
      <div className="copilot"></div>
      {/* Footer */}
      <div className="footer"></div>
    </div>
  );
}

export default App;
