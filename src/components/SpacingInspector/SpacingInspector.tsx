import React, { useEffect, useState } from 'react';
import './SpacingInspector.scss';

interface SpacingInspectorProps {
  targetID: string;
}
let styleSheet = document.styleSheets[0];
export default function SpacingInspector(targetID: SpacingInspectorProps) {
  const [spacing, setSpacing] = useState({
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  });
  const handleSpacingChange = (e: any) => {
    const { name, value } = e.target;
    const [type, direction] = name.split('-');
    setSpacing((prevSpacing) => ({
      ...prevSpacing,
    }));
  };

  return(
    <div className="spacing-inspector">
       <div className="panel-section__title">Spacing</div>
          <div className="panel__section spacing">

            <div className="spacing__wrap">
              <div className="spacing__label">Padding</div>
              <div className="spacing__input">
                <input type="number" className="spacing__input__field" value={spacing.padding.top} onChange={handleSpacingChange} name="padding-top" />
                <input type="number" className="spacing__input__field" value={spacing.padding.right} onChange={handleSpacingChange} name="padding-right" />
                <input type="number" className="spacing__input__field" value={spacing.padding.bottom} onChange={handleSpacingChange} name="padding-bottom" />
                <input type="number" className="spacing__input__field" value={spacing.padding.left} onChange={handleSpacingChange} name="padding-left" />
              </div>
            </div>

            <div className="spacing__wrap">
              <div className="spacing__label">Margin</div>
              <div className="spacing__input">
                <input type="number" className="spacing__input__field" value={spacing.margin.top} onChange={handleSpacingChange} name="margin-top" />
                <input type="number" className="spacing__input__field" value={spacing.margin.right} onChange={handleSpacingChange} name="margin-right" />
                <input type="number" className="spacing__input__field" value={spacing.margin.bottom} onChange={handleSpacingChange} name="margin-bottom" />
                <input type="number" className="spacing__input__field" value={spacing.margin.left} onChange={handleSpacingChange} name="margin-left" />
              </div>
            </div>
            
          </div>
    </div>
  )
}
