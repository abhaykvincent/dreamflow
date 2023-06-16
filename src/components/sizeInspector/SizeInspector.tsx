import React, { useEffect, useState } from 'react';
import './SizeInspector.scss';

interface SizeInspectorProps {
  targetID: string;
}

let styleSheet = document.styleSheets[0];

const updateCSSRule = (targetSelector: string, property: string, value: string) => {
    let ruleExists = false;
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
        if (styleSheet.cssRules[i].cssText.startsWith(targetSelector)) {
            ruleExists = true;
            const rule=styleSheet.cssRules[i] as CSSStyleRule;
            // find property and update it
            rule.style.setProperty(property, value);
            break;
        }
    }
    
    if (!ruleExists) {
      const newRule = `${targetSelector} { ${property}: ${value}; }`;
      styleSheet.insertRule(newRule, styleSheet.cssRules.length);
    }
}

export function SizeInspector({
  targetID
} : SizeInspectorProps) {

  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [minWidth, setMinWidth] = useState('');
  const [maxWidth, setMaxWidth] = useState('');
  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  
  const targetSelector = `[data-flow-id="${targetID}"]`;
  
  useEffect(() => {
    updateCSSRule(targetSelector, 'width', width+'px');
  }, [width]);

  useEffect(() => {
    updateCSSRule(targetSelector, 'height', height+'px');
  }, [height]);

  useEffect(() => {
    updateCSSRule(targetSelector, 'minWidth', minWidth+'px');
  }, [minWidth]);

  useEffect(() => {
    updateCSSRule(targetSelector, 'maxWidth', maxWidth+'px');
  }, [maxWidth]);

  useEffect(() => {
    updateCSSRule(targetSelector, 'minHeight', minHeight+'px');
  }, [minHeight]);

  useEffect(() => {
    updateCSSRule(targetSelector, 'maxHeight', maxHeight+'px');
  }, [maxHeight]);

  return (
    <div className="size-inspector">
      <div className="panel-section__title">Size</div>
      <div className="panel__section size">
        <div className="size-grid">
          <div>
            <div className="size-property__label">Width</div>
            <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
          </div>
          <div>
            <div className="size-property__label">Height</div>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          <div>
            <div className="size-property__label">Min W</div>
                        <input type="number" value={minWidth} onChange={(e) => setMinWidth(e.target.value)} />
          </div>
          <div>
            <div className="size-property__label">Max H</div>
            <input type="number" value={maxWidth} onChange={(e) => setMaxWidth(e.target.value)} />
          </div>
          <div>
            <div className="size-property__label">Min W</div>
            <input type="number" value={minHeight} onChange={(e) => setMinHeight(e.target.value)} />
          </div>
          <div>
            <div className="size-property__label">Max H</div>
            <input type="number" value={maxHeight} onChange={(e) => setMaxHeight(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  )
}
