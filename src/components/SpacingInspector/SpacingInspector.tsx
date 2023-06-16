import React, { useEffect, useState } from 'react';
import './SpacingInspector.scss';

interface SpacingInspectorProps {
  targetID: string;
}
let styleSheet = document.styleSheets[0];
export function SpacingInspector(targetID: SpacingInspectorProps) {
  return(
    <div className="spacing-inspector">
       <div className="panel-section__title">Spacing</div>
          <div className="panel__section spacing">

            <div className="spacing__wrap">
              <div className="spacing__label">Padding</div>
              <div className="spacing__input">
                <input type="number" className="spacing__input__field" />
                <input type="number" className="spacing__input__field" />
                <input type="number" className="spacing__input__field" />
                <input type="number" className="spacing__input__field" />
              </div>
            </div>

            <div className="spacing__wrap">
              <div className="spacing__label">Margin</div>
              <div className="spacing__input">
                <input type="number" className="spacing__input__field" />
                <input type="number" className="spacing__input__field" />
                <input type="number" className="spacing__input__field" />
                <input type="number" className="spacing__input__field" />
              </div>
            </div>
            
          </div>
    </div>
  )
}
