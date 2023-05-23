import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
    {/* Menu bar */}
    <div className="menu-bar">
      <div className="menu">File</div>
      <div className="menu">Edit</div>
      <div className="menu">View</div>
    </div>
      {/* Header */}
      <header></header>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="quick-tool"></div>
        <div className="quick-tool"></div>
        <div className="quick-tool"></div>
        <div className="quick-tool"></div>
      </div>
      {/* Canvas */}
      <div className="canvas"></div>
      {/* Inspector Panel */}
      <div className="inspector"></div>
      {/* Copilot */}
      <div className="copilot"></div>
      {/* Footer */}
      <div className="footer"></div>
    </div>
  );
}

export default App;
