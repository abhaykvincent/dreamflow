import React, { useEffect, useState } from 'react';
import './PositionInspector.scss';

interface PositionInspectorProps {
  positionStyle: string;
  targetID: string;
}

const positionTabs = ['static', 'relative', 'absolute' , 'fixed', 'sticky'];
let styleSheet = document.styleSheets[0];

const updateCSSRule = (targetSelector: string, highlightedPositionTab: string) => {
    let ruleExists = false;
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
        if (styleSheet.cssRules[i].cssText.startsWith(targetSelector)) {
            ruleExists = true;
            const rule=styleSheet.cssRules[i] as CSSStyleRule;
            rule.style.position=highlightedPositionTab;
            break;
        }
    }
    
    if (!ruleExists) {
      const newRule = `${targetSelector} { position: ${highlightedPositionTab}; }`;
      styleSheet.insertRule(newRule, styleSheet.cssRules.length);
    }
}

export function PositionInspector({positionStyle, targetID} : PositionInspectorProps) {
  const [highlightedPositionTab, setHighlightedPositionTab] = useState(positionStyle);
  
  useEffect(() => {
    const targetSelector = `[data-flow-id="${targetID}"]`;
    updateCSSRule(targetSelector, highlightedPositionTab);
  }, [highlightedPositionTab]);

  return(
    <div className="position-inspector">
      <div className="panel-section__title">Position</div>
      <div className="panel__section position">
        <div className="position-property">
          <div className="position-property__label">Position</div>
        </div>

       <div className="position-property__input">
              <div className="position-property__input__option">
                <select name="position" id="position" value={highlightedPositionTab} onChange={(e) => setHighlightedPositionTab(e.target.value)}>
                  <option value="static">Static</option>
                  <option value="relative">Relative</option>
                  <option value="absolute">Absolute</option>
                  <option value="fixed">Fixed</option>
                  <option value="sticky">Sticky</option>
                </select>
              </div>

        </div>

      </div>
    </div>
  )
}
