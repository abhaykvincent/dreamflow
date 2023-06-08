import React, { useEffect, useState } from 'react';
import './LayoutInspector.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface LayoutInspectorProps {
  layoutStyle: string;
  targetID: string;
}

export function LayoutInspector({layoutStyle,targetID} : LayoutInspectorProps) {

  // LAYOUT INSPECTOR
  // Description: This component is responsible for displaying, highlighting and toggling the layout of the selected element

  // State
  // 1. Layout Tabs [display: block, flex, grid, none]
  const layoutTabs = ['block', 'flex', 'grid' , 'inline-block', 'inline', 'none']
  const [highlightedLayoutTab, setHighlightedLayoutTab] = useState(layoutStyle);

  // Dcuent stylesheet
  let styleSheet = document.styleSheets[0];
  // Functions

  const updateCSSRule = (targetSelector: string, highlightedLayoutTab: string) => {
    let ruleExists = false;
    // Check if the rule already exists
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
        if (styleSheet.cssRules[i].cssText.startsWith(targetSelector)) {
            ruleExists = true;
            // Update the existing rule
            const rule=styleSheet.cssRules[i] as CSSStyleRule;
            rule.style.display=highlightedLayoutTab;
            break;
        }
    }
    // If the rule does not exist
    if (!ruleExists) {
      // Create a new rule
      const newRule = `${targetSelector} { display: ${highlightedLayoutTab}; }`;
      styleSheet.insertRule(newRule, styleSheet.cssRules.length);
    }
}

  // LIFE CYCLE METHODS

  // useEffect - highlightedLayoutTab | When user changes the display value of the selected element.
  /* 
    When the highlightedLayoutTab changes: 
    1. 
  */
  useEffect(() => {
    // Get the target element selector
    const targetSelector = `[data-flow-id="${targetID}"]`;
    // Update the CSS rule
    updateCSSRule(targetSelector, highlightedLayoutTab);
    
  }, [highlightedLayoutTab]);



  return(
    <div className="layout-inspector">
      <div className="panel-section__title">Layout</div>
      <div className="panel__section layout">
        <div className="layout-property">
          <div className="layout-property__label">Display</div>
        </div>
        <div className="tab__wrap">
          <div className={`highlighter ${highlightedLayoutTab}`}></div>
          <div className="layout-tabs">
          {
            layoutTabs.map(tab=>(
              <div key={tab} className={`layout-tab ${tab} ${ (tab===highlightedLayoutTab?'highlighted':'')} `}
              onClick={() => setHighlightedLayoutTab(tab)}
              ></div>
            ))
          }
          </div>
        </div>

      </div>
    </div>
  )
}
