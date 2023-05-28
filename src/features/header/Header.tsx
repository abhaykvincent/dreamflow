import React, { useState } from 'react';
import './Header.scss';

export function Header() {

  const devices = ['a', 'b', 'c', 'd']; // An array of labels
  const roles = ['Design','Code']; // An array of labels

  const [highlightedDevice, setHighlightedDevice] = useState('b');
  const [highlightedRole, setHighlightedRole] = useState('Design');

  const toggleHighlight = (device:string) => {
    setHighlightedDevice(device);
  };
  const toggleRole = (role:string) => {
    setHighlightedRole(role);
  };

  return (
    <header>
        <div className="left">
          <div className="logo"></div>
          <div className="page">
            <div className="page-name">
              <div className="name">Product</div>
            </div>
            <div className="breadcrumbs"> <span>Home</span> / <span>Collection</span> </div>
          </div>
            <div className="preview"></div>
          
        </div>
        <div className="center">
          <div className="responsive">
            <div className="devices__wrap">
              <div className={`highlighter ${highlightedDevice}`}></div>
              <div className="devices">
              {
                devices.map(device=>(
                  <div key={device} className={`device ${device} ${ (device===highlightedDevice?'highlighted':'')} `}
                  onClick={() => toggleHighlight(device)}
                  ></div>
                ))
              }
              </div>
            </div>
            <div className="device__size">
              <div className="unit">1920 px</div>
            </div>
          </div>
          <div className="roles">
            <div className="tab-button">
              <div className={`highlighter ${highlightedRole.toLowerCase()}`}></div>
              <div className="tabs">
              {
                roles.map(role=>(
                  <div key={role} className={`role ${role.toLowerCase()} ${ (role===highlightedRole?'highlighted':'')} `}
                  onClick={() => toggleRole(role)}
                  >{role}</div>
                ))
              }
              </div>
            </div>
          </div>
          <div className="actions">
            <div className="button">Export</div>
          </div>
        </div>
        <div className="right">
          <div className="git">
            <div className="dropdown disabled repository ">
              <div className="input">
                jm-ecommerce
              </div>
              <div className="label">Repository</div>
            </div>
            <div className="dropdown branch">
              <div className="input">
                <span>fix/</span> product-option
              </div>
              <div className="label">Branch</div>

            </div>
          </div>
        </div>
      </header>
  );  
}
