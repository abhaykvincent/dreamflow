import React, { useEffect, useState } from 'react';
import './TypographyInspector.scss';

interface TypographyInspectorProps {
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


export function TypographyInspector({
  targetID
} : TypographyInspectorProps) {

  const [fontSize, setFontSize] = useState('');
  const [fontWeight, setFontWeight] = useState('');
  const [fontColor, setFontColor] = useState('');
  const [lineHeight, setLineHeight] = useState('');

  const targetSelector = `[data-flow-id="${targetID}"]`;

  useEffect(() => {
    updateCSSRule(targetSelector, 'font-size', fontSize+'px');
  }, [fontSize]);

  useEffect(() => {
    updateCSSRule(targetSelector, 'font-weight', fontWeight);
  }, [fontWeight]);

  useEffect(() => {
    updateCSSRule(targetSelector, 'color', fontColor);
  }, [fontColor]);

  useEffect(() => {
    updateCSSRule(targetSelector, 'line-height', lineHeight+'px');
  }, [lineHeight]);

  return (
    <div className="typography-inspector">
      <div className="panel-section__title">Typography</div>
      <div className="panel__section typography">
        <div className="typography-grid">
          <div className='property font'>
            <div className="typography-property__label">Font</div>
            <input type="number" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
          </div>
          <div className='property weight'>
            <div className="typography-property__label">Weight</div>
            <input type="number" value={fontWeight} onChange={(e) => setFontWeight(e.target.value)} />
          </div>
          <div className='property size'>
            <div className="typography-property__label">Size</div>
            <input type="number" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
          </div>
          <div className='property height'>
            <div className="typography-property__label">Height</div>
            <input type="number" value={lineHeight} onChange={(e) => setLineHeight(e.target.value)} />
          </div>
          <div className='property color'>
            <div className="typography-property__label">Color</div>
            <input type="text" value={fontColor} onChange={(e) => setFontColor(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  )
}
