import React, { useState } from 'react';
import './Header.scss';

export function Header() {
  return (
    <header>
        <div className="left">
          <div className="logo"></div>
        </div>
        <div className="center">
          <div className="responsive">
            <div className="devices_wrap">
              <div className="highlighter a"></div>
              <div className="devices">
                <div className="device a highlight "></div>
                <div className="device b"></div>
                <div className="device c"></div>
                <div className="device d"></div>
              </div>
            </div>
          </div>
          <div className="role"></div>
          <div className="actions">
            <div className="button">Export</div>
          </div>
        </div>
        <div className="right">
        </div>
      </header>
  );
}
