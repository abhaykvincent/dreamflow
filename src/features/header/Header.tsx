import React, { useState } from 'react';
import './Header.scss';
import ResponsiveControl from '../../components/ResponsiveControl/ResponsiveControl';
import RolesControl from '../../components/RolesControl/RolesControl';

export function Header() {

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
          <ResponsiveControl/>
          <RolesControl/>
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
