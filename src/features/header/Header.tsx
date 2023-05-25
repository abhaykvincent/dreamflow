import React, { useState } from 'react';
import './Header.scss';

export function Header() {
  return (
    <header>
        <div className="left">
          <div className="logo"></div>
        </div>
        <div className="center">c</div>
        <div className="right">r</div>
      </header>
  );
}
