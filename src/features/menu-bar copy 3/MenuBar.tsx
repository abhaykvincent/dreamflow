import React, { useState } from 'react';
import './MenuBar.scss';

export function MenuBar() {
  
  return (
    <div className="menu-bar">
      <div className="menu home">Home</div>
      <div className="menu">File</div>
      <div className="menu">Edit</div>
      <div className="menu">View</div>
    </div>
  );
}
